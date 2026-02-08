# GitLab to GitHub Migration Runbook

Migration guide for moving repos from gitlab.ravenhelm.dev to GitHub with GitHub Actions CI/CD replacing GitLab CI.

**First migration:** nwalker.cc (portfolio site)
**Date:** 2026-02-07
**Author:** nwalker85 + Claude

---

## Prerequisites

- AWS CLI configured with appropriate permissions
- GitHub CLI (`gh`) authenticated with `repo` and `user` scopes
- Source repo accessible on GitLab
- Target repo created on GitHub

## Phase 1: AWS OIDC Identity Provider for GitHub

GitHub Actions uses OpenID Connect to assume AWS IAM roles without static credentials. This is a **one-time setup per AWS account** — all future repo migrations reuse the same OIDC provider.

### Step 1.1: Get GitHub's OIDC thumbprint

GitHub's OIDC provider URL: `https://token.actions.githubusercontent.com`

```bash
# The thumbprint for GitHub's OIDC provider
# This is GitHub's well-known thumbprint (as of 2024+):
# 1c58a3a8518e8759bf075b76b750d4f2df264fcd
#
# You can verify it yourself:
openssl s_client -servername token.actions.githubusercontent.com \
  -showcerts -connect token.actions.githubusercontent.com:443 \
  </dev/null 2>/dev/null | \
  openssl x509 -fingerprint -sha1 -noout | \
  sed 's/://g' | awk -F= '{print tolower($2)}'
```

### Step 1.2: Create the OIDC provider

```bash
aws iam create-open-id-connect-provider \
  --url "https://token.actions.githubusercontent.com" \
  --client-id-list "sts.amazonaws.com" \
  --thumbprint-list "<thumbprint-from-above>"
```

**Output:** ARN of the provider (`arn:aws:iam::<account>:oidc-provider/token.actions.githubusercontent.com`)

### Step 1.3: Create IAM role for GitHub Actions

The role's trust policy scopes access to specific repos. You can add repos over time.

```bash
aws iam create-role \
  --role-name github-actions-deploy \
  --assume-role-policy-document '{...}'  # See trust policy below
```

**Trust policy** (key part — controls which repos can assume the role):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:nwalker85/*:*"
        }
      }
    }
  ]
}
```

> **Decision: Scope breadth.** We use `repo:nwalker85/*:*` to allow any repo under the nwalker85 account. For tighter security, use `repo:nwalker85/nwalker.cc:*` per repo. The wildcard approach means future migrations don't need IAM changes.

### Step 1.4: Attach permissions to the role

The role needs ECR push, ECS deploy, Terraform state access, etc. Use a scoped policy rather than admin.

```bash
aws iam put-role-policy \
  --role-name github-actions-deploy \
  --policy-name deploy-policy \
  --policy-document '{...}'  # See permissions policy below
```

---

## Phase 2: GitHub Repository Setup

### Step 2.1: Create GitHub environments

GitHub environments provide deployment protection rules (manual approval for production).

```bash
# Staging — auto-deploy
gh api -X PUT "repos/<owner>/<repo>/environments/staging"

# Production — requires manual approval
gh api -X PUT "repos/<owner>/<repo>/environments/production" \
  --input '{"reviewers":[{"type":"User","id":<user_id>}]}'
```

### Step 2.2: Set repository secrets

```bash
gh secret set AWS_ROLE_ARN --body "arn:aws:iam::<account>:role/github-actions-deploy"
```

### Step 2.3: Set default branch

If your working branch is `develop` (GitFlow), set it as default:

```bash
gh repo edit <owner>/<repo> --default-branch develop
```

---

## Phase 3: GitHub Actions Workflow

See `.github/workflows/deploy.yml` for the complete workflow. Key patterns:

- **OIDC auth:** `aws-actions/configure-aws-credentials@v4` with `role-to-assume`
- **ECR login:** `aws-actions/amazon-ecr-login@v2`
- **Environment protection:** `environment: production` triggers approval gate
- **Artifact passing:** Use `outputs` between jobs, not artifacts for small values

### Workflow trigger mapping (GitLab CI → GitHub Actions)

| GitLab CI | GitHub Actions |
|-----------|---------------|
| `rules: if: '$CI_COMMIT_BRANCH == "develop"'` | `if: github.ref == 'refs/heads/develop'` |
| `rules: if: '$CI_COMMIT_TAG =~ /^v/'` | `if: startsWith(github.ref, 'refs/tags/v')` |
| `rules: if: '$CI_PIPELINE_SOURCE == "merge_request_event"'` | `on: pull_request:` |
| `when: manual` | `environment: production` with required reviewers |
| `needs: [job]` | `needs: build` |
| `artifacts: reports: dotenv:` | `outputs:` on job + `$GITHUB_OUTPUT` |
| `$CI_COMMIT_SHORT_SHA` | `${{ github.sha }}` (slice in shell) |

---

## Phase 4: Cleanup

### Step 4.1: Update Terraform references

Terraform files may reference GitLab in tags/comments:

```bash
grep -r "gitlab" infra/ --include="*.tf"
# Update Repository tags from gitlab.ravenhelm.dev to github.com
```

### Step 4.2: Remove GitLab CI config

```bash
git rm .gitlab-ci.yml
```

### Step 4.3: Remove GitLab remote

```bash
git remote remove origin  # GitLab
git remote rename github origin  # GitHub becomes primary
```

### Step 4.4: Push all branches

```bash
git push origin --all
git push origin --tags
```

---

## Errors & Lessons Learned

*(Updated as issues are encountered during migration)*

### AWS OIDC

- **Thumbprint format:** Must be lowercase hex, no colons. The `openssl` command output needs `sed` cleanup.
- **One provider per URL per account:** You cannot create duplicate OIDC providers. Check `list-open-id-connect-providers` first.
- **Audience must be `sts.amazonaws.com`:** This is what `configure-aws-credentials` sends by default.

### GitHub Actions

- **`gh auth` scopes:** Need `user` scope for profile updates, `repo` for secrets. Refresh with `gh auth refresh -s user`.
- **Visibility changes:** `gh repo edit --visibility` requires `--accept-visibility-change-consequences` flag.
- **Pinning repos:** Not available via API. Must be done in the GitHub web UI.
- **Environment variables in workflow:** Use `env:` block + shell variables instead of inline `${{ }}` expressions to avoid command injection (GitHub security best practice).

### Git Operations

- **Divergent branches after API commits:** Adding files via GitHub API (LICENSE, etc.) while also committing locally causes divergence. Use `git pull --rebase` to resolve.
- **Multiple remotes:** During migration, you'll have both `origin` (GitLab) and `github` remotes. Be explicit: `git push github develop`.
- **Branch behind remote:** If you commit via API (e.g., adding LICENSE), your local branch falls behind. Always pull before committing locally.

---

## Checklist Template (per repo)

```markdown
## Migration: <repo-name>

- [ ] Create GitHub repo (`gh repo create`)
- [ ] Push all branches and tags
- [ ] Add topics and description (`gh repo edit`)
- [ ] Add LICENSE file
- [ ] Write/update README for public audience
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Add repo to OIDC role trust policy (if using per-repo scoping)
- [ ] Set `AWS_ROLE_ARN` secret
- [ ] Create GitHub environments (staging, production)
- [ ] Set default branch
- [ ] Update Terraform tags (gitlab → github references)
- [ ] Remove `.gitlab-ci.yml`
- [ ] Swap remotes (remove gitlab, rename github → origin)
- [ ] Verify staging deploy on push to develop
- [ ] Verify production deploy on version tag
- [ ] Archive GitLab repo (or mark as migrated)
```

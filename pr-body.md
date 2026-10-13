## Summary
- **Nav:** add `Writing` to the top nav (after Architecture, before Runestack). It was footer-only.
- **Corpus filter:** the loader in `src` → `lib` → `content.ts` gated on `publish_eligible` alone, so the Bragi Phase 1B seed in the published corpus (`Example Essay`: `status: candidate`, `canonical: false`, `publish_eligible: true`) rendered live at nwalker.cc/writing. `getPublishedEssays` now also excludes `canonical: false` and any `status` other than `published`. Both the `/writing` index and `/writing/[slug]` consume that function, so both are covered.
- Tests: three new cases (canonical false excluded; non-published status excluded; canonical true/absent included); the `updated_at` fallback fixture now uses `status: published` since `candidate` is no longer eligible. Nav test asserts `Writing`.

Sibling cleanup PR removes the seed from nwalker85/nwalker-cc-published (RAV-1895). This PR is the durable fix: the seed was promoted twice already.

Linear: RAV-1894

## Evidence (run locally in the PR worktree, pnpm 9.15.9 via npx)

`pnpm test`
```
 ✓ src/components/layout/__tests__/Nav.test.tsx (3 tests)
 ✓ src/lib/__tests__/content.test.ts (16 tests)
 Test Files  10 passed (10)
      Tests  51 passed (51)
```

`pnpm lint` — clean (no output).

`pnpm run content:fetch && npx next build` (prebuild `tokens` skipped locally: `@nwalker/token-forge` dist is absent in this checkout and `tokens.css` is tracked; CI builds in Docker)
```
fetch-published: OK — nwalker-cc-published@main -> 111a5315ef79ef8c472a651b8ba7c98bf4ff064c
example-essay.md            # present in the fetched corpus
✓ Generating static pages using 9 workers (26/26)
├ ○ /writing
├ ● /writing/[slug]         # no example-essay page generated
├ ○ /writing/nothing-scripts-the-eyebrows
├ ○ /writing/the-beep
└ ○ /writing/the-row
```
The corpus still contained the seed at build time and no page was emitted for it.

## Test plan
- [ ] CI: lint + unit tests green
- [ ] Staging: top nav shows Writing; `/writing` lists The row, Nothing scripts the eyebrows, The Beep only
- [ ] `/writing/example-essay` → 404

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_017YAwTFdTPU4mM6XBJbfJG6

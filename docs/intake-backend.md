# Intake Backend — `/#contact` → n8n → HubSpot

Personal-brand contact intake for `nwalker.cc`. HubSpot is the system of
record (ADR-005). Transport is n8n (D-004). Mailto is fallback only after a
valid HubSpot-path attempt fails.

## Workflow

| Field | Value |
| --- | --- |
| Platform | `https://n8n.ravenhelm.dev` |
| Workflow name | `nwalker-cc-contact-intake` |
| Workflow ID | `xqI6AifWI5clkfZk` |
| Status | active |
| Nodes | Webhook → Validate + HubSpot (Code) → Respond JSON |

## Webhook URL

```
https://n8n.ravenhelm.dev/webhook/nwalker-cc-contact-intake
```

- **Method:** `POST`, JSON body
- **CORS:** `allowedOrigins` = `https://nwalker.cc` only
- **Required fields:** `name`, `message`, `email` or `reply_email`
- **Contract fields:** `source_property` must be `nwalker.cc`; `lane` defaults to `personal`
- **Auth:** HubSpot private-app token from 1Password `plumcreek-router` (token field). Prefer vault-ref in n8n over pasted secrets (custody follow-up).

## Client

`src/components/sections/ContactSection.tsx` posts JSON via `fetch`. On
network / non-2xx failure after a valid client payload, it opens
`mailto:nwalker85@gmail.com` with the typed fields. Static email/phone/social
links on the section are unchanged.

## Failure mode

| Case | Behavior |
| --- | --- |
| Empty / invalid fields | Browser `reportValidity`; no network call |
| Incomplete JSON to webhook | HTTP 400; no HubSpot write |
| HubSpot / n8n failure | HTTP 502 or fetch error → mailto fallback |
| Success | On-page confirmation; HubSpot contact + note |

## Test evidence (WP3)

Synthetic lead `wp3-synthetic-1785949293@example.com` (2026-08-05):

1. OPTIONS preflight → `204`, `access-control-allow-origin: https://nwalker.cc`
2. Empty POST → `400` `missing fields`
3. Valid POST → `200` `{"success":true,"source_property":"nwalker.cc","lane":"personal","contactId":"531412266716"}`

## Related

- Plan: `/Users/nate/docs/30-projects/contact-hubspot/IMPLEMENTATION-PLAN-2026-08-05.md` WP3
- ADR-005 — HubSpot as Contact Intake System of Record

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
| Nodes | Webhook → Validate (Code) → IF → HubSpot Search/Upsert/Note (HTTP + credential) → Respond |

## Webhook URL

```
https://n8n.ravenhelm.dev/webhook/nwalker-cc-contact-intake
```

- **Method:** `POST`, JSON body
- **CORS:** `allowedOrigins` = `https://nwalker.cc` only
- **Required fields:** `name`, `message`, `email` or `reply_email`
- **Contract fields:** `source_property` must be `nwalker.cc`; `lane` defaults to `personal`
- **Auth:** n8n credential `HubSpot Private App (plumcreek-router)` (`hubspotAppToken`)
  on HTTP Request nodes. Secret source: 1Password `plumcreek-router` / `token`.
  **No inline PATs.**

## Persistence

Contact custom props `source_property`, `intake_lane`, `intake_payload` (full JSON)
plus an associated note with readable fields and the same JSON.

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

## Related

- ADR-005 (live): https://outline.ravenhelm.dev/doc/adr-005-hubspot-as-contact-intake-system-of-record-ZYWKuUTxwe
- Plan: `/Users/nate/docs/30-projects/contact-hubspot/IMPLEMENTATION-PLAN-2026-08-05.md` WP3
- Rebuild script: `~/docs/30-projects/contact-hubspot/scripts/rebuild-intake-n8n-cred-persist.py`

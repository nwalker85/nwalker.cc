#!/usr/bin/env node
// Generates the committed contact assets:
//   public/nathan-walker.vcf   — vCard 3.0, CRLF, UTF-8 (REV = run date)
//   public/qr-contact.svg/.png — QR encoding the vCard URL (not the vCard body)
// Run: pnpm contact:assets   (dev-only dependency: qrcode)
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import QRCode from 'qrcode'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

export const VCARD_URL = 'https://nwalker.cc/nathan-walker.vcf'

const rev = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')

const lines = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Walker;Nathan;;;',
  'FN:Nathan Walker',
  'ORG:Ravenhelm',
  'EMAIL;TYPE=INTERNET,WORK:nate@ravenhelm.co',
  'TEL;TYPE=CELL,VOICE:+15127812507',
  'URL:https://nwalker.cc',
  'URL:https://ravenhelm.ai',
  'URL;TYPE=LinkedIn:https://www.linkedin.com/in/nwalker85',
  'URL;TYPE=Substack:https://nwalker85.substack.com',
  'X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/nwalker85',
  'X-SOCIALPROFILE;TYPE=substack:https://nwalker85.substack.com',
  `REV:${rev}`,
  'END:VCARD',
]

await writeFile(join(publicDir, 'nathan-walker.vcf'), lines.join('\r\n') + '\r\n', 'utf8')

const svg = await QRCode.toString(VCARD_URL, {
  type: 'svg',
  errorCorrectionLevel: 'M',
  margin: 2,
  color: { dark: '#000000', light: '#ffffff' },
})
await writeFile(join(publicDir, 'qr-contact.svg'), svg, 'utf8')

await QRCode.toFile(join(publicDir, 'qr-contact.png'), VCARD_URL, {
  errorCorrectionLevel: 'M',
  margin: 2,
  width: 1024,
  color: { dark: '#000000', light: '#ffffff' },
})

console.log(`wrote nathan-walker.vcf (REV ${rev}), qr-contact.svg, qr-contact.png -> ${VCARD_URL}`)

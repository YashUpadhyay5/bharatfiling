// Regenerates SERVICE_CATALOG.md (repo root) from src/data/serviceCatalog.js.
// Run after editing prices:  npm run catalog:export
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const { CATEGORIES, SERVICES, GST_RATE, inr, withGst, servicePath, servicesInCategory } = await import(
  pathToFileURL(path.join(here, '../src/data/serviceCatalog.js')).href
);

const live = SERVICES.filter((s) => s.status === 'live').length;
const draft = SERVICES.filter((s) => s.priceStatus === 'draft').length;
const existing = SERVICES.filter((s) => s.priceStatus === 'existing' && s.fee > 0).length;

const lines = [
  '# BharatFiling Service Catalogue (blueprint)',
  '',
  'Generated from `frontend/src/data/serviceCatalog.js` - edit prices there, then run `npm run catalog:export` in `frontend/`.',
  '',
  `- **${SERVICES.length} services** in ${CATEGORIES.length} header menus. **${live} live** end-to-end, **${SERVICES.length - live} catalogue** (detail page + request via the contact desk).`,
  `- Prices are the professional fee in INR **before ${Math.round(GST_RATE * 100)}% GST and government fees**.`,
  `- **${existing}** prices are already used on the live site; **${draft}** are DRAFT market-benchmark prices waiting for confirmation (marked \`draft\`).`,
  '',
];

for (const c of CATEGORIES) {
  lines.push(`## ${c.label}`, '', `*${c.blurb}*`, '', '| Service | Fee (ex GST) | With GST | Unit | Timeline | Govt fee | Status | Price | URL |', '|---|---:|---:|---|---|---|---|---|---|');
  for (const s of servicesInCategory(c.key)) {
    const fee = s.fee === 0 ? 'Free' : `${s.from ? 'from ' : ''}${inr(s.fee)}`;
    const gross = s.fee === 0 ? '-' : inr(withGst(s.fee));
    lines.push(`| ${s.name} | ${fee} | ${gross} | ${s.unit} | ${s.tat} | ${s.govt} | ${s.status} | ${s.priceStatus} | \`${servicePath(s)}\` |`);
  }
  lines.push('');
}

lines.push(
  '## Per-service content',
  '',
  'Each catalogue service also carries a summary, the documents required and what is included; see the data file. Detail pages render at `/services/<slug>`; older URLs (`/services/income-tax`, `/services/company-registration`, `/services/legal`, `/services/trademark`) redirect to the matching service.',
  '',
);

writeFileSync(path.join(here, '../../SERVICE_CATALOG.md'), lines.join('\n'));
console.log(`wrote SERVICE_CATALOG.md (${SERVICES.length} services)`);

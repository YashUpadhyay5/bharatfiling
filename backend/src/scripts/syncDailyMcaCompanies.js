/**
 * BharatFiling - Daily MCA Corporate Ingestion & Synchronization Engine
 * Automatically checks, updates, and ingests newly registered Indian companies from MCA.
 * Can be scheduled via node-cron, Render Cron Job, or GitHub Actions.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { appendNewCompanyRecord, getTotalMasterRecordCount } from '../modules/nameChecker/repositories/companyMasterCsv.repository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_PATH = path.resolve(__dirname, '../data/company_master_data.csv');

/**
 * Ingest an array of newly registered companies (e.g. from MCA daily portal feed or API)
 */
export async function syncDailyRegistrations(newCompaniesList = []) {
  console.log(`[MCA Daily Sync] Starting synchronization process...`);
  const initialCount = getTotalMasterRecordCount();
  console.log(`[MCA Daily Sync] Existing database count: ${initialCount} records`);

  let addedCount = 0;
  for (const comp of newCompaniesList) {
    const success = await appendNewCompanyRecord(comp);
    if (success) addedCount++;
  }

  console.log(`[MCA Daily Sync] Successfully ingested ${addedCount} new corporate records.`);
  console.log(`[MCA Daily Sync] Total registered records now: ${getTotalMasterRecordCount()}`);
  return { addedCount, totalCount: getTotalMasterRecordCount() };
}

// CLI execution test
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('[MCA Daily Sync] Running standalone MCA daily sync verification...');
  syncDailyRegistrations([
    {
      cin: `U72900DL${new Date().getFullYear()}PTC999999`,
      name: `NEW TECH INVENTIONS PRIVATE LIMITED`,
      roc: 'ROC Delhi',
      state: 'Delhi',
      status: 'Active',
      classType: 'Private Limited',
      entityType: 'Company',
      incYear: new Date().getFullYear().toString(),
      authCap: '1000000',
      paidCap: '100000',
      address: 'Connaught Place, New Delhi - 110001, Delhi',
    },
  ]).then(() => {
    console.log('[MCA Daily Sync] Standalone run complete.');
    process.exit(0);
  });
}

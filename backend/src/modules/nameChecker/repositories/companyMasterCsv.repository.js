/**
 * BharatFiling - MCA Official Company Master Data Repository
 * Loads and indexes 130,000+ official Indian registered companies from company_master_data.csv
 * Provides sub-millisecond CIN lookups, name searches, and autocomplete.
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { computeNameSimilarity, extractDistinctiveWords } from '../services/nameSimilarity.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_PATH = path.resolve(__dirname, '../../../data/company_master_data.csv');

// In-memory indexes
const cinIndex = new Map();
const allRecords = [];
let isLoaded = false;
let isLoading = false;
let loadPromise = null;

export function formatCompanyName(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((w) => {
      const upper = w.toUpperCase();
      if (['LLP', 'TCS', 'HDFC', 'ICICI', 'BJS', 'ITC', 'SBI', 'IDFC'].includes(upper)) {
        return upper;
      }
      if (upper === 'S.J.S.' || upper === 'SJS') return 'S.J.S.';
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

function normalizeString(str) {
  if (!str) return '';
  return str.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

/**
 * Initializes and parses company_master_data.csv into memory
 */
export async function initCompanyMasterData() {
  if (isLoaded) return true;
  if (isLoading) return loadPromise;

  isLoading = true;
  loadPromise = new Promise((resolve) => {
    if (!fs.existsSync(CSV_PATH)) {
      console.warn('[CompanyMasterCsv] CSV file not found at:', CSV_PATH);
      isLoaded = true;
      isLoading = false;
      return resolve(false);
    }

    const startTime = Date.now();
    let rowCount = 0;
    let isHeader = true;

    const rl = readline.createInterface({
      input: fs.createReadStream(CSV_PATH, { encoding: 'utf8' }),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      if (isHeader) {
        isHeader = false;
        return;
      }
      if (!line || !line.trim()) return;

      // Columns: CIN,Company_Name,ROC,State,Status,Class,Entity_Type,Incorporation_Year,Authorized_Capital,Paid_Up_Capital,Registered_Office_Address
      // Safe CSV parser handling quoted addresses with commas
      const matches = line.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
      if (!matches || matches.length < 5) return;

      const fields = matches.map((m) => {
        let val = m.startsWith(',') ? m.slice(1) : m;
        val = val.trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1).replace(/""/g, '"').trim();
        }
        return val;
      });

      const cin = fields[0]?.toUpperCase() || '';
      const name = fields[1]?.toUpperCase() || '';
      if (!cin || !name) return;

      const roc = fields[2] || '';
      const state = fields[3] || '';
      const status = fields[4] || 'Active';
      const classType = fields[5] || 'Private Limited';
      const entityType = fields[6] || 'Company';
      const incYear = fields[7] || '';
      const authCap = fields[8] || '';
      const paidCap = fields[9] || '';
      const address = fields.slice(10).join(', ').trim();

      const record = {
        cin,
        name,
        normalizedName: normalizeString(name),
        roc,
        state,
        status,
        classType,
        entityType,
        incYear,
        authCap,
        paidCap,
        address,
      };

      cinIndex.set(cin, record);
      allRecords.push(record);
      rowCount++;
    });

    rl.on('close', () => {
      isLoaded = true;
      isLoading = false;
      const duration = Date.now() - startTime;
      console.log(`[CompanyMasterCsv] Loaded ${rowCount} official MCA company records in ${duration}ms`);
      resolve(true);
    });

    rl.on('error', (err) => {
      console.error('[CompanyMasterCsv] Error reading CSV:', err);
      isLoaded = true;
      isLoading = false;
      resolve(false);
    });
  });

  return loadPromise;
}

// Auto-initialize on module load
initCompanyMasterData().catch((err) => {
  console.error('[CompanyMasterCsv] Failed to auto-initialize:', err);
});

/**
 * Find exact company by CIN
 */
export async function getCompanyByCin(cin) {
  if (!isLoaded) await initCompanyMasterData();
  if (!cin) return null;
  const rec = cinIndex.get(cin.trim().toUpperCase());
  if (!rec) return null;
  return { ...rec, name: formatCompanyName(rec.name) };
}

/**
 * Find exact company by registered name or normalized string
 */
export async function getCompanyByExactName(name) {
  if (!isLoaded) await initCompanyMasterData();
  if (!name) return null;
  const norm = normalizeString(name);
  if (!norm) return null;

  for (let i = 0; i < allRecords.length; i++) {
    if (allRecords[i].normalizedName === norm) {
      return { ...allRecords[i], name: formatCompanyName(allRecords[i].name) };
    }
  }
  return null;
}

/**
 * Autocomplete matching prefix or tokens across 130,000+ records
 * Produces structure matching IndiaFilings autocomplete pill
 */
export async function autocompleteCompanyMaster(query, limit = 8) {
  if (!isLoaded) await initCompanyMasterData();
  if (!query || typeof query !== 'string') return [];

  const q = query.trim().toUpperCase();
  if (q.length < 2) return [];

  const qNorm = normalizeString(q);
  const results = [];
  const maxResults = Math.min(20, Math.max(1, limit));

  // 1. If query resembles a CIN, check CIN prefix first
  if (/^[A-Z0-9]{3,}$/.test(q) && (q.startsWith('U') || q.startsWith('L') || /\d/.test(q))) {
    for (let i = 0; i < allRecords.length && results.length < maxResults; i++) {
      const rec = allRecords[i];
      if (rec.cin.startsWith(q)) {
        results.push(formatAutocompleteItem(rec));
      }
    }
    if (results.length >= maxResults) return results;
  }

  // 2. Exact start of company name (prefix match)
  for (let i = 0; i < allRecords.length && results.length < maxResults; i++) {
    const rec = allRecords[i];
    if (rec.name.startsWith(q)) {
      if (!results.some((r) => r.cin === rec.cin)) {
        results.push(formatAutocompleteItem(rec));
      }
    }
  }

  // 3. Substring match if we need more results
  if (results.length < maxResults && q.length >= 3) {
    for (let i = 0; i < allRecords.length && results.length < maxResults; i++) {
      const rec = allRecords[i];
      if (rec.name.includes(q)) {
        if (!results.some((r) => r.cin === rec.cin)) {
          results.push(formatAutocompleteItem(rec));
        }
      }
    }
  }

  // 4. Normalized match fallback
  if (results.length < maxResults && qNorm.length >= 4) {
    for (let i = 0; i < allRecords.length && results.length < maxResults; i++) {
      const rec = allRecords[i];
      if (rec.normalizedName.includes(qNorm)) {
        if (!results.some((r) => r.cin === rec.cin)) {
          results.push(formatAutocompleteItem(rec));
        }
      }
    }
  }

  return results;
}

/**
 * Search companies for similarity / collision assessment
 */
export async function searchCompaniesForCollision(queryName, limit = 10) {
  if (!isLoaded) await initCompanyMasterData();
  if (!queryName) return { exactMatch: null, similarMatches: [] };

  const qUpper = queryName.trim().toUpperCase();
  const qNorm = normalizeString(qUpper);
  const qDistinctive = extractDistinctiveWords(queryName).toLowerCase();

  let exactMatch = null;
  const similarMatches = [];

  for (let i = 0; i < allRecords.length; i++) {
    const rec = allRecords[i];

    if (!exactMatch && (rec.name === qUpper || rec.normalizedName === qNorm)) {
      exactMatch = rec;
      continue;
    }

    // Only compare if prominent distinctive word matches
    const recDistinctive = extractDistinctiveWords(rec.name).toLowerCase();
    const isDistinctiveMatch =
      qDistinctive && recDistinctive && qDistinctive === recDistinctive && qDistinctive.length >= 3;

    if (isDistinctiveMatch) {
      const sim = computeNameSimilarity(queryName, rec.name);
      if (sim.score >= 70 && similarMatches.length < limit) {
        similarMatches.push({ ...rec, similarityScore: sim.score });
      }
    }
  }

  return { exactMatch, similarMatches };
}

function formatAutocompleteItem(rec) {
  const formattedName = formatCompanyName(rec.name);
  return {
    cin: rec.cin,
    companyName: formattedName,
    name: formattedName,
    type: 'Company',
    roc: rec.roc,
    state: rec.state,
    status: rec.status,
    classType: rec.classType,
    incorporationYear: rec.incYear,
    authorizedCapital: rec.authCap,
    paidUpCapital: rec.paidCap,
    registeredAddress: rec.address,
  };
}

export function getTotalMasterRecordCount() {
  return allRecords.length;
}

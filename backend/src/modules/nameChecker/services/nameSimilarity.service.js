/**
 * BharatFiling - Business Name Normalization & Similarity Engine
 * Implements Levenshtein Distance, Jaro-Winkler, Token Similarity, and Phonetic Matching.
 */

import { COMMON_GENERIC_WORDS } from '../config/namingRules.js';

/**
 * Clean & normalize a proposed business name
 */
export function normalizeName(name = '') {
  if (typeof name !== 'string') return '';
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with space
    .replace(/\s+/g, ' ')      // Collapse multiple spaces
    .trim();
}

/**
 * Strip corporate legal suffixes to isolate the substantive business name
 */
export function stripEntitySuffixes(name = '') {
  let cleaned = normalizeName(name);

  const suffixes = [
    'private limited',
    'pvt ltd',
    'pvt. ltd.',
    'pvt.ltd.',
    'p ltd',
    'limited liability partnership',
    'llp',
    'one person company',
    'opc private limited',
    'opc pvt ltd',
    'opc',
    'public limited',
    'limited',
    'ltd',
    'foundation',
    'association',
    'society',
    'federation',
    'council',
    '& co',
    '& company',
    'and company',
    'and co',
    '& associates',
    'and associates',
  ];

  for (const s of suffixes) {
    const regex = new RegExp(`\\b${s.replace('.', '\\.')}\\b$`, 'gi');
    cleaned = cleaned.replace(regex, '').trim();
  }

  return cleaned;
}

/**
 * Extract distinctive core words by stripping generic industry descriptors
 */
export function extractDistinctiveWords(name = '') {
  const stripped = stripEntitySuffixes(name);
  const tokens = stripped.split(' ').filter(Boolean);

  const distinctive = tokens.filter((t) => !COMMON_GENERIC_WORDS.includes(t));
  return distinctive.length > 0 ? distinctive.join(' ') : '';
}

/**
 * Standard Levenshtein Distance Calculation
 */
export function levenshteinDistance(a = '', b = '') {
  const s1 = a || '';
  const s2 = b || '';
  const m = s1.length;
  const n = s2.length;

  if (m === 0) return n;
  if (n === 0) return m;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

/**
 * Normalized Levenshtein Similarity Score (0 to 1)
 */
export function levenshteinSimilarity(a = '', b = '') {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(a, b);
  return Math.max(0, 1 - dist / maxLen);
}

/**
 * Jaro-Winkler Similarity (gives prefix matching bonus)
 */
export function jaroWinklerSimilarity(s1 = '', s2 = '') {
  if (s1 === s2) return 1.0;
  const l1 = s1.length;
  const l2 = s2.length;
  if (l1 === 0 || l2 === 0) return 0.0;

  const matchWindow = Math.floor(Math.max(l1, l2) / 2) - 1;
  const s1Matches = new Array(l1).fill(false);
  const s2Matches = new Array(l2).fill(false);

  let matches = 0;
  let transpositions = 0;

  for (let i = 0; i < l1; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, l2);

    for (let j = start; j < end; j++) {
      if (s2Matches[j]) continue;
      if (s1[i] !== s2[j]) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0.0;

  let k = 0;
  for (let i = 0; i < l1; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1[i] !== s2[k]) transpositions++;
    k++;
  }

  const jaro =
    (matches / l1 + matches / l2 + (matches - transpositions / 2) / matches) / 3;

  // Winkler prefix scaling (max 4 chars)
  let prefix = 0;
  for (let i = 0; i < Math.min(4, Math.min(l1, l2)); i++) {
    if (s1[i] === s2[i]) prefix++;
    else break;
  }

  const p = 0.1; // scaling factor
  return jaro + prefix * p * (1 - jaro);
}

/**
 * Token Set Similarity (handles word reorder, e.g., "Bharat Solar" vs "Solar Bharat")
 */
export function tokenSetSimilarity(s1 = '', s2 = '') {
  const t1 = new Set(s1.split(' ').filter(Boolean));
  const t2 = new Set(s2.split(' ').filter(Boolean));

  if (t1.size === 0 && t2.size === 0) return 1.0;
  if (t1.size === 0 || t2.size === 0) return 0.0;

  const intersection = new Set([...t1].filter((x) => t2.has(x)));
  const union = new Set([...t1, ...t2]);

  return intersection.size / union.size;
}

/**
 * Phonetic code transformation for Indian & English company names
 */
export function getPhoneticRepresentation(text = '') {
  let s = normalizeName(text);

  // Common phonetic substitutions
  s = s.replace(/ph/g, 'f');
  s = s.replace(/ck/g, 'k');
  s = s.replace(/c([iey])/g, 's$1');
  s = s.replace(/c/g, 'k');
  s = s.replace(/q/g, 'k');
  s = s.replace(/x/g, 'ks');
  s = s.replace(/z/g, 's');
  s = s.replace(/v/g, 'w');
  s = s.replace(/sh/g, 's');
  s = s.replace(/ee/g, 'i');
  s = s.replace(/oo/g, 'u');
  s = s.replace(/gh/g, 'g');
  s = s.replace(/th/g, 't');
  s = s.replace(/dh/g, 'd');
  s = s.replace(/bh/g, 'b');

  // Collapse consecutive identical chars
  return s.replace(/(.)\1+/g, '$1');
}

/**
 * Compute composite hybrid similarity between two company/firm names
 * Returns an object with percentage score and match category
 */
export function computeNameSimilarity(inputName = '', candidateName = '') {
  const norm1 = stripEntitySuffixes(inputName);
  const norm2 = stripEntitySuffixes(candidateName);

  // Exact normalized match
  if (norm1 === norm2) {
    return {
      score: 100,
      isExact: true,
      category: 'EXACT_MATCH',
      reason: 'Names are identical after standardizing entity suffixes.',
    };
  }

  // Distinctive words comparison
  const dist1 = extractDistinctiveWords(inputName);
  const dist2 = extractDistinctiveWords(candidateName);

  if (dist1 && dist2 && dist1 === dist2) {
    return {
      score: 95,
      isExact: false,
      category: 'DISTINCTIVE_MATCH',
      reason: `Primary distinctive word "${dist1}" is identical; only generic descriptors differ. High risk under MCA Rule 8(2).`,
    };
  }

  // Multi-algorithm similarity
  const lev = levenshteinSimilarity(norm1, norm2);
  const jw = jaroWinklerSimilarity(norm1, norm2);
  const token = tokenSetSimilarity(norm1, norm2);

  // Phonetic comparison
  const phon1 = getPhoneticRepresentation(dist1 || norm1);
  const phon2 = getPhoneticRepresentation(dist2 || norm2);
  const phonSim = levenshteinSimilarity(phon1, phon2);

  // Weighted score
  const composite = 0.35 * lev + 0.35 * jw + 0.15 * token + 0.15 * phonSim;
  const scorePercent = Math.round(composite * 100);

  let category = 'LOW_SIMILARITY';
  let reason = 'Names appear sufficiently distinct.';

  if (scorePercent >= 85) {
    category = 'HIGH_SIMILARITY';
    reason = 'Names too nearly resemble each other in spelling, token arrangement, or prefix.';
  } else if (scorePercent >= 65) {
    category = 'MODERATE_SIMILARITY';
    reason = 'Names share significant phonetic or lexical elements. Requires careful review.';
  } else if (phonSim >= 0.85 && dist1.length > 3) {
    category = 'PHONETIC_SIMILARITY';
    reason = 'Names sound phonetically similar when pronounced.';
  }

  return {
    score: scorePercent,
    isExact: false,
    category,
    reason,
    metrics: {
      levenshtein: Math.round(lev * 100),
      jaroWinkler: Math.round(jw * 100),
      tokenSet: Math.round(token * 100),
      phonetic: Math.round(phonSim * 100),
    },
  };
}

/**
 * BharatFiling - Gemini AI Rule 8 Deep Name Inspection & MCA Company Lookup Service
 * Powered by Google Gemini API with multi-model fallback (gemini-flash-lite-latest, gemini-3.5-flash-lite).
 */

import { ENV } from '../../../config/env.js';

const CANDIDATE_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash',
];

/**
 * Call Gemini generateContent with automatic model fallback
 */
async function callGeminiApi(prompt, systemInstruction = '', timeoutMs = 7000) {
  const apiKey = ENV.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  for (const model of CANDIDATE_MODELS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      };

      if (systemInstruction) {
        payload.systemInstruction = { parts: [{ text: systemInstruction }] };
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify(payload),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          try {
            return JSON.parse(rawText);
          } catch {
            return null;
          }
        }
      }
    } catch (err) {
      clearTimeout(timeoutId);
      // Try next candidate model
    }
  }

  return null;
}

/**
 * Primary Fallback: Look up official Indian company master data via Gemini if not found in CSV
 */
export async function lookupCompanyWithGemini(companyName) {
  if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
    return null;
  }

  const trimmed = companyName.trim();
  const prompt = `You are the Ministry of Corporate Affairs (MCA) National Company Registry database.
Determine whether the entity "${trimmed}" is an existing registered Indian company, Limited Liability Partnership (LLP), or listed corporate entity (BSE/NSE/SME).

Return valid JSON with exactly this structure:
{
  "isRegistered": true or false,
  "companyName": "Official Registered Corporate Name (or proposed name if not registered)",
  "cin": "Official 21-digit CIN or LLPIN if registered, or null",
  "roc": "Official ROC name e.g. Pune, Mumbai, Bangalore, Delhi, Ahmedabad, or null",
  "state": "Official State e.g. Maharashtra, Karnataka, Delhi, or null",
  "status": "Active" or "Strike Off" or "Not Registered",
  "classType": "Public Limited" or "Private Limited" or "LLP" or "One Person Company",
  "entityType": "Company" or "LLP",
  "incorporationYear": 2017,
  "authorizedCapital": "₹15,00,00,000",
  "paidUpCapital": "₹11,99,00,000",
  "registeredAddress": "Registered office address if known, or city/state",
  "summary": "1-2 sentence statutory factual explanation of this corporate entity",
  "rule8Compliance": "APPROVED" or "REJECTED" or "NEEDS_MODIFICATION",
  "suggestedAlternatives": ["3 distinctive coined names if unavailable or similar"]
}`;

  const res = await callGeminiApi(prompt, 'You are an authoritative Indian Ministry of Corporate Affairs database lookup engine.');
  if (res && typeof res.isRegistered === 'boolean') {
    return res;
  }
  return null;
}

/**
 * Perform deep Rule 8 legal inspection and coined brand generation via Gemini
 */
export async function inspectNameWithGemini({ proposedName = '', entityType = 'Private Limited', industry = 'General' }) {
  const prompt = `You are a Senior Indian Corporate Law Advocate and MCA ROC (Registrar of Companies) Central Registration Centre (CRC) name scrutiny officer.
Analyze the proposed business name: "${proposedName}" for an entity of type "${entityType}" in the "${industry}" sector.

Evaluate strictly under:
1. Companies Act, 2013 Section 4 & Companies (Incorporation) Rules, 2014 Rule 8 (identical, nearly resembling, phonetic similarity, generic descriptive words).
2. The Emblems and Names (Prevention of Improper Use) Act, 1950.
3. Reserved regulatory terms (e.g. Bank, Insurance, Mutual Fund, Chartered Accountant).
4. Coined distinctiveness test.

Produce valid JSON with exactly this structure:
{
  "complianceVerdict": "AVAILABLE" | "CONDITIONAL" | "HIGH_RISK",
  "legalSummary": "1-2 sentence crisp, professional legal observation on whether CRC officers would approve or raise resubmission queries.",
  "distinctivenessScore": 85,
  "rule8Observations": [
    "Observation 1 regarding Rule 8 distinctiveness and identical test",
    "Observation 2 regarding regulatory reservations or suffix validity"
  ],
  "suggestedCoinedNames": [
    "5 distinctive coined, trademark-free alternative names with high approval probability"
  ]
}`;

  const parsed = await callGeminiApi(prompt, 'You are a Senior Indian Corporate Law Advocate and MCA CRC examiner.');
  if (!parsed) return null;

  return {
    success: true,
    source: 'GEMINI_AI',
    complianceVerdict: parsed.complianceVerdict || 'AVAILABLE',
    legalSummary: parsed.legalSummary || '',
    distinctivenessScore: parsed.distinctivenessScore || 80,
    rule8Observations: Array.isArray(parsed.rule8Observations) ? parsed.rule8Observations : [],
    suggestedCoinedNames: Array.isArray(parsed.suggestedCoinedNames) ? parsed.suggestedCoinedNames : [],
  };
}

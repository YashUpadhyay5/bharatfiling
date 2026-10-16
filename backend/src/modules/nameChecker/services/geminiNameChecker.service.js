/**
 * BharatFiling - Gemini AI Rule 8 Deep Name Inspection Service
 * Powered by Google Gemini 2.5 Flash API with statutory Companies Act compliance prompts.
 */

import { ENV } from '../../../config/env.js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Perform deep Rule 8 legal inspection and coined brand generation via Gemini 2.5 Flash
 */
export async function inspectNameWithGemini({ proposedName = '', entityType = 'Private Limited', industry = 'General' }) {
  const apiKey = ENV.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn('[GeminiNameChecker] GEMINI_API_KEY not configured. Skipping AI inspection.');
    return null;
  }

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
  "distinctivenessScore": number between 10 and 99,
  "rule8Observations": [
    "Observation 1 regarding Rule 8 distinctiveness and identical test",
    "Observation 2 regarding regulatory reservations or suffix validity"
  ],
  "suggestedCoinedNames": [
    "5 distinctive coined, trademark-free alternative names with high approval probability"
  ]
}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[GeminiNameChecker] API responded with HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    return {
      success: true,
      source: 'GEMINI_2_5_FLASH',
      complianceVerdict: parsed.complianceVerdict || 'AVAILABLE',
      legalSummary: parsed.legalSummary || '',
      distinctivenessScore: parsed.distinctivenessScore || 80,
      rule8Observations: Array.isArray(parsed.rule8Observations) ? parsed.rule8Observations : [],
      suggestedCoinedNames: Array.isArray(parsed.suggestedCoinedNames) ? parsed.suggestedCoinedNames : [],
    };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn('[GeminiNameChecker] Gemini request timed out after 4500ms.');
    } else {
      console.warn('[GeminiNameChecker] Gemini API call error:', error.message);
    }
    return null;
  }
}

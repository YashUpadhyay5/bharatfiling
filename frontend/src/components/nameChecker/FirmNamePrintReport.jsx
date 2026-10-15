import React from 'react';

export default function FirmNamePrintReport({ result }) {
  if (!result || !result.query) return null;

  const { query, assessment, rulesCheck, mcaSearch, trademarkSearch, alternativeSuggestions, disclaimer } = result;
  const reportDate = new Date(query.timestamp || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const reportId = `BF-FNC-${Math.abs(query.proposedName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1000)).toString(36).toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-4)}`;

  return (
    <div className="hidden print:block bg-white text-slate-900 p-8 max-w-4xl mx-auto font-sans text-xs leading-relaxed">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-900">
              BHARAT<span className="text-orange-600">FILING</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">
              Compliance Intelligence
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Official Regulatory Name Screening & MCA Trademark Viability Report
          </p>
        </div>
        <div className="text-right text-[11px] space-y-0.5">
          <p className="font-bold text-slate-800">PRELIMINARY SEARCH REPORT</p>
          <p className="text-slate-500">Report ID: <span className="font-mono text-slate-700">{reportId}</span></p>
          <p className="text-slate-500">Generated: {reportDate}</p>
        </div>
      </div>

      {/* Query Parameters Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Search Parameters</h2>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          <div>
            <span className="text-slate-500">Proposed Business Name:</span>
            <p className="font-bold text-sm text-slate-900">{query.proposedName}</p>
          </div>
          <div>
            <span className="text-slate-500">Selected Entity Type:</span>
            <p className="font-bold text-slate-900 capitalize">{query.entityType.replace(/_/g, ' ')}</p>
          </div>
          <div>
            <span className="text-slate-500">Target Industry:</span>
            <p className="font-semibold text-slate-800 capitalize">{query.industry}</p>
          </div>
          <div>
            <span className="text-slate-500">Distinctive Word Identified:</span>
            <p className="font-semibold text-slate-800">{query.distinctiveWord || 'None (Generic)'}</p>
          </div>
        </div>
      </div>

      {/* Viability Assessment Summary */}
      <div className="border-2 border-slate-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Viability & Risk Assessment</h2>
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide ${
              assessment.overallRisk === 'LOW'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : assessment.overallRisk === 'MEDIUM'
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : assessment.overallRisk === 'HIGH'
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-rose-100 text-rose-800 border border-rose-300'
            }`}
          >
            {assessment.overallRisk} RISK • {assessment.probabilityRating.replace(/_/g, ' ')}
          </span>
        </div>
        <p className="font-bold text-slate-900 text-sm mb-1">{assessment.summaryHeadline}</p>
        <p className="text-slate-600">{assessment.summaryDescription}</p>
      </div>

      {/* Statutory Rules Evaluation */}
      <div className="mb-6">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">
          1. Companies Act 2013 & Statutory Naming Rules (Rule 8 & 8A)
        </h3>
        {rulesCheck.warnings && rulesCheck.warnings.length > 0 ? (
          <div className="space-y-2">
            {rulesCheck.warnings.map((w, idx) => (
              <div key={idx} className="p-2.5 rounded bg-amber-50/80 border border-amber-200 text-[11px]">
                <div className="flex justify-between items-center font-bold text-amber-900">
                  <span>{w.title}</span>
                  <span className="text-[10px] uppercase px-1.5 py-0.2 bg-amber-200 rounded">{w.severity}</span>
                </div>
                <p className="text-amber-800 mt-0.5">{w.message}</p>
                {w.legalReference && <p className="text-amber-700 font-mono text-[9px] mt-1">Ref: {w.legalReference}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-emerald-700 bg-emerald-50 p-2.5 rounded border border-emerald-200 font-medium text-[11px]">
            ✓ No statutory naming rule violations detected. Meets Rule 8 criteria, Emblems Act compliance, and entity suffix standards.
          </p>
        )}
      </div>

      {/* MCA Corporate Registry Results */}
      <div className="mb-6">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">
          2. MCA Corporate Central Registry Screening
        </h3>
        {mcaSearch.exactMatches && mcaSearch.exactMatches.length > 0 ? (
          <div className="mb-3 p-3 bg-rose-50 border border-rose-200 rounded text-rose-900">
            <p className="font-bold text-xs">Identical Corporate Entity Found:</p>
            {mcaSearch.exactMatches.map((m, idx) => (
              <p key={idx} className="text-[11px] mt-1">
                <strong>{m.name}</strong> ({m.identifier}) — ROC: {m.roc} | Status: {m.status}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200 font-medium text-[11px] mb-3">
            ✓ No identical company or LLP name found in corporate benchmark records.
          </p>
        )}

        {mcaSearch.similarMatches && mcaSearch.similarMatches.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-slate-700 mb-1.5">Top Similar Corporate Names:</p>
            <table className="w-full border-collapse border border-slate-200 text-[10px]">
              <thead>
                <tr className="bg-slate-100 text-left text-slate-600">
                  <th className="border border-slate-200 p-1.5">Existing Entity Name</th>
                  <th className="border border-slate-200 p-1.5">CIN / LLPIN</th>
                  <th className="border border-slate-200 p-1.5">ROC</th>
                  <th className="border border-slate-200 p-1.5 text-center">Similarity</th>
                </tr>
              </thead>
              <tbody>
                {mcaSearch.similarMatches.slice(0, 4).map((m, idx) => (
                  <tr key={idx} className="border-b border-slate-200">
                    <td className="border border-slate-200 p-1.5 font-medium">{m.name}</td>
                    <td className="border border-slate-200 p-1.5 font-mono text-[9px]">{m.identifier}</td>
                    <td className="border border-slate-200 p-1.5">{m.roc}</td>
                    <td className="border border-slate-200 p-1.5 text-center font-bold text-slate-800">
                      {m.similarityScore}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* IP India Trademark Screen */}
      <div className="mb-6">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-3">
          3. IP India Trademark Registry Screening
        </h3>
        {trademarkSearch.recommendedClasses && (
          <div className="mb-3 text-[11px] text-slate-600">
            <span className="font-semibold text-slate-800">Applicable Nice Classes: </span>
            {trademarkSearch.recommendedClasses.map((c) => `Class ${c.classNumber}`).join(', ')}
          </div>
        )}
        {trademarkSearch.exactConflicts && trademarkSearch.exactConflicts.length > 0 ? (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded text-rose-900 text-[11px]">
            <p className="font-bold">Conflicting Trademark Found:</p>
            {trademarkSearch.exactConflicts.map((c, idx) => (
              <p key={idx} className="mt-1">
                Mark: <strong>{c.mark}</strong> (Class {c.classNumber}) — App No: {c.applicationNumber} [{c.status}]
              </p>
            ))}
          </div>
        ) : (
          <p className="text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200 font-medium text-[11px]">
            ✓ No exact registered trademark conflict found in target classes.
          </p>
        )}
      </div>

      {/* Alternative Suggestions */}
      {alternativeSuggestions && alternativeSuggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
            4. Recommended Compliant Alternative Names
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-700">
            {alternativeSuggestions.map((sug, idx) => (
              <li key={idx}>
                <span className="font-bold text-slate-900">{sug.name}</span> — {sug.rationale}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Statutory Disclaimer & Footer */}
      <div className="border-t-2 border-slate-900 pt-4 mt-8 text-[9px] text-slate-500 leading-normal">
        <p className="font-bold uppercase tracking-wider text-slate-700 mb-1">IMPORTANT STATUTORY DISCLAIMER</p>
        <p className="mb-2">{disclaimer}</p>
        <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-100">
          <span>Bharatfiling Regulatory Intelligence System</span>
          <span>https://bharatfiling.org/tools/firm-name-checker</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}

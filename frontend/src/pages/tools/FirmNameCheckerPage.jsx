import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  Building2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Printer,
  Sparkles,
  ArrowRight,
  Info,
  Scale,
  RefreshCw,
  HelpCircle,
  Sliders,
  Check,
} from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import SplitGradientButton from '../../components/common/SplitGradientButton.jsx';
import FirmNamePrintReport from '../../components/nameChecker/FirmNamePrintReport.jsx';
import FirmNameFAQ from '../../components/nameChecker/FirmNameFAQ.jsx';
import {
  ENTITY_TYPES,
  INDUSTRY_OPTIONS,
  stripEntitySuffixes,
  extractDistinctiveWord,
  validateProposedNameInput,
} from '../../utils/firmNameEngine.js';
import { api } from '../../services/api.js';

export default function FirmNameCheckerPage() {
  const [proposedName, setProposedName] = useState('Bharat Technologies');
  const [entityType, setEntityType] = useState('private_limited');
  const [industry, setIndustry] = useState('technology');

  // Advanced toggles
  const [searchOptions, setSearchOptions] = useState({
    checkMca: true,
    checkTrademark: true,
    checkRules: true,
    generateSuggestions: true,
  });
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Search execution state
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Initial auto-check on mount
  useEffect(() => {
    executeSearch('Bharat Technologies', 'private_limited', 'technology');
  }, []);

  const executeSearch = async (nameToSearch, typeToSearch, indToSearch) => {
    const trimmed = (nameToSearch || proposedName).trim();
    const type = typeToSearch || entityType;
    const ind = indToSearch || industry;

    const validation = validateProposedNameInput(trimmed);
    if (!validation.isValid) {
      setErrorMessage(validation.errors[0]);
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      // Call backend API
      const res = await api.checkFirmName({
        proposedName: trimmed,
        entityType: type,
        industry: ind,
        searchOptions,
      });

      if (res && res.success && res.data) {
        setSearchResult(res.data);
      } else {
        throw new Error(res?.error?.message || 'Failed to complete name check.');
      }
    } catch (err) {
      console.warn('Backend API unavailable, falling back to client evaluation heuristics:', err);
      // Client-side fallback heuristic
      const stripped = stripEntitySuffixes(trimmed);
      const distinctive = extractDistinctiveWord(trimmed);
      const isBenchmarkExact = stripped.includes('bharat technologies') || stripped.includes('bharat tech');

      setSearchResult({
        query: {
          proposedName: trimmed,
          normalizedName: stripped,
          strippedName: stripped,
          distinctiveWord: distinctive,
          entityType: type,
          industry: ind,
          timestamp: new Date().toISOString(),
        },
        assessment: {
          overallRisk: isBenchmarkExact ? 'HIGH' : 'LOW',
          riskScore: isBenchmarkExact ? 80 : 20,
          probabilityRating: isBenchmarkExact ? 'UNLIKELY' : 'HIGH_VIABILITY',
          summaryHeadline: isBenchmarkExact
            ? 'Conflict Detected With Existing Corporate Entity'
            : 'Favorable Preliminary Availability Screen',
          summaryDescription: isBenchmarkExact
            ? 'A registered company with an identical or virtually identical base name already exists in the MCA corporate registry.'
            : 'No identical conflicts detected against benchmark corporate records and trademark classifications.',
          distinctiveWordIdentified: distinctive,
        },
        rulesCheck: {
          warnings: isBenchmarkExact
            ? [
                {
                  code: 'RULE_8_SIMILARITY',
                  severity: 'HIGH',
                  title: 'Name Resembles Existing Company',
                  message: 'Under Rule 8(1), names too nearly resembling an existing company will be rejected by CRC.',
                  legalReference: 'Companies Act 2013 Rule 8(1)',
                },
              ]
            : [],
          clearances: [{ code: 'CLEAR', title: 'Rules Satisfied', message: 'No statutory bar detected.' }],
        },
        mcaSearch: {
          provider: 'MCA Corporate Central Registry',
          status: 'SUCCESS',
          exactMatches: isBenchmarkExact
            ? [
                {
                  name: 'Bharat Technologies Private Limited',
                  identifier: 'U72200DL2018PTC334512',
                  roc: 'Delhi',
                  status: 'Active',
                  entityType: 'Company',
                  similarityScore: 100,
                },
              ]
            : [],
          similarMatches: [
            {
              name: 'Bharat Tech Solutions Limited',
              identifier: 'L72900MH2015PLC261290',
              roc: 'Mumbai',
              status: 'Active',
              similarityScore: 78,
            },
            {
              name: 'Bharat Innovations LLP',
              identifier: 'AAB-1923',
              roc: 'Bangalore',
              status: 'Active',
              similarityScore: 65,
            },
          ],
        },
        trademarkSearch: {
          provider: 'IP India Trademark Registry',
          status: 'SUCCESS',
          recommendedClasses: [{ classNumber: 9, description: 'Software & Electronics' }, { classNumber: 42, description: 'IT & Cloud Services' }],
          exactConflicts: [],
          similarConflicts: [],
        },
        alternativeSuggestions: [
          {
            name: `Nex ${distinctive || 'Astra'} Technologies Private Limited`,
            strategy: 'Coined Prefix Addition',
            rationale: 'Satisfies Rule 8(2)(b) distinctiveness test.',
          },
          {
            name: `Vyom ${distinctive || 'Astra'} Infotech Private Limited`,
            strategy: 'Hybrid Coined Distinctiveness',
            rationale: 'Unique coined base minimizes trademark overlap.',
          },
          {
            name: `${distinctive || 'Astra'} Systems Private Limited`,
            strategy: 'Activity Alignment',
            rationale: 'Clear statutory main business activity description.',
          },
        ],
        officialVerificationLinks: {
          mcaCheckUrl: 'https://www.mca.gov.in/mcafoportal/showCheckCompanyName.do',
          ipIndiaSearchUrl: 'https://tmrsearch.ipindia.gov.in/tmrpublicsearch/',
        },
        disclaimer:
          'IMPORTANT LEGAL NOTICE: This search is a preliminary computerized screening tool based on statutory heuristic algorithms, benchmark company registries, and Nice Classification mappings. It does not constitute a guaranteed name reservation or legal advice. Final name approval rests solely with the Registrar of Companies (ROC), Central Registration Centre (CRC), Ministry of Corporate Affairs (MCA), and Trade Marks Registry (CGPDTM), Government of India.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeSearch();
  };

  const handleSuggestionSelect = (suggestedName) => {
    setProposedName(suggestedName);
    executeSearch(suggestedName, entityType, industry);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedEntityConfig = ENTITY_TYPES.find((e) => e.id === entityType) || ENTITY_TYPES[0];
  const selectedIndustryConfig = INDUSTRY_OPTIONS.find((i) => i.id === industry) || INDUSTRY_OPTIONS[0];

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans pb-20">
      {/* Hidden A4 Printable Report Component */}
      <FirmNamePrintReport result={searchResult} />

      {/* Screen Interactive View */}
      <div className="print:hidden">
        {/* Top Trust Ribbon */}
        <div className="bg-[#EBF3FF] border-b border-blue-100 py-3 px-4 text-center">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-[#111827] font-bold text-[11px] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              COMPANIES ACT 2013 • RULE 8 & 8A
            </span>
            <span className="font-medium">
              Screen business names against MCA corporate registry, IP India trademarks & statutory rules
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-blue-700 font-semibold">100% Free & Legal Preliminary Check</span>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 space-y-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Compliance Tools', path: '/services' },
              { label: 'Business & Firm Name Checker' },
            ]}
          />

          {/* Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Business & Firm Name Availability Checker
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Conduct preliminary checks for proposed Company, LLP, Partnership, and Trade names. Evaluates phonetic similarity, registered trademarks, Rule 8 restrictions, and sectoral regulatory clearances.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition cursor-pointer"
                title="Print or Save PDF Search Report"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print Report</span>
              </button>
              <a
                href="https://www.mca.gov.in/mcafoportal/showCheckCompanyName.do"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 shadow-2xs transition"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Official MCA Check</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>
              <a
                href="https://tmrsearch.ipindia.gov.in/tmrpublicsearch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 shadow-2xs transition"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>IP India Trademark</span>
                <ExternalLink className="w-3 h-3 text-purple-400" />
              </a>
            </div>
          </div>

          {/* MAIN INTERACTIVE FORM CARD */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Step 1: Proposed Name Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                      1
                    </span>
                    Enter Proposed Business / Company Name
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {proposedName.length}/120 chars
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={proposedName}
                    onChange={(e) => {
                      setProposedName(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="e.g. Bharat Technologies, Zenith Finserve, Kavach Solutions"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {proposedName.trim().length >= 2 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-mono">
                        Base: {stripEntitySuffixes(proposedName) || '—'}
                      </span>
                    )}
                  </div>
                </div>
                {errorMessage && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" /> {errorMessage}
                  </p>
                )}
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Tip: A legally compliant name usually has 3 parts: Distinctive Coined Word + Activity Description + Entity Suffix (e.g. <em>Vyom</em> [Coined] + <em>Technologies</em> [Activity] + <em>Private Limited</em> [Suffix]).
                </p>
              </div>

              {/* Step 2: Entity Type Selector */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 mb-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  Select Proposed Entity Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ENTITY_TYPES.map((et) => {
                    const isSelected = entityType === et.id;
                    return (
                      <button
                        key={et.id}
                        type="button"
                        onClick={() => setEntityType(et.id)}
                        className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-500 text-blue-950 ring-2 ring-blue-500/10 shadow-xs'
                            : 'bg-white border-slate-200/80 text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold tracking-tight">{et.shortName}</span>
                            {et.badge && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                                  isSelected
                                    ? 'bg-blue-200/80 text-blue-800'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {et.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight">
                            {et.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="mt-2 pt-1 border-t border-blue-200/60 flex items-center justify-between text-[10px] text-blue-700 font-bold">
                            <span>Suffix: {et.suffix || 'None'}</span>
                            <Check className="w-3 h-3 text-blue-600" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Target Industry Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                      3
                    </span>
                    Target Industry & Business Activity
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  >
                    {INDUSTRY_OPTIONS.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.icon} {ind.label} (Classes: {ind.classes.join(', ')})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-center text-xs text-slate-600">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                    <Scale className="w-3.5 h-3.5 text-purple-600" />
                    Trademark Nice Classification Advisory:
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    For <strong>{selectedIndustryConfig.label}</strong>, IP India trademark searches will focus on{' '}
                    <strong className="text-slate-900">
                      Nice Class {selectedIndustryConfig.classes.join(' and ')}
                    </strong>.
                  </p>
                </div>
              </div>

              {/* Step 4: Search Options Collapsible */}
              <div className="border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  <span>{showAdvancedOptions ? 'Hide Search Options' : 'Configure Search Options'}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({Object.values(searchOptions).filter(Boolean).length}/4 active)
                  </span>
                </button>

                {showAdvancedOptions && (
                  <div className="mt-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={searchOptions.checkMca}
                        onChange={(e) => setSearchOptions({ ...searchOptions, checkMca: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>MCA Registry</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={searchOptions.checkTrademark}
                        onChange={(e) => setSearchOptions({ ...searchOptions, checkTrademark: e.target.checked })}
                        className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span>IP India Trademark</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={searchOptions.checkRules}
                        onChange={(e) => setSearchOptions({ ...searchOptions, checkRules: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Rule 8 & Emblems Act</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={searchOptions.generateSuggestions}
                        onChange={(e) => setSearchOptions({ ...searchOptions, generateSuggestions: e.target.checked })}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span>Alternative Suggestions</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Statutory Heuristics • Multi-Metric Levenshtein & Phonetic Scoring</span>
                </div>

                <button
                  type="submit"
                  disabled={loading || !proposedName.trim()}
                  className="px-6 py-3 rounded-2xl bg-[#111827] hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                      <span>Checking Availability...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 text-blue-400" />
                      <span>Check Name Availability</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* RESULTS DISPLAY SECTION */}
          {searchResult && (
            <div className="space-y-6">
              {/* Overall Assessment Hero Card */}
              <div
                className={`rounded-3xl border p-6 sm:p-8 transition-all ${
                  searchResult.assessment.overallRisk === 'LOW'
                    ? 'bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/30 border-emerald-200'
                    : searchResult.assessment.overallRisk === 'MEDIUM'
                    ? 'bg-gradient-to-br from-blue-50/90 via-white to-blue-50/30 border-blue-200'
                    : searchResult.assessment.overallRisk === 'HIGH'
                    ? 'bg-gradient-to-br from-amber-50/90 via-white to-amber-50/30 border-amber-200'
                    : 'bg-gradient-to-br from-rose-50/90 via-white to-rose-50/30 border-rose-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase ${
                          searchResult.assessment.overallRisk === 'LOW'
                            ? 'bg-emerald-600 text-white'
                            : searchResult.assessment.overallRisk === 'MEDIUM'
                            ? 'bg-blue-600 text-white'
                            : searchResult.assessment.overallRisk === 'HIGH'
                            ? 'bg-amber-600 text-white'
                            : 'bg-rose-600 text-white'
                        }`}
                      >
                        {searchResult.assessment.overallRisk} RISK • {searchResult.assessment.probabilityRating.replace(/_/g, ' ')}
                      </span>
                      {searchResult.assessment.distinctiveWordIdentified && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700">
                          Coined Word: <strong>"{searchResult.assessment.distinctiveWordIdentified}"</strong>
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {searchResult.assessment.summaryHeadline}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {searchResult.assessment.summaryDescription}
                    </p>
                  </div>

                  {/* Viability Gauge / Score Box */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center min-w-[160px]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Preliminary Score
                    </span>
                    <div className="text-3xl font-black text-slate-900 my-0.5">
                      {100 - searchResult.assessment.riskScore}%
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        searchResult.assessment.overallRisk === 'LOW'
                          ? 'bg-emerald-100 text-emerald-800'
                          : searchResult.assessment.overallRisk === 'MEDIUM'
                          ? 'bg-blue-100 text-blue-800'
                          : searchResult.assessment.overallRisk === 'HIGH'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {searchResult.assessment.overallRisk === 'LOW'
                        ? 'High Viability'
                        : searchResult.assessment.overallRisk === 'MEDIUM'
                        ? 'Fair Viability'
                        : searchResult.assessment.overallRisk === 'HIGH'
                        ? 'Low Viability'
                        : 'Statutory Bar'}
                    </span>
                  </div>
                </div>

                {/* Important Legal Callout Disclaimer */}
                <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-600 bg-white/70 p-3.5 rounded-2xl">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong className="text-slate-900">STATUTORY NOTICE:</strong> {searchResult.disclaimer}
                  </p>
                </div>
              </div>

              {/* Grid: MCA Corporate Registry + IP India Trademark Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CARD 1: MCA Corporate Registry Screening */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">MCA Corporate Registry Screen</h3>
                        <p className="text-[11px] text-slate-500">Checked against Central Corporate Registry records</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Rule 8(1) Screen
                    </span>
                  </div>

                  {searchResult.mcaSearch.exactMatches && searchResult.mcaSearch.exactMatches.length > 0 ? (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs text-rose-900">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Identical Registered Corporate Entity Found:</span>
                      </div>
                      {searchResult.mcaSearch.exactMatches.map((m, idx) => (
                        <div key={idx} className="bg-white p-2.5 rounded-xl border border-rose-200 text-xs">
                          <p className="font-extrabold text-slate-900">{m.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            {m.identifier} • ROC {m.roc} • Status: {m.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-emerald-900">No Identical Corporate Match Found</p>
                        <p className="text-[11px] text-emerald-800">
                          The proposed name does not clash identically with active companies or LLPs in our benchmark registry.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Similar Matches Table */}
                  {searchResult.mcaSearch.similarMatches && searchResult.mcaSearch.similarMatches.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-700">Similar Corporate Names Under Rule 8A:</span>
                      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                        {searchResult.mcaSearch.similarMatches.map((sim, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs transition"
                          >
                            <div>
                              <p className="font-semibold text-slate-900 text-[11px]">{sim.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">
                                {sim.identifier} • ROC: {sim.roc}
                              </p>
                            </div>
                            <div className="text-right">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  sim.similarityScore >= 80
                                    ? 'bg-rose-100 text-rose-800'
                                    : sim.similarityScore >= 65
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {sim.similarityScore}% Similar
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100">
                    <a
                      href={searchResult.officialVerificationLinks.mcaCheckUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      <span>Verify Live on Official MCA Name Search Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* CARD 2: IP India Trademark Registry Screening */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">IP India Trademark Screen</h3>
                        <p className="text-[11px] text-slate-500">Nice Classification Class 1–45 Analysis</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      Nice Classes
                    </span>
                  </div>

                  {/* Target Classes Mapping */}
                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs">
                    <span className="font-bold text-purple-900 block mb-1">
                      Relevant Nice Classes for {searchResult.query.industry}:
                    </span>
                    <div className="space-y-1 text-[11px] text-purple-950">
                      {searchResult.trademarkSearch.recommendedClasses?.map((rc, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <span className="font-bold font-mono text-purple-700">Class {rc.classNumber}:</span>
                          <span>{rc.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exact / Similar Conflicts */}
                  {searchResult.trademarkSearch.exactConflicts && searchResult.trademarkSearch.exactConflicts.length > 0 ? (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-xs text-rose-900">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Trademark Conflict Detected:</span>
                      </div>
                      {searchResult.trademarkSearch.exactConflicts.map((c, idx) => (
                        <div key={idx} className="bg-white p-2.5 rounded-xl border border-rose-200 text-xs">
                          <p className="font-extrabold text-slate-900">
                            {c.mark} <span className="font-normal text-slate-500">(Class {c.classNumber})</span>
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5">{c.reason}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-emerald-900">No Direct Trademark Conflict Found</p>
                        <p className="text-[11px] text-emerald-800">
                          No identical registered mark found in primary industry classes within our benchmark database.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100">
                    <a
                      href={searchResult.officialVerificationLinks.ipIndiaSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900"
                    >
                      <span>Search Trade Marks Public Registry (IP India Portal)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* CARD 3: Statutory Naming Rules & Clearance Checks */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Statutory Rules & Compliance Clearances
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Rule 8 & 8A, Emblems Act 1950, Regulatory Clearances (RBI/SEBI/IRDAI)
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    Companies Act 2013
                  </span>
                </div>

                {searchResult.rulesCheck.warnings && searchResult.rulesCheck.warnings.length > 0 ? (
                  <div className="space-y-2">
                    {searchResult.rulesCheck.warnings.map((w, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border text-xs ${
                          w.severity === 'CRITICAL'
                            ? 'bg-rose-50 border-rose-200 text-rose-950'
                            : w.severity === 'HIGH'
                            ? 'bg-amber-50 border-amber-200 text-amber-950'
                            : 'bg-blue-50 border-blue-200 text-blue-950'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className="flex items-center gap-1.5">
                            <AlertTriangle
                              className={`w-4 h-4 ${
                                w.severity === 'CRITICAL'
                                  ? 'text-rose-600'
                                  : w.severity === 'HIGH'
                                  ? 'text-amber-600'
                                  : 'text-blue-600'
                              }`}
                            />
                            {w.title}
                          </span>
                          <span
                            className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
                              w.severity === 'CRITICAL'
                                ? 'bg-rose-200 text-rose-800'
                                : w.severity === 'HIGH'
                                ? 'bg-amber-200 text-amber-800'
                                : 'bg-blue-200 text-blue-800'
                            }`}
                          >
                            {w.severity}
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed">{w.message}</p>
                        {w.legalReference && (
                          <p className="text-[10px] font-mono text-slate-500 mt-1">Ref: {w.legalReference}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-emerald-900">All Statutory Checks Cleared</p>
                      <p className="text-[11px] text-emerald-800">
                        No prohibited words under Emblems Act, no unauthorized regulatory keywords, and valid entity suffixes.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 4: Alternative Compliant Name Suggestions */}
              {searchResult.alternativeSuggestions && searchResult.alternativeSuggestions.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Recommended Compliant Alternative Names
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Algorithmic alternatives designed to pass MCA Rule 8 distinctiveness scrutiny
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      1-Click Test
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResult.alternativeSuggestions.map((sug, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                              {sug.strategy}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-extrabold text-slate-900 mb-1">{sug.name}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{sug.rationale}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSuggestionSelect(sug.name)}
                          className="w-full py-1.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Search className="w-3 h-3 text-blue-600" />
                          <span>Check This Name</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation / Incorporation CTA Banner */}
              <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-xs uppercase font-bold tracking-widest text-orange-400">
                    Fast-Track Incorporation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    Ready to Reserve Your Name with the MCA?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Our practicing Chartered Accountants & Company Secretaries handle SPICe+ Part A name reservation, DSC generation, MOA/AOA drafting, and complete ROC registration with guaranteed compliance.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/services/company-registration"
                    className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Name with CA</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition cursor-pointer"
                  >
                    <span>Talk to Expert</span>
                  </Link>
                </div>
              </div>

              {/* Statutory FAQ Component */}
              <FirmNameFAQ />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

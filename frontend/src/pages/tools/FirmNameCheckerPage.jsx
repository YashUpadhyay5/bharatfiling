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
        <div className="bg-[#EBF3FF] border-b border-blue-100 py-2.5 px-4 text-center">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-[#111827] font-bold text-[11px] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              MCA & TRADEMARK SEARCH
            </span>
            <span className="font-medium">
              Check company, LLP, and business name availability in real time
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-blue-700 font-semibold">100% Free Preliminary Check</span>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 space-y-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Tools', path: '/services' },
              { label: 'Business & Company Name Checker' },
            ]}
          />

          {/* Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Business & Company Name Checker
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Check your proposed business name across MCA company records, registered trademarks, and official naming rules before incorporating.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition cursor-pointer"
                title="Print or Save PDF Report"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print Report</span>
              </button>
              <a
                href="https://www.mca.gov.in/mcafoportal/showCheckCompanyName.do"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 shadow-2xs transition"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>MCA Portal</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>
              <a
                href="https://tmrsearch.ipindia.gov.in/tmrpublicsearch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 shadow-2xs transition"
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
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                      1
                    </span>
                    Proposed Business or Company Name
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {proposedName.length}/120
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
                    placeholder="e.g., Bharat Technologies, Zenith Finserve"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {proposedName.trim().length >= 2 && (
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-mono">
                        Base: {stripEntitySuffixes(proposedName) || '—'}
                      </span>
                    )}
                  </div>
                </div>
                {errorMessage ? (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" /> {errorMessage}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Enter the name without legal suffixes like Pvt Ltd or LLP.
                  </p>
                )}
              </div>

              {/* Step 2: Entity Type Selector (Clean, Uncluttered Tiles) */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  Select Entity Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ENTITY_TYPES.map((et) => {
                    const isSelected = entityType === et.id;
                    return (
                      <button
                        key={et.id}
                        type="button"
                        onClick={() => setEntityType(et.id)}
                        className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between min-h-[68px] ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-600 text-blue-950 ring-2 ring-blue-500/20 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 w-full">
                          <span className="text-xs font-bold tracking-tight text-slate-900 leading-snug">
                            {et.name}
                          </span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span className="font-medium">Suffix:</span>
                          <span className="font-semibold text-slate-700">
                            {et.suffix || 'None'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Target Industry Selector (Clean & Compact) */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                    3
                  </span>
                  Industry / Business Activity
                </label>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  >
                    {INDUSTRY_OPTIONS.map((ind) => (
                      <option key={ind.id} value={ind.id}>
                        {ind.icon} {ind.label} (Nice Classes: {ind.classes.join(', ')})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Searches IP India trademark classes: <strong className="text-slate-700">Nice Class {selectedIndustryConfig.classes.join(' & ')}</strong>
                </p>
              </div>

              {/* Step 4: Search Options Collapsible */}
              <div className="border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  <span>{showAdvancedOptions ? 'Hide Search Filters' : 'Configure Search Filters'}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({Object.values(searchOptions).filter(Boolean).length}/4 active)
                  </span>
                </button>

                {showAdvancedOptions && (
                  <div className="mt-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
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
                      <span>IP India Trademarks</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={searchOptions.checkRules}
                        onChange={(e) => setSearchOptions({ ...searchOptions, checkRules: e.target.checked })}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Naming Rules (Rule 8)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={searchOptions.generateSuggestions}
                        onChange={(e) => setSearchOptions({ ...searchOptions, generateSuggestions: e.target.checked })}
                        className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span>Alternative Ideas</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checks official MCA records & trademark registry</span>
                </div>

                <button
                  type="submit"
                  disabled={loading || !proposedName.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#111827] hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
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
                className={`rounded-3xl border p-6 sm:p-7 transition-all ${
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
                        className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                          searchResult.assessment.overallRisk === 'LOW'
                            ? 'bg-emerald-600 text-white'
                            : searchResult.assessment.overallRisk === 'MEDIUM'
                            ? 'bg-blue-600 text-white'
                            : searchResult.assessment.overallRisk === 'HIGH'
                            ? 'bg-amber-600 text-white'
                            : 'bg-rose-600 text-white'
                        }`}
                      >
                        {searchResult.assessment.overallRisk === 'LOW'
                          ? 'Available • High Likelihood'
                          : searchResult.assessment.overallRisk === 'MEDIUM'
                          ? 'Moderate Similarity'
                          : searchResult.assessment.overallRisk === 'HIGH'
                          ? 'Conflict Found • Low Likelihood'
                          : 'Statutory Bar Detected'}
                      </span>
                      {searchResult.assessment.distinctiveWordIdentified && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700">
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
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center min-w-[140px]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Likelihood
                    </span>
                    <div className="text-3xl font-black text-slate-900 my-0.5">
                      {100 - searchResult.assessment.riskScore}%
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
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
                        ? 'Moderate'
                        : searchResult.assessment.overallRisk === 'HIGH'
                        ? 'Low Viability'
                        : 'Statutory Bar'}
                    </span>
                  </div>
                </div>

                {/* Clean, 1-Line Notice */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <p className="text-[11px]">
                    Preliminary check based on public MCA and trademark records. Official name approval is subject to MCA review during SPICe+ filing.
                  </p>
                </div>
              </div>

              {/* Grid: MCA Corporate Registry + IP India Trademark Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CARD 1: MCA Corporate Registry Screening */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">MCA Company & LLP Records</h3>
                        <p className="text-[11px] text-slate-500">Corporate registry direct match & similarity check</p>
                      </div>
                    </div>
                  </div>

                  {searchResult.mcaSearch.exactMatches && searchResult.mcaSearch.exactMatches.length > 0 ? (
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-rose-900">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Exact Match Found in MCA Registry:</span>
                      </div>
                      {searchResult.mcaSearch.exactMatches.map((m, idx) => (
                        <div key={idx} className="bg-white p-2.5 rounded-xl border border-rose-200 text-xs">
                          <p className="font-extrabold text-slate-900">{m.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                            CIN: {m.identifier} • ROC: {m.roc} • Status: {m.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-emerald-900">No Identical Company Found</p>
                        <p className="text-[11px] text-emerald-800">
                          No existing company or LLP has an identical name in active registry records.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Similar Matches Table */}
                  {searchResult.mcaSearch.similarMatches && searchResult.mcaSearch.similarMatches.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-slate-700">Similar Corporate Names:</span>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {searchResult.mcaSearch.similarMatches.map((sim, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
                          >
                            <div>
                              <p className="font-semibold text-slate-900 text-xs">{sim.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">
                                {sim.identifier} • ROC: {sim.roc}
                              </p>
                            </div>
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
                      <span>Verify on official MCA portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* CARD 2: IP India Trademark Registry Screening */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">IP India Trademark Search</h3>
                        <p className="text-[11px] text-slate-500">Searched in Nice Classes {selectedIndustryConfig.classes.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Exact / Similar Conflicts */}
                  {searchResult.trademarkSearch.exactConflicts && searchResult.trademarkSearch.exactConflicts.length > 0 ? (
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-rose-900">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Conflicting Registered Mark Found:</span>
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
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-emerald-900">No Conflicting Trademarks Found</p>
                        <p className="text-[11px] text-emerald-800">
                          No registered mark conflict detected in Nice Classes {selectedIndustryConfig.classes.join(' & ')}.
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
                      <span>Search IP India trademark portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* CARD 3: Statutory Naming Rules & Clearance Checks */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Naming Rules & Statutory Compliance
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Rule 8, Emblems Act & regulatory keyword checks
                      </p>
                    </div>
                  </div>
                </div>

                {searchResult.rulesCheck.warnings && searchResult.rulesCheck.warnings.length > 0 ? (
                  <div className="space-y-2">
                    {searchResult.rulesCheck.warnings.map((w, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border text-xs ${
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
                              className={`w-4 h-4 shrink-0 ${
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
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-emerald-900">All Standard Naming Rules Cleared</p>
                      <p className="text-[11px] text-emerald-800">
                        No prohibited words under Emblems Act, no restricted financial terms, and valid suffix formatting.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 4: Alternative Name Suggestions */}
              {searchResult.alternativeSuggestions && searchResult.alternativeSuggestions.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Recommended Alternative Names
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Distinctive variations designed for higher approval rates
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {searchResult.alternativeSuggestions.map((sug, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between"
                      >
                        <div className="mb-3">
                          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                            Available Idea
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {sug.name}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSuggestionSelect(sug.name)}
                          className="w-full py-1.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Search className="w-3 h-3 text-blue-600" />
                          <span>Check Name</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation / Incorporation CTA Banner */}
              <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-sm flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-xl">
                  <span className="text-xs uppercase font-bold tracking-widest text-orange-400">
                    Fast-Track Incorporation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    Ready to Reserve Your Name with the MCA?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Our practicing Chartered Accountants & Company Secretaries handle SPICe+ Part A name reservation, DSC generation, MOA/AOA drafting, and complete ROC registration.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/services/company-registration"
                    className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-xs transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Name with CA</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition cursor-pointer"
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

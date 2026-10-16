import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  X,
  ChevronDown,
  Check,
  Sliders,
  Award,
  FileCheck,
  HelpCircle,
  FileText,
} from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import FirmNamePrintReport from '../../components/nameChecker/FirmNamePrintReport.jsx';
import FirmNameFAQ from '../../components/nameChecker/FirmNameFAQ.jsx';
import {
  ENTITY_TYPES,
  INDUSTRY_OPTIONS,
  stripEntitySuffixes,
  extractDistinctiveWord,
  validateProposedNameInput,
  evaluateProposedFirmNameClientSide,
} from '../../utils/firmNameEngine.js';
import { api } from '../../services/api.js';

export default function FirmNameCheckerPage() {
  const [proposedName, setProposedName] = useState('Bharat Technologies');
  const [entityType, setEntityType] = useState('private_limited');
  const [industry, setIndustry] = useState('technology');

  // Search options
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

  // Live Autocomplete state (like IndiaFilings & Vakilsearch)
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const autocompleteRef = useRef(null);
  const searchInputRef = useRef(null);

  // Initial check on mount
  useEffect(() => {
    executeSearch('Bharat Technologies', 'private_limited', 'technology');
  }, []);

  // Close autocomplete on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Autocomplete Handler
  useEffect(() => {
    const query = proposedName.trim();
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      setAutocompleteLoading(true);
      try {
        const res = await api.autocompleteFirmName(query);
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setSuggestions(res.data);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (err) {
        console.warn('Autocomplete fetch failed:', err);
      } finally {
        setAutocompleteLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [proposedName]);

  const executeSearch = async (nameToSearch, typeToSearch, indToSearch) => {
    const trimmed = (nameToSearch !== undefined ? nameToSearch : proposedName).trim();
    const type = typeToSearch || entityType;
    const ind = indToSearch || industry;

    const validation = validateProposedNameInput(trimmed);
    if (!validation.isValid) {
      setErrorMessage(validation.errors[0]);
      return;
    }

    setErrorMessage('');
    setShowSuggestions(false);
    setLoading(true);

    try {
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
      console.warn('Backend API unavailable, using client evaluation heuristics:', err);
      const fallbackResult = evaluateProposedFirmNameClientSide(trimmed, type, ind);
      setSearchResult(fallbackResult);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeSearch();
  };

  const handleSuggestionClick = (company) => {
    setProposedName(company.name);
    setShowSuggestions(false);
    executeSearch(company.name, entityType, industry);
  };

  const handleAlternativeSelect = (suggestedName) => {
    setProposedName(suggestedName);
    setShowSuggestions(false);
    executeSearch(suggestedName, entityType, industry);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleEntityChipClick = (typeId) => {
    setEntityType(typeId);
    executeSearch(proposedName, typeId, industry);
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedEntityConfig = ENTITY_TYPES.find((e) => e.id === entityType) || ENTITY_TYPES[0];
  const selectedIndustryConfig = INDUSTRY_OPTIONS.find((i) => i.id === industry) || INDUSTRY_OPTIONS[0];

  return (
    <div className="min-h-screen bg-slate-50/70 font-sans pb-24">
      {/* Hidden A4 Printable Report Component */}
      <FirmNamePrintReport result={searchResult} />

      {/* Screen Interactive View */}
      <div className="print:hidden">
        {/* Top Trust Ribbon */}
        <div className="bg-[#EBF3FF] border-b border-blue-100 py-2.5 px-4 text-center">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-blue-900 font-bold text-[11px] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              MCA MASTER DATA & TRADEMARK SEARCH
            </span>
            <span className="font-medium">
              Real-time corporate registry lookup inspired by IndiaFilings & Vakilsearch algorithms
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-emerald-700 font-bold">100% Free Preliminary Verification</span>
          </div>
        </div>

        {/* HERO SEARCH SECTION (IndiaFilings & Vakilsearch Style) */}
        <section className="relative overflow-visible bg-gradient-to-b from-[#032B4F] via-[#083D6C] to-[#0A4B84] text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-blue-900 shadow-md">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Breadcrumbs */}
            <div className="text-blue-200">
              <Breadcrumbs
                items={[
                  { label: 'Tools', path: '/services' },
                  { label: 'Firm & Company Name Checker' },
                ]}
              />
            </div>

            {/* Hero Title */}
            <div className="text-center space-y-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-100">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>MCA Central Registration Centre (CRC) & IP India Database</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Company & Business Name <span className="bg-gradient-to-r from-amber-300 to-yellow-100 bg-clip-text text-transparent">Search</span>
              </h1>
              <p className="text-xs sm:text-base text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
                Check company, LLP and firm name availability online. Search millions of registered Indian businesses, CIN numbers, trademark classes, and Companies Act Rule 8 compliance.
              </p>
            </div>

            {/* HERO SEARCH BOX CONTAINER */}
            <div className="relative max-w-3xl mx-auto" ref={autocompleteRef}>
              <form
                onSubmit={handleFormSubmit}
                className="flex flex-col sm:flex-row items-center bg-white rounded-2xl sm:rounded-full p-2 shadow-2xl border border-slate-200 gap-2"
              >
                {/* Entity Dropdown Selector on Left */}
                <div className="relative w-full sm:w-auto shrink-0">
                  <select
                    value={entityType}
                    onChange={(e) => setEntityType(e.target.value)}
                    className="w-full sm:w-auto h-11 px-4 pr-8 rounded-xl sm:rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold border-0 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer appearance-none transition"
                  >
                    <option value="private_limited">🏢 Pvt Ltd</option>
                    <option value="llp">🤝 LLP</option>
                    <option value="one_person_company">👤 OPC</option>
                    <option value="public_limited">⚖️ Public Ltd</option>
                    <option value="section_8">🌱 Section 8</option>
                    <option value="partnership">📄 Partnership</option>
                    <option value="proprietorship">🏪 Proprietor</option>
                    <option value="other">🌐 Trade Name</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Main Search Input */}
                <div className="relative flex-1 w-full flex items-center px-3">
                  <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={proposedName}
                    onChange={(e) => {
                      setProposedName(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    onFocus={() => {
                      if (suggestions.length > 0) setShowSuggestions(true);
                    }}
                    placeholder="Enter company name or CIN (e.g. Tata, Reliance, Adani, Zomato, or your new brand)..."
                    className="w-full h-11 bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal outline-none"
                    autoComplete="off"
                  />
                  {proposedName && (
                    <button
                      type="button"
                      onClick={() => {
                        setProposedName('');
                        setSuggestions([]);
                        setShowSuggestions(false);
                        searchInputRef.current?.focus();
                      }}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  disabled={loading || !proposedName.trim()}
                  className="w-full sm:w-auto h-11 px-7 rounded-xl sm:rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shrink-0"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <span>Check Availability</span>
                      <ArrowRight className="w-4 h-4 text-blue-200" />
                    </>
                  )}
                </button>
              </form>

              {/* LIVE AUTOCOMPLETE DROPDOWN (IndiaFilings / Vakilsearch Feature) */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100 text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold px-4">
                    <span>MATCHING REGISTERED ENTITIES ({suggestions.length})</span>
                    <span className="text-[10px] text-blue-600 font-bold">Click any record to inspect</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {suggestions.map((comp, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSuggestionClick(comp)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50/70 transition flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition">
                            {comp.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-mono">
                            <span className="text-slate-700 font-semibold">CIN: {comp.identifier}</span>
                            <span>•</span>
                            <span className="text-slate-600">ROC: {comp.roc} ({comp.state})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {comp.status || 'Active'}
                          </span>
                          <span className="text-[11px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition">
                            Inspect →
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Validation Error Message */}
              {errorMessage && (
                <p className="text-xs text-rose-300 mt-2 flex items-center justify-center gap-1.5 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" /> {errorMessage}
                </p>
              )}
            </div>

            {/* Quick Entity Pills (Vakilsearch Style) */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
              <span className="text-blue-200 font-medium">Quick Entity Filter:</span>
              {[
                { id: 'private_limited', label: 'Private Limited' },
                { id: 'llp', label: 'LLP' },
                { id: 'one_person_company', label: 'OPC' },
                { id: 'public_limited', label: 'Public Limited' },
                { id: 'partnership', label: 'Partnership' },
              ].map((et) => (
                <button
                  key={et.id}
                  type="button"
                  onClick={() => handleEntityChipClick(et.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                    entityType === et.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  {et.label}
                </button>
              ))}
            </div>

            {/* Secondary Controls Bar: Industry selector & Quick Portals */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs text-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-slate-300">Activity / Nice Class:</span>
                <select
                  value={industry}
                  onChange={(e) => {
                    setIndustry(e.target.value);
                    executeSearch(proposedName, entityType, e.target.value);
                  }}
                  className="bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-lg px-2.5 py-1 outline-none cursor-pointer"
                >
                  {INDUSTRY_OPTIONS.map((ind) => (
                    <option key={ind.id} value={ind.id} className="text-slate-900">
                      {ind.icon} {ind.label} (Classes: {ind.classes.join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Direct Government Links */}
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.mca.gov.in/mcafoportal/showCheckCompanyName.do?name=${encodeURIComponent(stripEntitySuffixes(proposedName) || proposedName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-200 hover:text-white transition font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>MCA Official Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
                <span className="text-white/20">•</span>
                <a
                  href="https://tmrsearch.ipindia.gov.in/tmrpublicsearch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-200 hover:text-white transition font-medium"
                >
                  <Scale className="w-3.5 h-3.5 text-purple-300" />
                  <span>IP India Trademark</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN RESULTS DISPLAY CONTAINER */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-6">
          {searchResult && (
            <div className="space-y-6">
              {/* CARD 1: OVERALL AVAILABILITY VERDICT BANNER */}
              <div
                className={`rounded-3xl border p-6 sm:p-7 shadow-lg transition-all ${
                  searchResult.assessment.overallRisk === 'LOW'
                    ? 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 border-emerald-300'
                    : searchResult.assessment.overallRisk === 'MEDIUM'
                    ? 'bg-gradient-to-br from-amber-50 via-white to-amber-50/40 border-amber-300'
                    : searchResult.assessment.overallRisk === 'HIGH'
                    ? 'bg-gradient-to-br from-rose-50 via-white to-rose-50/40 border-rose-300'
                    : 'bg-gradient-to-br from-red-50 via-white to-red-50/40 border-red-300'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-6">
                  {/* Left: Verdict & Headline */}
                  <div className="space-y-2.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                          searchResult.assessment.overallRisk === 'LOW'
                            ? 'bg-emerald-600 text-white'
                            : searchResult.assessment.overallRisk === 'MEDIUM'
                            ? 'bg-amber-600 text-white'
                            : searchResult.assessment.overallRisk === 'HIGH'
                            ? 'bg-rose-600 text-white'
                            : 'bg-red-700 text-white'
                        }`}
                      >
                        {searchResult.assessment.overallRisk === 'LOW' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> AVAILABLE FOR REGISTRATION
                          </>
                        ) : searchResult.assessment.overallRisk === 'MEDIUM' ? (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" /> REQUIRES REGULATORY ATTENTION
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> CONFLICT WITH EXISTING ENTITY
                          </>
                        )}
                      </span>

                      {searchResult.assessment.distinctiveWordIdentified && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs">
                          Distinctive Coined Root: <strong>"{searchResult.assessment.distinctiveWordIdentified}"</strong>
                        </span>
                      )}

                      <span className="text-xs text-slate-500 font-medium">
                        Target Suffix: <strong className="text-slate-800">{selectedEntityConfig.suffix || 'None'}</strong>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      {searchResult.assessment.summaryHeadline}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {searchResult.assessment.summaryDescription}
                    </p>
                  </div>

                  {/* Right: Likelihood Gauge & Print CTA */}
                  <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center min-w-[150px]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        APPROVAL VIABILITY
                      </span>
                      <div className="text-3xl sm:text-4xl font-black text-slate-900 my-0.5">
                        {100 - searchResult.assessment.riskScore}%
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block ${
                          searchResult.assessment.overallRisk === 'LOW'
                            ? 'bg-emerald-100 text-emerald-800'
                            : searchResult.assessment.overallRisk === 'MEDIUM'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {searchResult.assessment.overallRisk === 'LOW'
                          ? 'High Probability'
                          : searchResult.assessment.overallRisk === 'MEDIUM'
                          ? 'Moderate Probability'
                          : 'High Rejection Risk'}
                      </span>
                    </div>

                    {/* Print / Save PDF Button */}
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-2xs transition cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span>Print PDF Report</span>
                    </button>
                  </div>
                </div>

                {/* Sub-bar disclaimer */}
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-[11px]">
                      Preliminary screening against active MCA & IP India trademark databases. Official reservation subject to MCA CRC officer discretion.
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                    Checked {new Date(searchResult.query.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* CARD 2: SPLIT VIEW - MCA CORPORATE DATA + IP INDIA TRADEMARKS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* COLUMN A: MCA Corporate Records (Master Data) */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">MCA Corporate Master Data</h3>
                        <p className="text-[11px] text-slate-500">Companies & LLPs registered with ROC across India</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Rule 8(1) Check
                    </span>
                  </div>

                  {/* Exact Match Alert */}
                  {searchResult.mcaSearch.exactMatches && searchResult.mcaSearch.exactMatches.length > 0 ? (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-rose-900">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Exact Corporate Match Found in MCA Registry:</span>
                      </div>
                      {searchResult.mcaSearch.exactMatches.map((m, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-rose-200 text-xs shadow-2xs space-y-1">
                          <p className="font-extrabold text-slate-900 text-sm">{m.name}</p>
                          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 font-mono">
                            <p>CIN: <span className="text-slate-900 font-semibold">{m.identifier}</span></p>
                            <p>ROC: <span className="text-slate-900 font-semibold">{m.roc}</span></p>
                            <p>State: <span className="text-slate-900 font-semibold">{m.state || 'India'}</span></p>
                            <p>Status: <span className="text-emerald-700 font-bold">{m.status}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-emerald-900">No Identical Company or LLP Found</p>
                        <p className="text-[11px] text-emerald-800 mt-0.5">
                          No registered entity with an identical name exists in the MCA corporate database.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Similar Corporate Names List */}
                  {searchResult.mcaSearch.similarMatches && searchResult.mcaSearch.similarMatches.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Similar Corporate Records in Master Data:</span>
                        <span className="text-[10px] font-normal text-slate-400">Sorted by similarity</span>
                      </div>
                      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                        {searchResult.mcaSearch.similarMatches.map((sim, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition flex items-center justify-between text-xs gap-3"
                          >
                            <div className="space-y-0.5">
                              <p className="font-semibold text-slate-900 text-xs">{sim.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">
                                CIN: {sim.identifier} • ROC: {sim.roc} ({sim.state || 'India'})
                              </p>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                sim.similarityScore >= 80
                                  ? 'bg-rose-100 text-rose-800'
                                  : sim.similarityScore >= 65
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {sim.similarityScore}% Match
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct MCA Verification Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Official Ministry of Corporate Affairs URL</span>
                    <a
                      href={`https://www.mca.gov.in/mcafoportal/showCheckCompanyName.do?name=${encodeURIComponent(stripEntitySuffixes(proposedName) || proposedName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition"
                    >
                      <span>Verify on MCA Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* COLUMN B: IP India Trademark Registry */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">IP India Trademark Registry</h3>
                        <p className="text-[11px] text-slate-500">
                          Class {selectedIndustryConfig.classes.join(', ')} ({selectedIndustryConfig.label})
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Nice Classes
                    </span>
                  </div>

                  {/* Trademark Conflicts */}
                  {searchResult.trademarkSearch.exactConflicts && searchResult.trademarkSearch.exactConflicts.length > 0 ? (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-rose-900">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Registered Trademark Conflict Detected:</span>
                      </div>
                      {searchResult.trademarkSearch.exactConflicts.map((c, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-rose-200 text-xs shadow-2xs space-y-1">
                          <p className="font-extrabold text-slate-900 text-sm">
                            MARK: "{c.mark}" <span className="font-normal text-slate-500 text-xs">(Class {c.classNumber})</span>
                          </p>
                          <p className="text-[11px] text-slate-600 leading-relaxed">{c.reason}</p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            App No: {c.applicationNumber} • Status: {c.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-bold text-emerald-900">No Conflicting Registered Marks</p>
                        <p className="text-[11px] text-emerald-800 mt-0.5">
                          No direct conflicting registered mark found in Nice Classes {selectedIndustryConfig.classes.join(' & ')}.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Similar Trademarks */}
                  {searchResult.trademarkSearch.similarConflicts && searchResult.trademarkSearch.similarConflicts.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Similar Marks in Relevant Classes:</span>
                        <span className="text-[10px] font-normal text-slate-400">IP India CGPDTM</span>
                      </div>
                      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                        {searchResult.trademarkSearch.similarConflicts.map((sim, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition flex items-center justify-between text-xs gap-3"
                          >
                            <div className="space-y-0.5">
                              <p className="font-semibold text-slate-900 text-xs">
                                {sim.mark} <span className="text-slate-500 font-normal">(Class {sim.classNumber})</span>
                              </p>
                              <p className="text-[10px] text-slate-500 truncate max-w-xs">{sim.goodsServices}</p>
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                sim.similarityScore >= 80
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {sim.similarityScore}% Sim
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct IP India Verification Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Trade Marks Registry Public Search</span>
                    <a
                      href="https://tmrsearch.ipindia.gov.in/tmrpublicsearch/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition"
                    >
                      <span>Search IP India Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* CARD 3: STATUTORY NAMING RULES CHECKLIST (Rule 8 & Emblems Act) */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Companies Act Statutory Naming Rules</h3>
                      <p className="text-[11px] text-slate-500">Section 4, Rule 8 & Emblems and Names Act 1950 evaluation</p>
                    </div>
                  </div>
                </div>

                {searchResult.rulesCheck.warnings && searchResult.rulesCheck.warnings.length > 0 ? (
                  <div className="space-y-2.5">
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
                        {w.legalReference && (
                          <p className="text-[10px] text-slate-500 font-mono mt-1">Ref: {w.legalReference}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-emerald-900">All Statutory Naming Tests Cleared</p>
                      <p className="text-[11px] text-emerald-800 mt-0.5">
                        No prohibited words under Emblems Act, no unauthorized financial terms, distinct coined prefix present, and legal entity suffix formatted correctly.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CARD 4: SMART COINED ALTERNATIVE NAME SUGGESTIONS */}
              {searchResult.alternativeSuggestions && searchResult.alternativeSuggestions.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Coined Alternative Suggestions</h3>
                        <p className="text-[11px] text-slate-500">
                          Pre-screened variations designed to satisfy Rule 8 distinctiveness
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {searchResult.alternativeSuggestions.map((sug, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-white transition flex flex-col justify-between shadow-2xs group"
                      >
                        <div className="mb-3 space-y-1">
                          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                            {sug.strategy || 'Coined Distinctive'}
                          </span>
                          <p className="text-sm font-extrabold text-slate-900 group-hover:text-blue-700 transition">
                            {sug.name}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-snug">{sug.rationale}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAlternativeSelect(sug.name)}
                          className="w-full py-2 rounded-xl bg-white border border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Search className="w-3.5 h-3.5 text-blue-600" />
                          <span>Check This Alternative</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CARD 5: FAST-TRACK INCORPORATION PACKAGE (Vakilsearch & IndiaFilings Style) */}
              <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-9 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl text-center md:text-left">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider border border-amber-400/30">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Fast-Track Incorporation Package
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                    Ready to Register "{proposedName.trim()}"?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Our practicing Chartered Accountants & Company Secretaries handle SPICe+ Part A name approval, Class-3 DSC, DIN generation, MOA/AOA drafting, and Certificate of Incorporation (COI) with PAN & TAN in 7–10 days.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                  <Link
                    to="/services/company-registration"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Register Company (₹999 Plan)</span>
                    <ArrowRight className="w-4 h-4 text-slate-900" />
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition flex items-center justify-center cursor-pointer"
                  >
                    <span>Talk to CA Expert</span>
                  </Link>
                </div>
              </div>

              {/* STATUTORY FAQ COMPONENT */}
              <FirmNameFAQ />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

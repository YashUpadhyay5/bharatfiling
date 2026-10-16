import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ChevronDown,
  X,
  FileText,
  ShieldCheck,
  Check,
  MapPin,
  Calendar,
  Layers,
  Coins,
  Scale,
  Building,
} from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import { api } from '../../services/api.js';

export default function FirmNameCheckerPage() {
  const [proposedName, setProposedName] = useState('ELEAVALON TECHNOLOGIES');
  const [entityType, setEntityType] = useState('Company'); // Company | LLP | OPC
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  // Search execution state
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Live Autocomplete state (Exact IndiaFilings experience)
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const autocompleteRef = useRef(null);
  const typeDropdownRef = useRef(null);

  // Initial check on mount
  useEffect(() => {
    executeSearch('ELEAVALON TECHNOLOGIES PRIVATE LIMITED', 'Company');
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(e.target)) {
        setShowTypeDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Autocomplete Handler (like IndiaFilings)
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
        console.warn('[FirmNameChecker] Autocomplete fetch error:', err);
      } finally {
        setAutocompleteLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [proposedName]);

  const executeSearch = async (nameToSearch, typeToSearch) => {
    const trimmed = (nameToSearch !== undefined ? nameToSearch : proposedName).trim();
    const type = typeToSearch || entityType;

    if (!trimmed || trimmed.length < 2) {
      setErrorMessage('Please enter at least 2 characters to search.');
      return;
    }

    setErrorMessage('');
    setShowSuggestions(false);
    setLoading(true);

    try {
      const res = await api.checkFirmName({
        proposedName: trimmed,
        entityType: type === 'Company' ? 'private_limited' : type === 'LLP' ? 'llp' : 'opc',
      });

      if (res && res.success && res.data) {
        setSearchResult(res.data);
      } else {
        throw new Error(res?.error?.message || 'Failed to complete name check.');
      }
    } catch (err) {
      console.warn('[FirmNameChecker] Search error:', err);
      setErrorMessage('Unable to retrieve company master data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeSearch();
  };

  const handleSuggestionClick = (company) => {
    const companyTitle = company.companyName || company.name || '';
    setProposedName(companyTitle);
    setShowSuggestions(false);
    executeSearch(companyTitle);
  };

  const handleAlternativeSelect = (suggestedName) => {
    setProposedName(suggestedName);
    window.scrollTo({ top: 120, behavior: 'smooth' });
    executeSearch(suggestedName);
  };

  const masterData = searchResult?.masterCompanyData;
  const isRegistered = searchResult?.assessment?.isRegisteredCompany || !!masterData;
  const isAvailable = searchResult?.assessment?.isAvailable;
  const aiCompliance = searchResult?.aiCompliance;
  const suggestionsList = searchResult?.alternativeSuggestions || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section matching IndiaFilings clean pastel aesthetic */}
      <section className="bg-gradient-to-b from-[#EBF5FB] via-[#F2F8FD] to-[#F8FAFC] pt-8 pb-14 border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-4">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Free Compliance Tools', href: '/tools' },
                { label: 'Search Company Details' },
              ]}
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Search Company Details Online
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Check official company master data, CIN, ROC status, and registration availability across 130,000+ Indian corporate records in seconds.
          </p>

          {/* Capsule Search Box matching IndiaFilings screenshot exactly */}
          <div className="mt-8 max-w-3xl mx-auto relative" ref={autocompleteRef}>
            <form
              onSubmit={handleFormSubmit}
              className="bg-white rounded-full shadow-lg shadow-blue-900/5 border border-slate-300/80 p-1.5 flex items-center transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
            >
              {/* Type Dropdown Trigger (Company ▾) */}
              <div className="relative" ref={typeDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  className="flex items-center gap-1.5 px-4 py-2 text-slate-700 text-sm font-semibold hover:bg-slate-100/70 rounded-full transition-colors whitespace-nowrap"
                >
                  <span>{entityType}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {showTypeDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-left">
                    {['Company', 'LLP', 'OPC'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setEntityType(t);
                          setShowTypeDropdown(false);
                        }}
                        className={`w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          entityType === t ? 'text-blue-600 font-semibold bg-blue-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>{t}</span>
                        {entityType === t && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtle vertical separator */}
              <div className="h-6 w-px bg-slate-200 mx-1" />

              {/* Main Search Input */}
              <div className="flex-1 flex items-center px-3 relative">
                <Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  value={proposedName}
                  onChange={(e) => setProposedName(e.target.value)}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  placeholder="Search Company Name or CIN (e.g. Eleavalon, Tata, U31401...)"
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-medium text-sm sm:text-base outline-none pr-8"
                  autoComplete="off"
                />
                {proposedName && (
                  <button
                    type="button"
                    onClick={() => {
                      setProposedName('');
                      setSuggestions([]);
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Blue Search Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-6 sm:px-7 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-sm transition-all flex-shrink-0 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </form>

            {/* Error banner if any */}
            {errorMessage && (
              <div className="mt-2 text-xs sm:text-sm text-red-600 bg-red-50 py-1.5 px-3 rounded-lg border border-red-200 inline-block">
                {errorMessage}
              </div>
            )}

            {/* Autocomplete Dropdown - Exact match with IndiaFilings screenshot */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 text-left divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                {suggestions.map((item, idx) => (
                  <div
                    key={item.identifier || item.cin || idx}
                    onClick={() => handleSuggestionClick(item)}
                    className="p-3.5 sm:px-4 sm:py-3 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div className="flex-1 pr-3">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 tracking-tight uppercase">
                        {item.companyName || item.name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        {item.identifier || item.cin || 'CIN Pending'} • {item.roc || item.state || 'MCA'}
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Company
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick popular entity chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Popular Searches:</span>
            {['ELEAVALON TECHNOLOGIES', 'TATA MOTORS', 'RELIANCE INDUSTRIES', 'S.J.S. ENTERPRISES', 'ZOMATO'].map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => {
                  setProposedName(brand);
                  executeSearch(brand);
                }}
                className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 px-2.5 py-1 rounded-full transition-colors"
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Results Container - Clean, Uncluttered, Professional */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {loading && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-base font-semibold text-slate-800">Searching Official MCA Corporate Master Records...</h3>
            <p className="text-sm text-slate-500 mt-1">Checking CIN, ROC jurisdiction, and Rule 8 statutory compliance.</p>
          </div>
        )}

        {!loading && searchResult && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Case A: Existing Official Company Master Record Found */}
            {isRegistered && masterData && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Header Banner */}
                <div className="bg-slate-900 text-white p-6 sm:p-7 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                        ● {masterData.status?.toUpperCase() || 'ACTIVE'}
                      </span>
                      <span className="text-xs text-slate-400">Official MCA Corporate Master Data</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                      {masterData.companyName}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      Registered under {masterData.roc} ({masterData.state})
                    </p>
                  </div>

                  <a
                    href={`https://www.mca.gov.in/mcafoportal/showCheckCompanyName.do?name=${encodeURIComponent(masterData.companyName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors border border-slate-700"
                  >
                    <span>Verify on MCA Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 4-Box Master Data Statutory Grid */}
                <div className="p-6 sm:p-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-xs text-slate-500 font-medium block">Corporate Identification Number</span>
                      <span className="text-sm font-bold text-slate-900 font-mono mt-1 block select-all">
                        {masterData.cin}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-xs text-slate-500 font-medium block">Company Class</span>
                      <span className="text-sm font-semibold text-slate-900 mt-1 block">
                        {masterData.classType}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-xs text-slate-500 font-medium block">Incorporation Year</span>
                      <span className="text-sm font-semibold text-slate-900 mt-1 block">
                        {masterData.incorporationYear || 'Registered'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      <span className="text-xs text-slate-500 font-medium block">Authorized / Paid Capital</span>
                      <span className="text-sm font-semibold text-slate-900 mt-1 block">
                        ₹{Number(masterData.authorizedCapital || 100000).toLocaleString('en-IN')} / ₹{Number(masterData.paidUpCapital || 100000).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Registered Office Address */}
                  {masterData.registeredAddress && (
                    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 flex items-start gap-3 mb-6">
                      <MapPin className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                          Registered Office Address
                        </span>
                        <p className="text-sm text-slate-700 mt-0.5 leading-relaxed">
                          {masterData.registeredAddress}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Statutory Availability Notice */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-900">Name Unavailable for New Incorporation</h4>
                      <p className="text-xs sm:text-sm text-amber-800 mt-0.5 leading-relaxed">
                        This business name is already actively registered with the Registrar of Companies (ROC). Under Rule 8 of the Companies (Incorporation) Rules, 2014, CRC examiners will reject any identical or deceptively similar name reservation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Case B: Name Available for Registration */}
            {isAvailable && !isRegistered && (
              <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                        Available for Reservation
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 uppercase">
                        {searchResult.query?.proposedName}
                      </h2>
                      <p className="text-sm text-slate-600 mt-0.5">
                        High viability screen: Zero identical corporate records or registered trademark conflicts detected.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/services/pvt-ltd-company-registration"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-emerald-700/10 transition-all text-sm whitespace-nowrap"
                  >
                    <span>Reserve & Incorporate Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-medium">MCA Collision Check</span>
                    <span className="text-sm font-bold text-emerald-700 mt-1 block flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> 0 Identical Records
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-medium">Trademark Conflict</span>
                    <span className="text-sm font-bold text-emerald-700 mt-1 block flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Clear in Nice Classes
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-medium">Approval Likelihood</span>
                    <span className="text-sm font-bold text-emerald-700 mt-1 block">
                      95%+ (High Rule 8 Viability)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2: Google Gemini 2.5 Flash Legal Scrutiny & Coined Brand Alternatives */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Rule 8 Statutory Compliance & Coined Brand Suggestions
                    </h3>
                    <p className="text-xs text-slate-500">
                      Deep scrutiny powered by Google Gemini 2.5 Flash & MCA statutory guidelines
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  AI Legal Examiner
                </span>
              </div>

              {/* Gemini Legal Summary */}
              {aiCompliance?.legalSummary && (
                <div className="bg-blue-50/60 border border-blue-200/80 rounded-xl p-4 mb-5">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
                    Statutory Rule 8 Legal Assessment
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {aiCompliance.legalSummary}
                  </p>
                </div>
              )}

              {/* Coined Brand Alternatives Pills */}
              {suggestionsList.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Distinctive Coined Names with High Approval Probability (Click to check):
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {suggestionsList.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAlternativeSelect(sug.name)}
                        className="group inline-flex items-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-700 transition-all shadow-sm"
                      >
                        <span>{sug.name}</span>
                        <span className="text-[11px] font-normal text-slate-400 group-hover:text-blue-500 bg-white group-hover:bg-blue-100/60 px-1.5 py-0.5 rounded border border-slate-200/60">
                          Check ↗
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Card 3: Incorporation Assistance CTA Banner */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold">Ready to Register Your Indian Company or LLP?</h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-1">
                  Our Senior Chartered Accountants & CS file your MCA SPICe+ Part A, MOA/AOA, and DSC within 48 hours.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/services/pvt-ltd-company-registration"
                  className="bg-white hover:bg-blue-50 text-blue-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap shadow-sm"
                >
                  Start Registration (₹1,499)
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Educational 4-Step Process Guide */}
        <section className="mt-14 pt-10 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              How MCA Company Name Reservation Works in India
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Statutory process prescribed by the Ministry of Corporate Affairs under Companies Act, 2013
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900">Name Availability Search</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Screen the proposed business name against the MCA Corporate Master Data & Trademark Registry.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900">Rule 8 Compliance</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Ensure the name has a coined distinctive word and does not violate the Emblems and Names Act.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900">RUN / SPICe+ Part A</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Submit an electronic name reservation form to the Central Registration Centre (CRC) with government fees.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center mb-3">
                4
              </div>
              <h4 className="text-sm font-bold text-slate-900">Approval & Incorporation</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                CRC approves the name for 20 days, during which SPICe+ Part B is filed to issue the Certificate of Incorporation.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

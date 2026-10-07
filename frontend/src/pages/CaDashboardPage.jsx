import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import {
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Plus,
  ArrowRight,
  RefreshCw,
  X,
  FileText,
  User,
  Sparkles,
  Award,
  Send,
} from 'lucide-react';

export default function CaDashboardPage() {
  const { user, isCA } = useAuth();
  const { showSuccess, showError } = useToast();

  const [cases, setCases] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseDetails, setCaseDetails] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // CA action inputs
  const [actionNote, setActionNote] = useState('');
  const [arnInput, setArnInput] = useState('');
  const [gstinInput, setGstinInput] = useState('');
  const [clarificationText, setClarificationText] = useState('');

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await api.getCACases();
      if (res.success) {
        setCases(res.cases || []);
        setMetrics(res.metrics || null);
      }
    } catch (err) {
      showError('Failed to load CA case registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleOpenCase = async (caseItem) => {
    setSelectedCase(caseItem);
    try {
      const res = await api.getCACaseDetails(caseItem.id);
      if (res.success) {
        setCaseDetails(res.case);
      }
    } catch (err) {
      showError('Failed to load full case dossier.');
    }
  };

  const handleExecuteAction = async (actionType) => {
    if (!selectedCase) return;
    setActionLoading(true);
    try {
      const payload = {
        action_type: actionType,
        note: actionNote,
        arn: arnInput,
        gstin: gstinInput,
        clarification_text: clarificationText,
      };

      const res = await api.executeCAAction(selectedCase.id, payload);
      if (res.success) {
        showSuccess(`Action executed: ${actionType}`);
        setActionNote('');
        setArnInput('');
        setGstinInput('');
        setClarificationText('');
        // Refresh case details and list
        handleOpenCase(selectedCase);
        fetchCases();
      }
    } catch (err) {
      showError(err.message || 'Action failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredCases = cases.filter((c) => {
    if (activeFilter === 'pending') return c.internal_status === 'CA_REVIEW' || c.internal_status === 'AI_PRECHECK';
    if (activeFilter === 'clarifications') return c.internal_status === 'CLARIFICATION_REQUIRED';
    if (activeFilter === 'completed') return c.internal_status === 'COMPLETED';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                Statutory Audit Portal
              </span>
              <span className="text-xs text-slate-400">Assigned Partner: {user?.full_name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1">
              Chartered Accountant Case Workbench
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 border border-slate-700 text-slate-300 hover:text-white transition"
            >
              ← Public Home
            </Link>
            <button
              onClick={fetchCases}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center gap-2 border border-slate-700 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Registry
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Cases</div>
            <div className="text-2xl font-black text-white mt-1">{metrics?.total_cases || 0}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] uppercase font-bold text-amber-400">Pending Review</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{metrics?.pending_review || 0}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] uppercase font-bold text-blue-400">Portal Processing</div>
            <div className="text-2xl font-black text-blue-400 mt-1">{metrics?.processing || 0}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] uppercase font-bold text-rose-400">Clarifications (REG-03)</div>
            <div className="text-2xl font-black text-rose-400 mt-1">{metrics?.clarifications || 0}</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 col-span-2 sm:col-span-1">
            <div className="text-[10px] uppercase font-bold text-emerald-400">Approved & Delivered</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{metrics?.completed || 0}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 text-xs font-bold border-b border-slate-800 pb-2">
          {['all', 'pending', 'clarifications', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg capitalize transition ${
                activeFilter === f ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cases Table */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-700">
                <tr>
                  <th className="p-4">App ID</th>
                  <th className="p-4">Customer & Entity</th>
                  <th className="p-4">Type / State</th>
                  <th className="p-4">Internal Status</th>
                  <th className="p-4">ARN / GSTIN</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/80 transition">
                    <td className="p-4 font-mono font-bold text-white">{c.application_number}</td>
                    <td className="p-4">
                      <div className="font-bold text-white">{c.customer_name}</div>
                      <div className="text-[11px] text-slate-400">{c.fields_data?.legal_name || 'Business'}</div>
                    </td>
                    <td className="p-4 text-slate-300">
                      {c.business_type} · {c.state}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-slate-900 border border-slate-700 text-amber-400">
                        {c.internal_status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-300">
                      {c.arn || c.gstin || 'Pending Submission'}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenCase(c)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition"
                      >
                        Review Case &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SPLIT-SCREEN CASE WORKBENCH MODAL */}
        {selectedCase && caseDetails && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-6xl h-[90vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-slide-up">
              {/* Workbench Header */}
              <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-emerald-400">{selectedCase.application_number}</span>
                    <span className="text-slate-500">|</span>
                    <span className="font-bold text-white">{caseDetails.customer?.full_name}</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-400">{selectedCase.business_type} ({selectedCase.state})</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 3-Column Split Workbench Layout */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-slate-800 text-xs">
                {/* Column 1: Uploaded Documents & OCR Findings (4 cols) */}
                <div className="lg:col-span-4 p-4 overflow-y-auto space-y-3 bg-slate-900/50">
                  <div className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-2">
                    Documents & AI Extraction
                  </div>

                  {caseDetails.documents?.map((doc) => (
                    <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{doc.document_type.replace(/_/g, ' ')}</span>
                        <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-800">
                          {((doc.ai_confidence || 0.95) * 100).toFixed(0)}% OCR
                        </span>
                      </div>

                      {/* Extracted JSON values */}
                      <div className="bg-slate-950 p-2.5 rounded-xl text-[11px] font-mono text-slate-300 space-y-1">
                        {Object.entries(doc.ocr_extracted_data || {}).map(([k, v]) => (
                          <div key={k} className="truncate">
                            <span className="text-slate-500">{k}:</span> {String(v)}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:underline text-[11px] flex items-center gap-1 font-bold"
                        >
                          <Eye className="w-3.5 h-3.5" /> View File
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 2: Form Data & Discrepancy Flags (4 cols) */}
                <div className="lg:col-span-4 p-4 overflow-y-auto space-y-4">
                  <div className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
                    Application Form Data
                  </div>

                  <div className="space-y-2.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
                    <div>Legal Name: <strong className="text-white">{selectedCase.fields_data?.legal_name}</strong></div>
                    <div>PAN: <strong className="font-mono text-emerald-400">{selectedCase.fields_data?.pan_number}</strong></div>
                    <div>Aadhaar: <strong className="font-mono text-slate-300">{selectedCase.fields_data?.aadhaar_number}</strong></div>
                    <div>Address: <strong className="text-slate-300">{selectedCase.fields_data?.address_line_1}, {selectedCase.fields_data?.city}</strong></div>
                    <div>Bank: <strong className="text-slate-300">{selectedCase.fields_data?.bank_name} ({selectedCase.fields_data?.bank_ifsc})</strong></div>
                  </div>

                  {/* Case Event Timeline */}
                  <div className="space-y-2 pt-2">
                    <div className="font-bold uppercase tracking-wider text-[10px] text-slate-400">Case Event Timeline</div>
                    <div className="space-y-2 text-[11px]">
                      {caseDetails.timeline?.map((evt) => (
                        <div key={evt.id} className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                          <div className="font-bold text-white flex items-center justify-between">
                            <span>{evt.title}</span>
                            <span className="text-[10px] text-slate-500">{evt.actor_role}</span>
                          </div>
                          <p className="text-slate-400 mt-0.5">{evt.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 3: CA Actions & Government Portal Sync (4 cols) */}
                <div className="lg:col-span-4 p-4 overflow-y-auto space-y-4 bg-slate-950">
                  <div className="font-bold uppercase tracking-wider text-[10px] text-amber-400">
                    CA Statutory Decision Console
                  </div>

                  {/* Action 1: Submit to Portal & Set ARN */}
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-white">1. File on GST Portal & Record ARN</div>
                    <input
                      type="text"
                      value={arnInput}
                      onChange={(e) => setArnInput(e.target.value)}
                      placeholder="e.g. AA2702260012345"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs"
                    />
                    <button
                      onClick={() => handleExecuteAction('SUBMIT_TO_PORTAL')}
                      disabled={actionLoading}
                      className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
                    >
                      Record Portal ARN Filing
                    </button>
                  </div>

                  {/* Action 2: Record Notice REG-03 Clarification */}
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-white">2. Log Clarification Notice (REG-03)</div>
                    <textarea
                      rows={2}
                      value={clarificationText}
                      onChange={(e) => setClarificationText(e.target.value)}
                      placeholder="Enter officer query details..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                    />
                    <button
                      onClick={() => handleExecuteAction('FLAG_CLARIFICATION')}
                      disabled={actionLoading}
                      className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition"
                    >
                      Issue Clarification Notice (REG-03)
                    </button>
                  </div>

                  {/* Action 3: Complete & Issue Certificate */}
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-white">3. Final Approval & Certificate (REG-06)</div>
                    <input
                      type="text"
                      value={gstinInput}
                      onChange={(e) => setGstinInput(e.target.value)}
                      placeholder="Allotted GSTIN (e.g. 29ABCDE1234F1Z5)"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs"
                    />
                    <button
                      onClick={() => handleExecuteAction('ISSUE_CERTIFICATE_AND_COMPLETE')}
                      disabled={actionLoading}
                      className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                    >
                      Allot GSTIN & Complete Case
                    </button>
                  </div>

                  {/* Action 4: Add Observation Note */}
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-white">Add Case Note</div>
                    <input
                      type="text"
                      value={actionNote}
                      onChange={(e) => setActionNote(e.target.value)}
                      placeholder="Audit note..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                    />
                    <button
                      onClick={() => handleExecuteAction('ADD_NOTE')}
                      disabled={actionLoading}
                      className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                    >
                      Save Internal Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

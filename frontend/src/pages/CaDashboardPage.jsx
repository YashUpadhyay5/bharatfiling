import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  FileCheck2,
  Clock,
  RefreshCw,
  X,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Upload,
  Send,
  Building2,
  CreditCard,
  Calendar,
  AlertCircle,
  ExternalLink,
  Download,
} from 'lucide-react';

export default function CaDashboardPage() {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [cases, setCases] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseDetails, setCaseDetails] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // CA Statutory Action States
  const [arnInput, setArnInput] = useState('');
  const [gstinInput, setGstinInput] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [customCertUrl, setCustomCertUrl] = useState('');
  const [actionNote, setActionNote] = useState('');

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
    setArnInput(caseItem.arn || '');
    setGstinInput(caseItem.gstin || '');
    setCertificateFile(null);
    setCustomCertUrl(caseItem.certificate_url || '');
    setActionNote('');

    try {
      const res = await api.getCACaseDetails(caseItem.id);
      if (res.success) {
        setCaseDetails(res.case);
      }
    } catch (err) {
      showError('Failed to load full case details.');
    }
  };

  const handleExecuteAction = async (actionType) => {
    if (!selectedCase) return;
    setActionLoading(true);
    try {
      const payload = {
        action_type: actionType,
        note: actionNote,
        arn: arnInput || selectedCase.arn,
        gstin: gstinInput || selectedCase.gstin,
        certificate_url: customCertUrl || '/sample_gst_certificate.pdf',
      };

      const res = await api.executeCAAction(selectedCase.id, payload);
      if (res.success) {
        if (actionType === 'ISSUE_CERTIFICATE_AND_COMPLETE') {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          showSuccess('Registration Certificate delivered to customer dashboard successfully!');
        } else if (actionType === 'SUBMIT_TO_PORTAL') {
          showSuccess(`ARN recorded and application marked submitted to GST Portal!`);
        } else if (actionType === 'APPROVE_CA_REVIEW') {
          showSuccess('Application marked as In Progress with CA (REG-01 Drafting)!');
        } else {
          showSuccess(`Action executed successfully.`);
        }

        // Refresh case data
        await fetchCases();
        const updatedApp = res.application;
        setSelectedCase((prev) => ({ ...prev, ...updatedApp }));
      }
    } catch (err) {
      showError(err.message || 'Action failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDateTime = (isoDate) => {
    if (!isoDate) return 'Just now';
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoDate;
    }
  };

  const filteredCases = cases.filter((c) => {
    if (activeFilter === 'pending') {
      return c.internal_status === 'CA_REVIEW' || c.internal_status === 'PAYMENT_CONFIRMED' || c.internal_status === 'PAYMENT_PENDING';
    }
    if (activeFilter === 'progress') {
      return c.internal_status === 'APPLICATION_PREPARATION' || c.internal_status === 'GOVERNMENT_PROCESSING';
    }
    if (activeFilter === 'completed') {
      return c.internal_status === 'COMPLETED';
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                Statutory Compliance Portal
              </span>
              <span className="text-xs text-slate-400">
                Senior Partner: <strong>{user?.full_name || 'CA Rajesh Sharma (FCA)'}</strong>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1 text-white">
              Chartered Accountant Case Workbench
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold border border-slate-700 text-slate-300 hover:text-white transition"
            >
              ← Public Home
            </Link>
            <button
              onClick={fetchCases}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Registry</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4.5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Client Filings</div>
            <div className="text-2xl font-black text-white mt-1">{metrics?.total_cases || cases.length}</div>
          </div>
          <div className="p-4.5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Pending CA Review</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{metrics?.pending_review || 0}</div>
          </div>
          <div className="p-4.5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Government Portal Review</div>
            <div className="text-2xl font-black text-blue-400 mt-1">{metrics?.processing || 0}</div>
          </div>
          <div className="p-4.5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Certificates Delivered</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{metrics?.completed || 0}</div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex gap-2 text-xs font-bold border-b border-slate-800 pb-2">
          {[
            { id: 'all', label: `All Filings (${cases.length})` },
            { id: 'pending', label: 'Pending Review' },
            { id: 'progress', label: 'In Progress / Govt Review' },
            { id: 'completed', label: 'Completed & Delivered' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
                activeFilter === tab.id ? 'bg-emerald-600 text-white font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Client Cases Table with Full Details */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-700">
                <tr>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Location & Business ("From Where")</th>
                  <th className="p-4">Submission Time ("Time")</th>
                  <th className="p-4">Filing Fee</th>
                  <th className="p-4">Statutory Status</th>
                  <th className="p-4 text-right">CA Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      No applications found under this filter.
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/80 transition">
                      {/* Customer Details */}
                      <td className="p-4">
                        <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{c.customer_name}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>+91 {c.customer_phone}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{c.customer_email}</span>
                        </div>
                      </td>

                      {/* Location & Business Structure */}
                      <td className="p-4">
                        <div className="font-bold text-slate-200 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>{c.state}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3" />
                          <span>{c.business_type}</span>
                        </div>
                        <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                          PAN: {c.pan_number || 'ABCDE1234F'}
                        </div>
                      </td>

                      {/* Submission Time */}
                      <td className="p-4">
                        <div className="text-slate-300 font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          <span>{formatDateTime(c.submitted_at || c.created_at)}</span>
                        </div>
                        <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                          {c.application_number}
                        </div>
                      </td>

                      {/* Filing Fee & Order */}
                      <td className="p-4">
                        <div className="font-extrabold text-emerald-400 text-xs">
                          ₹{c.amount_paid || 1769} INR
                        </div>
                        <div className="text-[10px] text-slate-400">
                          UPI AutoPay Paid
                        </div>
                      </td>

                      {/* Statutory Status */}
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase border inline-flex items-center gap-1 ${
                            c.internal_status === 'COMPLETED'
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                              : c.internal_status === 'GOVERNMENT_PROCESSING'
                              ? 'bg-blue-950/80 text-blue-400 border-blue-700'
                              : c.internal_status === 'APPLICATION_PREPARATION'
                              ? 'bg-purple-950/80 text-purple-400 border-purple-700'
                              : 'bg-amber-950/80 text-amber-400 border-amber-700'
                          }`}
                        >
                          {c.internal_status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3" />}
                          {c.internal_status === 'GOVERNMENT_PROCESSING' && <Clock className="w-3 h-3" />}
                          <span>{c.customer_status || c.internal_status}</span>
                        </span>
                        {c.arn && (
                          <div className="font-mono text-[10px] text-slate-400 mt-1">
                            ARN: {c.arn}
                          </div>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenCase(c)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer shadow-sm"
                        >
                          Review & Action &rarr;
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CASE REVIEW & ACTION MODAL */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl max-h-[92vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-slide-up">
              {/* Modal Header */}
              <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-emerald-400">{selectedCase.application_number}</span>
                    <span className="text-slate-500">|</span>
                    <span className="font-bold text-white text-sm">{selectedCase.customer_name}</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-400">{selectedCase.state}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Submitted on {formatDateTime(selectedCase.submitted_at || selectedCase.created_at)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                {/* 1. Customer Context Grid */}
                <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Customer Legal Name</span>
                    <span className="font-bold text-white text-sm">{selectedCase.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Phone Number</span>
                    <span className="font-bold text-white">+91 {selectedCase.customer_phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Email Address</span>
                    <span className="font-bold text-white truncate block">{selectedCase.customer_email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Location ("From Where")</span>
                    <span className="font-bold text-white">{selectedCase.state}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Business Nature</span>
                    <span className="font-bold text-slate-300">{selectedCase.business_type}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">PAN Card Number</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedCase.pan_number || 'ABCDE1234F'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Order Reference</span>
                    <span className="font-mono text-slate-300">{selectedCase.order_number || selectedCase.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-bold block">Fee Paid</span>
                    <span className="font-bold text-emerald-400">₹{selectedCase.amount_paid || 1769} INR (Paid)</span>
                  </div>
                </div>

                {/* 2. Visual 4-Stage Progressive Workflow */}
                <div>
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                    Statutory Case Milestones
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-1">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold mx-auto flex items-center justify-center text-xs">
                        ✓
                      </div>
                      <div className="font-bold text-emerald-300">1. Payment Confirmed</div>
                      <div className="text-[10px] text-slate-400">₹1,769 Paid via UPI</div>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl border text-center space-y-1 ${
                        selectedCase.internal_status === 'APPLICATION_PREPARATION' ||
                        selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                        selectedCase.internal_status === 'COMPLETED'
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                          : 'bg-amber-950/40 border-amber-800 text-amber-300 animate-pulse'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-slate-800 font-bold mx-auto flex items-center justify-center text-xs">
                        {selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                        selectedCase.internal_status === 'COMPLETED'
                          ? '✓'
                          : '2'}
                      </div>
                      <div className="font-bold">2. Work in Progress</div>
                      <div className="text-[10px] text-slate-400">Drafting Form REG-01</div>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl border text-center space-y-1 ${
                        selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                        selectedCase.internal_status === 'COMPLETED'
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-slate-800 font-bold mx-auto flex items-center justify-center text-xs">
                        {selectedCase.internal_status === 'COMPLETED' ? '✓' : '3'}
                      </div>
                      <div className="font-bold">3. Submitted to Govt</div>
                      <div className="text-[10px] text-slate-400">
                        {selectedCase.arn ? `ARN: ${selectedCase.arn}` : 'ARN Pending'}
                      </div>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl border text-center space-y-1 ${
                        selectedCase.internal_status === 'COMPLETED'
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-slate-800 font-bold mx-auto flex items-center justify-center text-xs">
                        {selectedCase.internal_status === 'COMPLETED' ? '✓' : '4'}
                      </div>
                      <div className="font-bold">4. Certificate Delivered</div>
                      <div className="text-[10px] text-slate-400">Form REG-06 Allotted</div>
                    </div>
                  </div>
                </div>

                {/* 3. CA Professional Action Console */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-5">
                  <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">
                    CA Statutory Decision & Dispatch Console
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Stage 2 Action: Work in Progress */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="font-bold text-white text-sm">Step A: Start CA Preparation</div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Verify customer identity against MCA/PAN registries and prepare Form REG-01 XML.
                      </p>
                      <button
                        onClick={() => handleExecuteAction('APPROVE_CA_REVIEW')}
                        disabled={actionLoading}
                        className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition cursor-pointer"
                      >
                        Mark "In Progress with CA"
                      </button>
                    </div>

                    {/* Stage 3 Action: File on Portal & Set ARN */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="font-bold text-white text-sm">Step B: Submit to GST Portal</div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Submit on GST common portal and record the 15-digit Application Reference Number (ARN).
                      </p>
                      <input
                        type="text"
                        value={arnInput}
                        onChange={(e) => setArnInput(e.target.value)}
                        placeholder="e.g. AA2902260012345"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => handleExecuteAction('SUBMIT_TO_PORTAL')}
                        disabled={actionLoading}
                        className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition cursor-pointer"
                      >
                        Record Portal ARN Filing
                      </button>
                    </div>

                    {/* Stage 4 Action: Complete & Send Certificate to Customer */}
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800 space-y-3">
                      <div className="font-bold text-emerald-300 text-sm">Step C: Send Certificate to Customer</div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Allot final GSTIN and dispatch official Form REG-06 directly to customer's dashboard.
                      </p>
                      <input
                        type="text"
                        value={gstinInput}
                        onChange={(e) => setGstinInput(e.target.value.toUpperCase())}
                        placeholder="GSTIN (e.g. 29ABCDE1234F1Z5)"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none uppercase"
                      />
                      <button
                        onClick={() => handleExecuteAction('ISSUE_CERTIFICATE_AND_COMPLETE')}
                        disabled={actionLoading}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Certificate & Complete</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Delivered Certificate Preview (If completed) */}
                {selectedCase.internal_status === 'COMPLETED' && (
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-white">Official GST Registration Certificate (REG-06)</div>
                        <div className="text-[11px] text-emerald-400 font-mono">
                          GSTIN: {selectedCase.gstin || '29ABCDE1234F1Z5'} • Delivered to {selectedCase.customer_name}
                        </div>
                      </div>
                    </div>

                    <a
                      href={selectedCase.certificate_url || '/sample_gst_certificate.pdf'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Preview Certificate</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

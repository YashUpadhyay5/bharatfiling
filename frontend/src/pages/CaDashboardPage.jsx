import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useSocket } from '../context/SocketContext.jsx';
import confetti from 'canvas-confetti';
import {
  FileCheck2,
  Clock,
  RefreshCw,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Send,
  Building2,
  Download,
  Lock,
} from 'lucide-react';
import NotificationBell from '../components/common/NotificationBell.jsx';

export default function CaDashboardPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { showSuccess, showError } = useToast();
  const { socket, joinCADesk } = useSocket();
  const navigate = useNavigate();

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
    } catch {
      showError('Failed to load CA case registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading && !user) return;
    if (!isAuthenticated) {
      navigate('/login?redirect=/ca/dashboard', { replace: true });
      return;
    }
    if (user?.role !== 'CA' && user?.role !== 'ADMIN') {
      navigate('/dashboard', { replace: true });
      return;
    }
    fetchCases();
    joinCADesk();
  }, [authLoading, isAuthenticated, user]);

  useEffect(() => {
    if (socket) {
      const handleNewCase = (newCase) => {
        showSuccess(`New ${newCase.module_type || 'Statutory'} Filing Received: ${newCase.customer_name} (${newCase.state}) - ₹${newCase.amount} Paid`);
        fetchCases();
      };

      const handleCaseUpdated = () => {
        fetchCases();
      };

      socket.on('ca:new_case', handleNewCase);
      socket.on('case:updated', handleCaseUpdated);

      return () => {
        socket.off('ca:new_case', handleNewCase);
        socket.off('case:updated', handleCaseUpdated);
      };
    }
  }, [socket]);

  const handleOpenCase = async (caseItem) => {
    setSelectedCase(caseItem);
    setArnInput(caseItem.arn || '');
    setGstinInput(caseItem.gstin || '');
    setCustomCertUrl(caseItem.certificate_url || '');
    setActionNote('');

    try {
      const res = await api.getCACaseDetails(caseItem.id);
      if (res.success) {
        setCaseDetails(res.case);
      }
    } catch {
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
        if (actionType === 'DISPATCH_CERTIFICATE' || actionType === 'ISSUE_CERTIFICATE_AND_COMPLETE') {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          showSuccess('Step 4 Complete: Official Registration Certificate delivered to customer in real-time.');
        } else if (actionType === 'RECORD_GOVT_APPROVAL') {
          showSuccess(`Step 3 Complete: Government Approval & Reference ${res.application?.gstin || gstinInput} recorded.`);
        } else if (actionType === 'SUBMIT_TO_PORTAL') {
          showSuccess(`Step 2 Complete: Reference ARN ${res.application?.arn || arnInput} recorded.`);
        } else if (actionType === 'VERIFY_DOCS' || actionType === 'APPROVE_CA_REVIEW') {
          showSuccess('Step 1 Complete: Customer documents & identity verified.');
        } else {
          showSuccess('Action executed successfully.');
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
    <div className="min-h-screen bg-[#F8F9FB] text-[#252B36] font-sans">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Header Bar */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#EFF8FF] text-[#155EEF] text-[10px] font-bold px-2 py-0.5 rounded border border-[#B2DDFF]">
                Compliance Operations Desk
              </span>
              <span className="text-xs text-[#667085]">
                Practicing Partner: <strong className="text-[#252B36]">{user?.full_name || 'CA Rajesh Sharma (FCA)'}</strong>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mt-1 text-[#252B36]">
              Chartered Accountant Case Workbench
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <NotificationBell />
            <Link
              to="/"
              className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#F8F9FB] text-xs font-semibold border border-[#E5E7EB] text-[#252B36] transition"
            >
              ← Public Home
            </Link>
            <button
              onClick={fetchCases}
              className="px-3.5 py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Registry</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-[10px] uppercase font-bold text-[#667085] tracking-wider">Total Client Filings</div>
            <div className="text-2xl font-bold text-[#252B36] mt-1">{metrics?.total_cases || cases.length}</div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-[10px] uppercase font-bold text-[#B54708] tracking-wider">Pending CA Review</div>
            <div className="text-2xl font-bold text-[#B54708] mt-1">{metrics?.pending_review || 0}</div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-[10px] uppercase font-bold text-[#155EEF] tracking-wider">Government Processing</div>
            <div className="text-2xl font-bold text-[#155EEF] mt-1">{metrics?.processing || 0}</div>
          </div>
          <div className="p-5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
            <div className="text-[10px] uppercase font-bold text-[#027A48] tracking-wider">Certificates Delivered</div>
            <div className="text-2xl font-bold text-[#027A48] mt-1">{metrics?.completed || 0}</div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex gap-2 text-xs font-semibold border-b border-[#E5E7EB] pb-2">
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
                activeFilter === tab.id
                  ? 'bg-[#155EEF] text-white font-semibold shadow-xs'
                  : 'text-[#667085] hover:text-[#252B36] hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Client Cases Table */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FB] text-[#667085] uppercase text-[10px] font-bold border-b border-[#E5E7EB]">
                <tr>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Location & Business Structure</th>
                  <th className="p-4">Submission Time</th>
                  <th className="p-4">Filing Fee</th>
                  <th className="p-4">Statutory Status</th>
                  <th className="p-4 text-right">CA Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#667085]">
                      No applications found under this filter.
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F8F9FB] transition">
                      {/* Customer Details */}
                      <td className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#EFF8FF] text-[#155EEF] border border-[#B2DDFF]">
                            {c.module_type === 'UDYAM' || c.module_type === 'MSME' ? 'UDYAM / MSME' : c.module_type || 'GST'}
                          </span>
                          <span className="font-mono text-[10px] text-[#667085]">{c.application_number}</span>
                        </div>
                        <div className="font-bold text-sm text-[#252B36] flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#155EEF]" />
                          <span>{c.customer_name}</span>
                        </div>
                        <div className="text-[11px] text-[#667085] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>+91 {c.customer_phone}</span>
                        </div>
                        <div className="text-[11px] text-[#667085] flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{c.customer_email}</span>
                        </div>
                      </td>

                      {/* Location & Business Structure */}
                      <td className="p-4">
                        <div className="font-semibold text-[#252B36] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#155EEF]" />
                          <span>{c.state}</span>
                        </div>
                        <div className="text-[11px] text-[#667085] flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3" />
                          <span>{c.business_type}</span>
                        </div>
                        <div className="text-[10px] font-mono text-[#252B36] mt-0.5">
                          PAN: {c.pan_number || 'ABCDE1234F'}
                        </div>
                      </td>

                      {/* Submission Time */}
                      <td className="p-4">
                        <div className="text-[#252B36] font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#667085]" />
                          <span>{formatDateTime(c.submitted_at || c.created_at)}</span>
                        </div>
                        <div className="font-mono text-[10px] text-[#667085] mt-0.5">
                          {c.application_number}
                        </div>
                      </td>

                      {/* Filing Fee & Order */}
                      <td className="p-4">
                        <div className="font-bold text-[#027A48] text-xs">
                          ₹{c.amount_paid || 1769} INR
                        </div>
                        <div className="text-[10px] text-[#667085]">
                          {c.module_type === 'UDYAM' || c.module_type === 'MSME' ? 'Gateway Verified' : 'Filing Fee Paid'}
                        </div>
                      </td>

                      {/* Statutory Status */}
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-md font-semibold text-[10px] uppercase border inline-flex items-center gap-1 ${
                            c.internal_status === 'COMPLETED'
                              ? 'bg-[#ECFDF3] text-[#027A48] border-[#A6F4C5]'
                              : c.internal_status === 'GOVERNMENT_PROCESSING'
                              ? 'bg-[#EFF8FF] text-[#155EEF] border-[#B2DDFF]'
                              : c.internal_status === 'APPLICATION_PREPARATION'
                              ? 'bg-[#F9F5FF] text-[#6941C6] border-[#E9D7FE]'
                              : 'bg-[#FEF0C7] text-[#B54708] border-[#FEDF89]'
                          }`}
                        >
                          {c.internal_status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3" />}
                          {c.internal_status === 'GOVERNMENT_PROCESSING' && <Clock className="w-3 h-3" />}
                          <span>{c.customer_status || c.internal_status}</span>
                        </span>
                        {c.arn && (
                          <div className="font-mono text-[10px] text-[#667085] mt-1">
                            ARN: {c.arn}
                          </div>
                        )}
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenCase(c)}
                          className="px-3.5 py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs transition cursor-pointer shadow-xs"
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
          <div className="fixed inset-0 z-50 bg-[#252B36]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            <div className="bg-white border border-[#E5E7EB] w-full max-w-5xl max-h-[92vh] rounded-xl flex flex-col shadow-xl overflow-hidden">
              {/* Modal Header */}
              <div className="bg-[#F8F9FB] p-5 border-b border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-[#155EEF]">{selectedCase.application_number}</span>
                    <span className="text-[#E5E7EB]">|</span>
                    <span className="font-bold text-[#252B36] text-sm">{selectedCase.customer_name}</span>
                    <span className="text-[#E5E7EB]">|</span>
                    <span className="text-[#667085]">{selectedCase.state}</span>
                  </div>
                  <div className="text-[11px] text-[#667085] mt-0.5">
                    Submitted on {formatDateTime(selectedCase.submitted_at || selectedCase.created_at)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-2 rounded-lg hover:bg-[#E5E7EB] text-[#667085] hover:text-[#252B36] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                {/* 1. Customer Context Grid */}
                <div className="bg-[#F8F9FB] p-5 rounded-lg border border-[#E5E7EB] grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[#667085] uppercase text-[10px] font-bold block">Customer Legal Name</span>
                    <span className="font-bold text-[#252B36] text-sm">{selectedCase.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-[#667085] uppercase text-[10px] font-bold block">Phone Number</span>
                    <span className="font-semibold text-[#252B36]">+91 {selectedCase.customer_phone}</span>
                  </div>
                  <div>
                    <span className="text-[#667085] uppercase text-[10px] font-bold block">Email Address</span>
                    <span className="font-semibold text-[#252B36] truncate block">{selectedCase.customer_email}</span>
                  </div>
                  <div>
                    <span className="text-[#667085] uppercase text-[10px] font-bold block">Jurisdiction State</span>
                    <span className="font-semibold text-[#252B36]">{selectedCase.state}</span>
                  </div>

                  <div>
                    <span className="text-[#667085] uppercase text-[10px] font-bold block">Business Structure</span>
                    <span className="font-semibold text-[#252B36]">{selectedCase.business_type}</span>
                  </div>
                  <div>
                    <span className="text-[#667085] uppercase text-[10px] font-bold block">Applicant PAN</span>
                    <span className="font-mono font-bold text-[#252B36]">{selectedCase.pan_number || 'ABCDE1234F'}</span>
                  </div>
                  <div>
                    <span className="text-[#667085] uppercase text-[10px] font-bold block">Order Reference</span>
                    <span className="font-mono text-[#667085]">{selectedCase.order_number || selectedCase.id}</span>
                  </div>
                  <div>
                    <span className="text-[#667085] uppercase text-[10px] font-bold block">Fee Paid</span>
                    <span className="font-bold text-[#027A48]">₹{selectedCase.amount_paid || 1769} INR (Paid)</span>
                  </div>

                  {/* Udyam NIC & Plant Details if available */}
                  {(selectedCase.fields_data?.nic_division || selectedCase.nic_division) && (
                    <div className="col-span-2 md:col-span-4 bg-white p-3.5 rounded-lg border border-[#E5E7EB] space-y-1.5 mt-2">
                      <span className="text-[#155EEF] font-bold uppercase text-[10px] tracking-wider block">
                        Udyam Classification (NIC 2008 & Plant Unit Details):
                      </span>
                      <div className="text-[#252B36] font-medium text-xs">
                        <strong>Activity:</strong> {selectedCase.fields_data?.nic_division || selectedCase.nic_division} ➔{' '}
                        {selectedCase.fields_data?.nic_sub_division || selectedCase.nic_sub_division || ''} ➔{' '}
                        {selectedCase.fields_data?.nic_sub_class || selectedCase.nic_sub_class || ''}
                      </div>
                      <div className="text-[#667085] text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div>
                          Enterprise Name: <strong className="text-[#252B36]">{selectedCase.fields_data?.enterprise_name || selectedCase.customer_name}</strong>
                        </div>
                        <div>
                          Major Activity: <strong className="text-[#252B36]">{selectedCase.fields_data?.major_activity || 'Services'}</strong>
                        </div>
                        {selectedCase.fields_data?.plant_address && (
                          <div className="col-span-2">
                            Plant Address: <span className="text-[#252B36]">{selectedCase.fields_data.plant_address}</span>
                          </div>
                        )}
                        {selectedCase.fields_data?.bank_account_no && (
                          <div className="col-span-2 text-[#027A48] font-mono text-[10px]">
                            Bank Account: {selectedCase.fields_data.bank_account_no} (IFSC: {selectedCase.fields_data.bank_ifsc || 'HDFC0001234'})
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Visual 4-Stage Progressive Workflow */}
                <div>
                  <h3 className="text-xs font-bold uppercase text-[#667085] tracking-wider mb-3">
                    Statutory Case Milestones (Real-Time 2-Way Sync)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Milestone 1 */}
                    <div className="p-3.5 rounded-lg bg-[#ECFDF3] border border-[#A6F4C5] text-center space-y-1">
                      <div className="w-5 h-5 rounded-full bg-[#027A48] text-white font-bold mx-auto flex items-center justify-center text-xs">
                        ✓
                      </div>
                      <div className="font-semibold text-[#027A48]">1. Payment Confirmed</div>
                      <div className="text-[10px] text-[#667085]">₹1,769 Verified Paid</div>
                    </div>

                    {/* Milestone 2 */}
                    <div
                      className={`p-3.5 rounded-lg border text-center space-y-1 ${
                        selectedCase.docs_verified_at ||
                        selectedCase.internal_status === 'DOCUMENTS_VERIFIED' ||
                        selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                        selectedCase.internal_status === 'GOVERNMENT_APPROVED' ||
                        selectedCase.internal_status === 'COMPLETED'
                          ? 'bg-[#ECFDF3] border-[#A6F4C5] text-[#027A48]'
                          : 'bg-[#EFF8FF] border-[#B2DDFF] text-[#155EEF]'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-white font-bold mx-auto flex items-center justify-center text-xs shadow-xs">
                        {selectedCase.docs_verified_at ||
                        selectedCase.internal_status === 'DOCUMENTS_VERIFIED' ||
                        selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                        selectedCase.internal_status === 'GOVERNMENT_APPROVED' ||
                        selectedCase.internal_status === 'COMPLETED'
                          ? '✓'
                          : '2'}
                      </div>
                      <div className="font-semibold">2. Docs Verified by CA</div>
                      <div className="text-[10px] text-[#667085]">Statutory Dossier Prepared</div>
                    </div>

                    {/* Milestone 3 */}
                    <div
                      className={`p-3.5 rounded-lg border text-center space-y-1 ${
                        selectedCase.arn &&
                        (selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                          selectedCase.internal_status === 'GOVERNMENT_APPROVED' ||
                          selectedCase.internal_status === 'COMPLETED')
                          ? 'bg-[#ECFDF3] border-[#A6F4C5] text-[#027A48]'
                          : 'bg-[#F8F9FB] border-[#E5E7EB] text-[#667085]'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-white font-bold mx-auto flex items-center justify-center text-xs shadow-xs">
                        {selectedCase.arn ? '✓' : '3'}
                      </div>
                      <div className="font-semibold">3. Submitted to Govt</div>
                      <div className="text-[10px] text-[#667085] font-mono">
                        {selectedCase.arn ? `ARN: ${selectedCase.arn}` : 'ARN Pending'}
                      </div>
                    </div>

                    {/* Milestone 4 */}
                    <div
                      className={`p-3.5 rounded-lg border text-center space-y-1 ${
                        selectedCase.internal_status === 'COMPLETED'
                          ? 'bg-[#ECFDF3] border-[#A6F4C5] text-[#027A48]'
                          : 'bg-[#F8F9FB] border-[#E5E7EB] text-[#667085]'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-white font-bold mx-auto flex items-center justify-center text-xs shadow-xs">
                        {selectedCase.internal_status === 'COMPLETED' ? '✓' : '4'}
                      </div>
                      <div className="font-semibold">4. Certificate Delivered</div>
                      <div className="text-[10px] text-[#667085]">
                        {selectedCase.gstin ? `Reg No: ${selectedCase.gstin}` : 'Certificate Allotted'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. CA Professional 4-Stage Action Console */}
                <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] space-y-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-[#252B36] tracking-wider">
                        CA Statutory 4-Stage Sequential Decision Console
                      </h3>
                      <p className="text-[11px] text-[#667085] mt-0.5">
                        Strict sequential progression: Each stage validates and unlocks the subsequent compliance action.
                      </p>
                    </div>
                    <span className="text-[10px] px-2.5 py-1 rounded-md bg-[#ECFDF3] text-[#027A48] border border-[#A6F4C5] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A] animate-ping"></span>
                      Real-Time Sync Connected
                    </span>
                  </div>

                  {(() => {
                    const caseModule = selectedCase.module_type || 'GST';

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* STEP 1: CA READS & VERIFIES DOCS */}
                        {(() => {
                          const isStep1Done =
                            selectedCase.docs_verified_at ||
                            selectedCase.internal_status === 'DOCUMENTS_VERIFIED' ||
                            selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                            selectedCase.internal_status === 'GOVERNMENT_APPROVED' ||
                            selectedCase.internal_status === 'COMPLETED';

                          const step1Title =
                            caseModule === 'COMPANY'
                              ? 'Verify Director KYC'
                              : caseModule === 'ITR'
                              ? 'Verify Financials'
                              : caseModule === 'TRADEMARK'
                              ? 'Verify Logo & Class'
                              : caseModule === 'LLP'
                              ? 'Verify Partner KYC'
                              : caseModule === 'UDYAM' || caseModule === 'MSME'
                              ? 'Verify PAN & NIC Code'
                              : 'Verify Application Docs';

                          const step1Desc =
                            caseModule === 'COMPANY'
                              ? 'Inspect Director identity, DIN, registered office proof, and MOA/AOA drafts.'
                              : caseModule === 'ITR'
                              ? 'Inspect Form 16, balance sheets, capital gains schedules, and 26AS tax credits.'
                              : caseModule === 'TRADEMARK'
                              ? 'Verify logo, trademark class specification, and applicant power of attorney.'
                              : caseModule === 'LLP'
                              ? 'Verify partner DPINs, partnership deed, and office address proof.'
                              : caseModule === 'UDYAM' || caseModule === 'MSME'
                              ? 'Verify PAN/GSTIN, 12-digit Aadhaar, 3-tier NIC code activity, and plant unit address.'
                              : 'Inspect applicant PAN, Aadhaar/ID, premises address, and constitution.';

                          return (
                            <div
                              className={`p-4 rounded-lg border flex flex-col justify-between space-y-3 transition ${
                                isStep1Done
                                  ? 'bg-[#F8F9FB] border-[#E5E7EB]'
                                  : 'bg-white border-[#155EEF] shadow-xs'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF]">
                                    Step 1 of 4
                                  </span>
                                  {isStep1Done ? (
                                    <span className="text-[10px] text-[#027A48] font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Verified
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-[#B54708] font-semibold">Action Needed</span>
                                  )}
                                </div>
                                <div className="font-bold text-[#252B36] text-sm">{step1Title}</div>
                                <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                                  {step1Desc}
                                </p>
                              </div>

                              <div className="pt-2 border-t border-[#E5E7EB]">
                                {isStep1Done ? (
                                  <div className="text-[11px] text-[#027A48] font-medium flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                    <span>Docs Certified by CA</span>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleExecuteAction('VERIFY_DOCS')}
                                    disabled={actionLoading}
                                    className="w-full py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs transition cursor-pointer shadow-xs disabled:opacity-50"
                                  >
                                    {actionLoading ? 'Verifying...' : 'Verify & Approve Docs'}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })()}

                        {/* STEP 2: CA SUBMITS TO GOVT PORTAL */}
                        {(() => {
                          const isStep1Done =
                            selectedCase.docs_verified_at ||
                            selectedCase.internal_status === 'DOCUMENTS_VERIFIED' ||
                            selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                            selectedCase.internal_status === 'GOVERNMENT_APPROVED' ||
                            selectedCase.internal_status === 'COMPLETED';

                          const isStep2Done =
                            selectedCase.arn &&
                            (selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                              selectedCase.internal_status === 'GOVERNMENT_APPROVED' ||
                              selectedCase.internal_status === 'COMPLETED');

                          const isLocked = !isStep1Done;

                          const step2Title =
                            caseModule === 'COMPANY'
                              ? 'Submit SPICe+ to MCA'
                              : caseModule === 'ITR'
                              ? 'E-file on IT Portal'
                              : caseModule === 'TRADEMARK'
                              ? 'File Form TM-A'
                              : caseModule === 'LLP'
                              ? 'Submit FiLLiP to MCA'
                              : caseModule === 'UDYAM' || caseModule === 'MSME'
                              ? 'Submit to MSME Portal'
                              : 'Submit to GST Portal';

                          const step2Placeholder =
                            caseModule === 'COMPANY'
                              ? 'MCA SRN (e.g. MCA-SRN-T12345678)'
                              : caseModule === 'ITR'
                              ? 'ITD Ack (e.g. ITR-ACK-1234567890)'
                              : caseModule === 'TRADEMARK'
                              ? 'TM App (e.g. TM-APP-1234567)'
                              : caseModule === 'LLP'
                              ? 'MCA SRN (e.g. LLP-SRN-L12345678)'
                              : caseModule === 'UDYAM' || caseModule === 'MSME'
                              ? 'Udyam Ack (e.g. UDYAM-ACK-1234567)'
                              : 'ARN (e.g. AA2908260012345)';

                          const step2BtnText =
                            caseModule === 'COMPANY'
                              ? 'Transmit & Record SRN'
                              : caseModule === 'ITR'
                              ? 'File & Record Ack No'
                              : caseModule === 'TRADEMARK'
                              ? 'File & Record TM App No'
                              : caseModule === 'LLP'
                              ? 'Transmit & Record SRN'
                              : caseModule === 'UDYAM' || caseModule === 'MSME'
                              ? 'File & Record Udyam Ack'
                              : 'Transmit & Record ARN';

                          return (
                            <div
                              className={`p-4 rounded-lg border flex flex-col justify-between space-y-3 transition ${
                                isLocked
                                  ? 'bg-[#F8F9FB] border-[#E5E7EB] opacity-60'
                                  : isStep2Done
                                  ? 'bg-[#F8F9FB] border-[#E5E7EB]'
                                  : 'bg-white border-[#155EEF] shadow-xs'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF]">
                                    Step 2 of 4
                                  </span>
                                  {isLocked ? (
                                    <span className="text-[10px] text-[#667085] font-semibold flex items-center gap-1">
                                      <Lock className="w-3 h-3" /> Locked
                                    </span>
                                  ) : isStep2Done ? (
                                    <span className="text-[10px] text-[#027A48] font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Filed
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-[#155EEF] font-semibold">Ready to File</span>
                                  )}
                                </div>
                                <div className="font-bold text-[#252B36] text-sm">{step2Title}</div>
                                <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                                  Submit statutory dossier to government portal and record reference number.
                                </p>
                              </div>

                              <div className="pt-2 border-t border-[#E5E7EB] space-y-2">
                                {isLocked ? (
                                  <p className="text-[10px] text-[#667085] italic">Locked until Step 1 is verified.</p>
                                ) : isStep2Done ? (
                                  <div className="space-y-1">
                                    <span className="text-[10px] text-[#667085] block">Filing Reference (ARN/SRN):</span>
                                    <div className="font-mono text-xs font-bold text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded border border-[#A6F4C5]">
                                      {selectedCase.arn}
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <input
                                      type="text"
                                      value={arnInput}
                                      onChange={(e) => setArnInput(e.target.value)}
                                      placeholder={step2Placeholder}
                                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E5E7EB] text-[#252B36] font-mono text-xs focus:border-[#155EEF] focus:outline-hidden"
                                    />
                                    <button
                                      onClick={() => handleExecuteAction('SUBMIT_TO_PORTAL')}
                                      disabled={actionLoading}
                                      className="w-full py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs transition cursor-pointer shadow-xs disabled:opacity-50"
                                    >
                                      {actionLoading ? 'Transmitting...' : step2BtnText}
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })()}

                        {/* STEP 3: GOVERNMENT APPROVAL */}
                        {(() => {
                          const isStep2Done =
                            selectedCase.arn &&
                            (selectedCase.internal_status === 'GOVERNMENT_PROCESSING' ||
                              selectedCase.internal_status === 'GOVERNMENT_APPROVED' ||
                              selectedCase.internal_status === 'COMPLETED');

                          const isStep3Done =
                            selectedCase.gstin &&
                            (selectedCase.internal_status === 'GOVERNMENT_APPROVED' ||
                              selectedCase.internal_status === 'COMPLETED');

                          const isLocked = !isStep2Done;

                          const step3Title =
                            caseModule === 'COMPANY'
                              ? 'Record ROC Approval (CIN)'
                              : caseModule === 'ITR'
                              ? 'Record CPC Approval'
                              : caseModule === 'TRADEMARK'
                              ? 'Record TM Acceptance'
                              : caseModule === 'LLP'
                              ? 'Record ROC Approval (LLPIN)'
                              : caseModule === 'UDYAM' || caseModule === 'MSME'
                              ? 'Allot Udyam Reg Number'
                              : 'Government Approval';

                          const step3Placeholder =
                            caseModule === 'COMPANY'
                              ? 'CIN (e.g. U72200KA2026PTC123456)'
                              : caseModule === 'ITR'
                              ? 'CPC Intimation (e.g. CPC/2026/INT/12345)'
                              : caseModule === 'TRADEMARK'
                              ? 'TM Reg (e.g. TM-REG-1234567)'
                              : caseModule === 'LLP'
                              ? 'LLPIN (e.g. LLPIN-AAA-1234)'
                              : caseModule === 'UDYAM' || caseModule === 'MSME'
                              ? 'UDYAM No (e.g. UDYAM-KR-03-0012345)'
                              : 'GSTIN (e.g. 29AABCB1234F1Z9)';

                          return (
                            <div
                              className={`p-4 rounded-lg border flex flex-col justify-between space-y-3 transition ${
                                isLocked
                                  ? 'bg-[#F8F9FB] border-[#E5E7EB] opacity-60'
                                  : isStep3Done
                                  ? 'bg-[#F8F9FB] border-[#E5E7EB]'
                                  : 'bg-white border-[#155EEF] shadow-xs'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF]">
                                    Step 3 of 4
                                  </span>
                                  {isLocked ? (
                                    <span className="text-[10px] text-[#667085] font-semibold flex items-center gap-1">
                                      <Lock className="w-3 h-3" /> Locked
                                    </span>
                                  ) : isStep3Done ? (
                                    <span className="text-[10px] text-[#027A48] font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Approved
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-[#B54708] font-semibold">Officer Review</span>
                                  )}
                                </div>
                                <div className="font-bold text-[#252B36] text-sm">{step3Title}</div>
                                <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                                  Verify statutory approval and record official identifier allotment.
                                </p>
                              </div>

                              <div className="pt-2 border-t border-[#E5E7EB] space-y-2">
                                {isLocked ? (
                                  <p className="text-[10px] text-[#667085] italic">Locked until Step 2 is filed.</p>
                                ) : isStep3Done ? (
                                  <div className="space-y-1">
                                    <span className="text-[10px] text-[#667085] block">Allotted Identifier:</span>
                                    <div className="font-mono text-xs font-bold text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded border border-[#A6F4C5]">
                                      {selectedCase.gstin}
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <input
                                      type="text"
                                      value={gstinInput}
                                      onChange={(e) => setGstinInput(e.target.value.toUpperCase())}
                                      placeholder={step3Placeholder}
                                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E5E7EB] text-[#252B36] font-mono text-xs focus:border-[#155EEF] focus:outline-hidden uppercase"
                                    />
                                    <button
                                      onClick={() => handleExecuteAction('RECORD_GOVT_APPROVAL')}
                                      disabled={actionLoading}
                                      className="w-full py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs transition cursor-pointer shadow-xs disabled:opacity-50"
                                    >
                                      {actionLoading ? 'Recording...' : 'Record Govt Approval'}
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })()}

                        {/* STEP 4: DISPATCH OFFICIAL REGISTRATION DOCUMENT */}
                        {(() => {
                          const isStep3Done =
                            selectedCase.gstin &&
                            (selectedCase.internal_status === 'GOVERNMENT_APPROVED' ||
                              selectedCase.internal_status === 'COMPLETED');

                          const isStep4Done = selectedCase.internal_status === 'COMPLETED';
                          const isLocked = !isStep3Done;

                          const step4Title =
                            caseModule === 'COMPANY'
                              ? 'Send COI to Customer'
                              : caseModule === 'ITR'
                              ? 'Send ITR-V Ack'
                              : caseModule === 'TRADEMARK'
                              ? 'Send TM Certificate'
                              : caseModule === 'LLP'
                              ? 'Send LLP Certificate'
                              : caseModule === 'UDYAM' || caseModule === 'MSME'
                              ? 'Send Udyam Certificate'
                              : 'Send Certificate to Customer';

                          const step4BtnText =
                            caseModule === 'COMPANY'
                              ? 'Dispatch COI Certificate'
                              : caseModule === 'ITR'
                              ? 'Dispatch ITR-V Ack'
                              : caseModule === 'TRADEMARK'
                              ? 'Dispatch TM Certificate'
                              : caseModule === 'LLP'
                              ? 'Dispatch LLP Certificate'
                              : caseModule === 'UDYAM' || caseModule === 'MSME'
                              ? 'Dispatch Udyam Certificate'
                              : 'Dispatch Certificate';

                          return (
                            <div
                              className={`p-4 rounded-lg border flex flex-col justify-between space-y-3 transition ${
                                isLocked
                                  ? 'bg-[#F8F9FB] border-[#E5E7EB] opacity-60'
                                  : isStep4Done
                                  ? 'bg-[#ECFDF3] border-[#A6F4C5]'
                                  : 'bg-white border-[#155EEF] shadow-xs'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF]">
                                    Step 4 of 4
                                  </span>
                                  {isLocked ? (
                                    <span className="text-[10px] text-[#667085] font-semibold flex items-center gap-1">
                                      <Lock className="w-3 h-3" /> Locked
                                    </span>
                                  ) : isStep4Done ? (
                                    <span className="text-[10px] text-[#027A48] font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" /> Dispatched
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-[#155EEF] font-semibold">Ready to Dispatch</span>
                                  )}
                                </div>
                                <div className="font-bold text-[#252B36] text-sm">{step4Title}</div>
                                <p className="text-[11px] text-[#667085] mt-1 leading-relaxed">
                                  Dispatch official certificate directly to customer dashboard via real-time WebSocket.
                                </p>
                              </div>

                              <div className="pt-2 border-t border-[#E5E7EB] space-y-2">
                                {isLocked ? (
                                  <p className="text-[10px] text-[#667085] italic">Locked until Step 3 is approved.</p>
                                ) : isStep4Done ? (
                                  <div className="text-[11px] text-[#027A48] font-semibold flex items-center gap-1.5">
                                    <FileCheck2 className="w-4 h-4 text-[#027A48] shrink-0" />
                                    <span>Certificate Delivered</span>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleExecuteAction('DISPATCH_CERTIFICATE')}
                                    disabled={actionLoading}
                                    className="w-full py-2 rounded-lg bg-[#027A48] hover:bg-[#05603A] text-white font-semibold text-xs transition cursor-pointer shadow-xs disabled:opacity-50 flex items-center justify-center gap-1.5"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>{actionLoading ? 'Dispatching...' : step4BtnText}</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })()}
                </div>

                {/* 4. Delivered Certificate Preview (If completed) */}
                {selectedCase.internal_status === 'COMPLETED' && (
                  <div className="p-4 rounded-lg bg-[#ECFDF3] border border-[#A6F4C5] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#027A48] text-white flex items-center justify-center font-bold">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#252B36]">
                          {selectedCase.module_type === 'COMPANY'
                            ? 'Official Certificate of Incorporation (COI)'
                            : selectedCase.module_type === 'ITR'
                            ? 'Official ITR-V Verification & Assessment Order'
                            : selectedCase.module_type === 'TRADEMARK'
                            ? 'Official Trademark Registration Certificate'
                            : selectedCase.module_type === 'LLP'
                            ? 'Official LLP Certificate of Incorporation'
                            : 'Official GST Registration Certificate (REG-06)'}
                        </div>
                        <div className="text-[11px] text-[#027A48] font-mono">
                          {selectedCase.module_type === 'COMPANY'
                            ? 'CIN: '
                            : selectedCase.module_type === 'ITR'
                            ? 'CPC Ref: '
                            : selectedCase.module_type === 'TRADEMARK'
                            ? 'TM No: '
                            : selectedCase.module_type === 'LLP'
                            ? 'LLPIN: '
                            : 'GSTIN: '}
                          {selectedCase.gstin || 'STATUTORY-REG'} • Delivered to {selectedCase.customer_name}
                        </div>
                      </div>
                    </div>

                    <a
                      href={selectedCase.certificate_url || '/sample_gst_certificate.pdf'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#252B36] border border-[#E5E7EB] text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
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

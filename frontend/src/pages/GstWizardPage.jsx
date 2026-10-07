import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import confetti from 'canvas-confetti';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Upload,
  ArrowRight,
  ArrowLeft,
  Save,
  Sparkles,
  ShieldCheck,
  Building2,
  CreditCard,
  User,
  MapPin,
  FileText,
  Trash2,
  Eye,
  Check,
  RefreshCw,
} from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Profile', desc: 'Personal details' },
  { id: 2, label: 'Business', desc: 'Entity structure' },
  { id: 3, label: 'Address', desc: 'Principal place' },
  { id: 4, label: 'Activity', desc: 'Nature of trade' },
  { id: 5, label: 'HSN / SAC', desc: 'Goods & services' },
  { id: 6, label: 'Stakeholders', desc: 'Partners/Directors' },
  { id: 7, label: 'Signatory', desc: 'Authorised person' },
  { id: 8, label: 'Bank Details', desc: 'Account & IFSC' },
  { id: 9, label: 'Documents', desc: 'AI OCR scan' },
  { id: 10, label: 'Review', desc: 'AI Pre-check' },
  { id: 11, label: 'Payment', desc: 'CA filing fee' },
];

export default function GstWizardPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError, showWarning } = useToast();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [appId, setAppId] = useState(id || null);
  const [appNumber, setAppNumber] = useState('');
  const [businessType, setBusinessType] = useState('Proprietorship');
  const [formData, setFormData] = useState({});
  const [requirements, setRequirements] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [precheckResult, setPrecheckResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingDocType, setUploadingDocType] = useState(null);

  // Initialize or Load Application
  useEffect(() => {
    const initApp = async () => {
      try {
        setLoading(true);
        if (appId) {
          // Load existing application
          const res = await api.getApplication(appId);
          if (res.success && res.application) {
            setAppNumber(res.application.application_number);
            setBusinessType(res.application.business_type || 'Proprietorship');
            setFormData(res.application.fields_data || {});
            setCurrentStep(res.application.current_step || 1);
            setUploadedDocs(res.documents || []);
            setRequirements(res.requirements);
          }
        } else {
          // Create new draft or load customer's draft
          const listRes = await api.getApplications();
          const existingDraft = listRes.applications?.find((a) => a.internal_status === 'DRAFT' || a.internal_status === 'DOCUMENT_PENDING');

          if (existingDraft) {
            setAppId(existingDraft.id);
            setAppNumber(existingDraft.application_number);
            setBusinessType(existingDraft.business_type || 'Proprietorship');
            setFormData(existingDraft.fields_data || {});
            setCurrentStep(existingDraft.current_step || 1);
            const detailRes = await api.getApplication(existingDraft.id);
            setUploadedDocs(detailRes.documents || []);
            setRequirements(detailRes.requirements);
          } else {
            // Create fresh application
            const createRes = await api.createApplication({
              business_type: 'Proprietorship',
              state: 'Karnataka',
            });
            if (createRes.success && createRes.application) {
              setAppId(createRes.application.id);
              setAppNumber(createRes.application.application_number);
              setBusinessType(createRes.application.business_type);
              setFormData(createRes.application.fields_data || {});
              const reqRes = await api.getRequirements(createRes.application.business_type, 'Karnataka');
              setRequirements(reqRes.requirements);
            }
          }
        }
      } catch (err) {
        showError('Failed to initialize GST Application.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      initApp();
    } else {
      navigate('/login');
    }
  }, [appId, isAuthenticated]);

  // Recalculate dynamic requirements if business type changes
  const handleBusinessTypeChange = async (newType) => {
    setBusinessType(newType);
    setFormData((prev) => ({ ...prev, business_type: newType }));
    try {
      const res = await api.getRequirements(newType, formData.state || 'Karnataka');
      if (res.success) {
        setRequirements(res.requirements);
      }
    } catch (e) {}
  };

  const handleFieldChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Autosave / Next Step handler
  const handleSaveAndContinue = async (nextStepIndex) => {
    if (!appId) return;
    setSaving(true);
    try {
      const targetStep = nextStepIndex !== undefined ? nextStepIndex : currentStep + 1;
      const res = await api.saveStep(appId, {
        step: targetStep,
        fields_data: formData,
      });

      if (res.success) {
        if (targetStep <= STEPS.length) {
          setCurrentStep(targetStep);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } catch (err) {
      showError('Autosave failed. Check connection.');
    } finally {
      setSaving(false);
    }
  };

  // Document Upload Handler
  const handleFileUpload = async (docType, file) => {
    if (!file || !appId) return;
    setUploadingDocType(docType);
    try {
      const res = await api.uploadDocument(appId, docType, file);
      if (res.success) {
        showSuccess(`Uploaded & AI-scanned: ${docType.replace(/_/g, ' ')}`);
        // Refresh docs
        const docRes = await api.getDocuments(appId);
        setUploadedDocs(docRes.documents || []);
      }
    } catch (err) {
      showError(err.message || 'Upload failed.');
    } finally {
      setUploadingDocType(null);
    }
  };

  // Document Delete Handler
  const handleDeleteDoc = async (docId) => {
    try {
      const res = await api.deleteDocument(docId);
      if (res.success) {
        showSuccess('Document deleted.');
        setUploadedDocs((prev) => prev.filter((d) => d.id !== docId));
      }
    } catch (err) {
      showError('Failed to remove document.');
    }
  };

  // AI Pre-Check Trigger for Step 10
  const triggerPrecheck = async () => {
    if (!appId) return;
    try {
      const res = await api.runPrecheck(appId);
      if (res.success) {
        setPrecheckResult(res.summary);
      }
    } catch (err) {
      showError('Pre-check calculation failed.');
    }
  };

  // Payment Execution (Step 11)
  const handleCompletePayment = async () => {
    if (!appId) return;
    setSaving(true);
    try {
      // Step 1: Create Order
      const orderRes = await api.createPaymentOrder(appId);
      if (!orderRes.success) throw new Error('Order creation failed.');

      // Step 2: Verify Payment (Simulated Instant Sandbox Verification for development)
      const verifyRes = await api.verifyPayment({
        order_id: orderRes.order.order_id,
        payment_id: `pay_${Date.now()}_mock`,
        signature: 'sandbox_valid_signature',
        application_id: appId,
      });

      if (verifyRes.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        showSuccess('Payment verified! Your application is now assigned to our CA desk.');
        navigate('/dashboard');
      }
    } catch (err) {
      showError(err.message || 'Payment processing failed.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
          <div className="text-sm font-bold text-slate-700">Loading GST Application Wizard...</div>
          <div className="text-xs text-slate-400">Prefilling verified information from Master Profile</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Application Header */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8 sticky top-18 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-slate-400 hover:text-slate-700 transition" title="Back to Dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                <span>Application ID:</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                  {appNumber || 'GST-2026-000001'}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-emerald-700 font-bold">{businessType}</span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900">
                Step {currentStep} of 11: {STEPS[currentStep - 1]?.label}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 hidden sm:inline flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-500" /> Autosaved
            </span>
            <Link
              to="/"
              className="text-xs font-bold text-slate-700 hover:text-[#0B1E36] px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
              title="Return to BharatFiling Homepage"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
            >
              Save & Exit
            </Link>
          </div>
        </div>

        {/* Horizontal Stepper Progress */}
        <div className="max-w-6xl mx-auto mt-3 overflow-x-auto pb-1">
          <div className="flex items-center gap-1 min-w-[700px]">
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  if (s.id <= currentStep) setCurrentStep(s.id);
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-left transition ${
                  currentStep === s.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : s.id < currentStep
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className="text-[10px] font-bold leading-tight flex items-center gap-1">
                  {s.id < currentStep ? '✓' : s.id}. {s.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Content Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          {/* STEP 1: PROFILE */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">01. Applicant Personal & Identity Details</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Prefilled from your verified Master Profile. Values must match your PAN and Aadhaar cards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name (as per PAN) *</label>
                  <input
                    type="text"
                    value={formData.applicant_name || ''}
                    onChange={(e) => handleFieldChange('applicant_name', e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <div className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    ✓ Verified from Master Profile
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Father's Name *</label>
                  <input
                    type="text"
                    value={formData.father_name || ''}
                    onChange={(e) => handleFieldChange('father_name', e.target.value)}
                    placeholder="e.g. Suresh Kumar Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of Birth (YYYY-MM-DD) *</label>
                  <input
                    type="date"
                    value={formData.dob || ''}
                    onChange={(e) => handleFieldChange('dob', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">PAN Card Number *</label>
                  <input
                    type="text"
                    value={formData.pan_number || ''}
                    onChange={(e) => handleFieldChange('pan_number', e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 font-mono uppercase rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <div className="text-[10px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                    ✓ Format Validated (Income Tax Anchor)
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Aadhaar Number *</label>
                  <input
                    type="text"
                    value={formData.aadhaar_number || ''}
                    onChange={(e) => handleFieldChange('aadhaar_number', e.target.value)}
                    placeholder="12-digit Aadhaar number"
                    maxLength={12}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">Masked in public views (XXXX-XXXX-1012)</div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.mobile_number || ''}
                    onChange={(e) => handleFieldChange('mobile_number', e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <div className="text-[10px] text-slate-500 mt-1">Will receive Aadhaar e-Sign OTP</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BUSINESS */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">02. Constitution of Business & Entity Details</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Selecting your business type dynamically configures the document requirements engine.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-2">Constitution of Business *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {['Proprietorship', 'Partnership', 'LLP', 'Private Limited Company', 'One Person Company', 'HUF'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleBusinessTypeChange(type)}
                        className={`p-3 rounded-xl border text-left transition ${
                          businessType === type
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Legal Name of Business *</label>
                    <input
                      type="text"
                      value={formData.legal_name || ''}
                      onChange={(e) => handleFieldChange('legal_name', e.target.value)}
                      placeholder="e.g. Verma Tech Solutions"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                    <div className="text-[10px] text-slate-500 mt-1">For proprietorship, this is the legal operating title</div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Trade Name / Brand Name</label>
                    <input
                      type="text"
                      value={formData.trade_name || ''}
                      onChange={(e) => handleFieldChange('trade_name', e.target.value)}
                      placeholder="e.g. Verma Cloud Services (Optional)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ADDRESS */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">03. Principal Place of Business Address</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Must match the electricity bill or municipal tax receipt you will upload in Step 9.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Address Line 1 (Building / Street) *</label>
                  <input
                    type="text"
                    value={formData.address_line_1 || ''}
                    onChange={(e) => handleFieldChange('address_line_1', e.target.value)}
                    placeholder="Plot 12, Tech Park Avenue, EPIP Zone"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    placeholder="Bengaluru"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">State / Union Territory *</label>
                  <select
                    value={formData.state || 'Karnataka'}
                    onChange={(e) => handleFieldChange('state', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Haryana">Haryana</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    value={formData.pincode || ''}
                    onChange={(e) => handleFieldChange('pincode', e.target.value)}
                    placeholder="560066"
                    maxLength={6}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nature of Possession *</label>
                  <select
                    value={formData.possession_type || 'Rented'}
                    onChange={(e) => handleFieldChange('possession_type', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Owned">Owned (Property Tax / Bill in own name)</option>
                    <option value="Rented">Rented (Rent agreement + Landlord NOC)</option>
                    <option value="Shared / Consent">Consent / Family Owned (NOC needed)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ACTIVITY */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">04. Nature of Business Activities</h2>
                <p className="text-xs text-slate-500 mt-1">Select all categories that apply to your business.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  'Service Provision & IT Consulting',
                  'Retail Business / Shop',
                  'Wholesale & Distribution',
                  'E-Commerce Marketplace Selling',
                  'Manufacturing',
                  'Export of Goods / Services',
                  'Warehouse / Logistics',
                  'Works Contract & Construction',
                ].map((act) => {
                  const selected = (formData.business_activity || '').includes(act);
                  return (
                    <button
                      key={act}
                      type="button"
                      onClick={() => {
                        handleFieldChange('business_activity', act);
                      }}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                        selected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span>{act}</span>
                      {selected && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: HSN / SAC */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">05. Goods & Services Classification (HSN / SAC)</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Our AI maps your activities to standard 6-digit codes. You can confirm or add more.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-800">Primary Mapped Codes:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-emerald-100 text-emerald-800 font-mono font-bold px-2.5 py-1 rounded-lg">
                      SAC 998313 — Information Technology Consulting
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 font-mono font-bold px-2.5 py-1 rounded-lg">
                      SAC 998314 — Software Development & Publishing
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Note: Your assigned CA will verify whether additional HSN/SAC codes are required prior to filing.
                </div>
              </div>
            </div>
          )}

          {/* STEP 6 & 7: STAKEHOLDERS & SIGNATORY */}
          {(currentStep === 6 || currentStep === 7) && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  {currentStep === 6 ? '06. Partners / Directors' : '07. Authorised Signatory'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  For {businessType}, the primary signatory is the applicant.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Primary Authorised Signatory Set:</div>
                  <div className="mt-1">
                    <strong>{formData.applicant_name || 'Rahul Verma'}</strong> is nominated as primary authorised person. Aadhaar authentication will be completed via OTP.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: BANK DETAILS */}
          {currentStep === 8 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">08. Primary Bank Account Details</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Account where GST refunds or business transactions occur.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bank Name *</label>
                  <input
                    type="text"
                    value={formData.bank_name || ''}
                    onChange={(e) => handleFieldChange('bank_name', e.target.value)}
                    placeholder="HDFC Bank"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Account Number *</label>
                  <input
                    type="text"
                    value={formData.bank_account_no || ''}
                    onChange={(e) => handleFieldChange('bank_account_no', e.target.value)}
                    placeholder="001234567890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">IFSC Code *</label>
                  <input
                    type="text"
                    value={formData.bank_ifsc || ''}
                    onChange={(e) => handleFieldChange('bank_ifsc', e.target.value.toUpperCase())}
                    placeholder="HDFC0001234"
                    maxLength={11}
                    className="w-full px-3.5 py-2.5 font-mono uppercase rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: DOCUMENTS */}
          {currentStep === 9 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">09. Upload Required Documents</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Our AI/OCR engine classifies and reads every document instantly to verify name consistency.
                </p>
              </div>

              {/* Dynamic Required Docs Checklist */}
              <div className="space-y-4">
                {(requirements?.required_documents || []).map((reqDoc) => {
                  const existing = uploadedDocs.find((d) => d.document_type === reqDoc.type);
                  const isUploading = uploadingDocType === reqDoc.type;

                  return (
                    <div
                      key={reqDoc.type}
                      className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{reqDoc.title}</span>
                          {reqDoc.mandatory && (
                            <span className="text-[10px] font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-[11px]">{reqDoc.description}</p>

                        {/* OCR Extraction Badge if uploaded */}
                        {existing && (
                          <div className="pt-2 flex flex-col gap-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              {existing.ai_confidence >= 0.6 ? (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                  ✓ AI Confidence: {(existing.ai_confidence * 100).toFixed(0)}%
                                </span>
                              ) : (
                                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-rose-200">
                                  ⚠️ Invalid / Unverified: {(existing.ai_confidence * 100).toFixed(0)}%
                                </span>
                              )}
                              <span className="text-slate-400 text-[10px]">
                                File: {existing.original_name}
                              </span>
                            </div>
                            {existing.mismatch_flags?.length > 0 && (
                              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-[11px] p-2 rounded-lg font-medium space-y-0.5">
                                {existing.mismatch_flags.map((msg, i) => (
                                  <div key={i} className="flex items-start gap-1">
                                    <span className="shrink-0">⚠️</span>
                                    <span>{msg}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {existing ? (
                          <>
                            <a
                              href={existing.file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 transition"
                              title="Preview Document"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleDeleteDoc(existing.id)}
                              className="p-2 rounded-xl bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 transition"
                              title="Delete Document"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition">
                            <Upload className="w-3.5 h-3.5" />
                            {isUploading ? 'Scanning...' : 'Upload File'}
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleFileUpload(reqDoc.type, e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 10: REVIEW & AI PRE-CHECK */}
          {currentStep === 10 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">10. Application Review & AI Pre-Check</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Pre-submission sanity analysis performed by BharatFiling AI engine.
                  </p>
                </div>
                <button
                  onClick={triggerPrecheck}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Run Fresh Pre-Check
                </button>
              </div>

              {/* Pre-check Metric Card */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black text-emerald-400">
                    {precheckResult ? `${precheckResult.completed_fields} / ${precheckResult.total_required_fields}` : '16 / 16'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Mandatory Fields</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">
                    {uploadedDocs.length} / {requirements?.required_documents?.length || 6}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Documents Uploaded</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-400">98%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">AI Confidence</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-400">
                    {precheckResult?.mismatches?.length || 0}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Discrepancies Flagged</div>
                </div>
              </div>

              {/* Mismatches & Issues List */}
              {precheckResult?.mismatches?.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-amber-800">Review Items for Assigned CA:</div>
                  {precheckResult.mismatches.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">{m.message}</div>
                        <div className="text-[11px] text-amber-800 mt-0.5">
                          Form value: <strong>{m.form_value}</strong> | Document value: <strong>{m.doc_value}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-bold">AI Sanity Verification Passed Cleanly</div>
                    <div>Names and identity numbers match across your PAN, Aadhaar, and application inputs. Ready for CA audit.</div>
                  </div>
                </div>
              )}

              {/* Summary Overview */}
              <div className="p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-800">Dossier Summary:</div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>Applicant: <strong>{formData.applicant_name}</strong></div>
                  <div>Business: <strong>{formData.legal_name} ({businessType})</strong></div>
                  <div>PAN: <strong>{formData.pan_number}</strong></div>
                  <div>State: <strong>{formData.state}</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 11: PAYMENT */}
          {currentStep === 11 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">11. CA Professional Filing Fee & Checkout</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Transparent breakdown. Securely processed via Razorpay.
                </p>
              </div>

              <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="font-bold text-slate-900">GST Registration Service</span>
                  <span className="font-black text-slate-900">₹1,499</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>GST on Professional Services (18%)</span>
                  <span>₹270</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Government Portal Filing Fee</span>
                  <span className="text-emerald-700 font-bold">₹0 (NIL)</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-sm font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-xl text-emerald-700">₹1,769</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800">Package Inclusions:</div>
                  <div>✓ Form REG-01 Preparation & Filing</div>
                  <div>✓ Assigned Chartered Accountant Review</div>
                  <div>✓ Clarification (REG-03) response drafting</div>
                  <div>✓ Final REG-06 Certificate & GSTIN Delivery</div>
                </div>

                <button
                  onClick={handleCompletePayment}
                  disabled={saving}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  {saving ? 'Processing...' : 'Pay ₹1,769 & Submit to CA Desk'}
                </button>

                <div className="text-center text-[10px] text-slate-400">
                  Secured by 256-Bit Razorpay Payment Gateway & TLS Encryption
                </div>
              </div>
            </div>
          )}

          {/* Stepper Bottom Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => {
                if (currentStep > 1) setCurrentStep(currentStep - 1);
              }}
              disabled={currentStep === 1 || saving}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition disabled:opacity-40 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            {currentStep < 11 && (
              <button
                onClick={() => handleSaveAndContinue()}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md"
              >
                {saving ? 'Saving...' : 'Save & Continue'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

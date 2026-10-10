import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  X,
  Lock,
  Mail,
  Phone,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Check,
  Building2,
  Receipt,
  FileCheck2,
  Eye,
  EyeOff,
  KeyRound,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';

export default function AuthRequiredModal({
  isOpen,
  onClose,
  service = null,
  onSuccess = null,
}) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Registration OTP staging
  const [regStep, setRegStep] = useState(1); // 1: form details, 2: OTP verification
  const [regTxnId, setRegTxnId] = useState('');
  const [regOtp, setRegOtp] = useState('');
  const [regCooldown, setRegCooldown] = useState(0);

  const {
    login,
    register,
    requestRegisterOtp,
    verifyRegisterOtp,
    quickSwitchAccount,
  } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  // Cooldown timer
  useEffect(() => {
    if (regCooldown <= 0) return;
    const timer = setInterval(() => {
      setRegCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [regCooldown]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAuthSuccess = (authenticatedUser) => {
    showSuccess(`Welcome ${authenticatedUser?.full_name || 'back'}! Continuing your filing...`);
    onClose();

    if (onSuccess) {
      onSuccess(authenticatedUser);
    } else if (service?.ctaPath || service?.path) {
      navigate(service.ctaPath || service.path);
    } else {
      navigate('/dashboard');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!identifier || !password) {
      setAuthError('Please enter both Email/Phone and Password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(identifier, password);
      if (res.success) {
        handleAuthSuccess(res.user);
      } else {
        setAuthError(res.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setAuthError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!fullName || !email || !phone || !password) {
      setAuthError('Please fill in all mandatory fields.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const res = await requestRegisterOtp({
        full_name: fullName,
        email,
        phone: cleanPhone,
        password,
      });

      if (res.success) {
        setRegTxnId(res.txn_id);
        setRegStep(2);
        setRegCooldown(res.cooldown_seconds || 60);
      } else {
        setAuthError(res.message || 'Failed to dispatch verification code.');
      }
    } catch (err) {
      setAuthError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterVerifyOtp = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!regOtp || regOtp.trim().length !== 6) {
      setAuthError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyRegisterOtp({
        email,
        otp: regOtp.trim(),
        txn_id: regTxnId,
      });

      if (res.success) {
        handleAuthSuccess(res.user);
      } else {
        setAuthError(res.message || 'Verification failed.');
      }
    } catch (err) {
      setAuthError(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendRegisterOtp = async () => {
    if (regCooldown > 0) return;
    setLoading(true);
    setAuthError('');
    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const res = await requestRegisterOtp({
        full_name: fullName,
        email,
        phone: cleanPhone,
        password,
      });
      if (res.success) {
        setRegTxnId(res.txn_id);
        setRegCooldown(res.cooldown_seconds || 60);
        showSuccess('New verification code sent to your email!');
      }
    } catch (err) {
      setAuthError(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setAuthError('');
    try {
      const res = await quickSwitchAccount('CLIENT');
      if (res?.success) {
        handleAuthSuccess(res.user);
      } else {
        const loginRes = await login('rahul.verma@example.com', 'Password@123');
        if (loginRes.success) {
          handleAuthSuccess(loginRes.user);
        } else {
          setAuthError('Demo account currently unavailable.');
        }
      }
    } catch (err) {
      setAuthError('Failed to switch demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-[450px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(17,24,39,0.25)] border border-slate-200/90 overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <img
              src="/bharatfiling-icon-transparent.png"
              alt="BharatFiling"
              className="h-6 w-auto object-contain"
            />
            <span className="font-black text-base text-slate-900 tracking-tight">
              Bharat<span className="text-[#F26522]">Filing</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition flex items-center justify-center"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Selected Service Card */}
          {service && (
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {service.category || 'Selected Service'}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {service.title}
                  </h4>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-slate-900">
                    {service.price}
                  </div>
                  {service.period && (
                    <div className="text-[10px] text-slate-500 font-medium">
                      {service.period}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  CA Audited Filing
                </span>
                <span className="text-slate-500 font-medium">
                  100% Online & Paperless
                </span>
              </div>
            </div>
          )}

          {/* Segmented Control Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold border border-slate-200/80">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setRegStep(1);
                setAuthError('');
              }}
              className={`py-2 rounded-xl transition duration-150 ${
                mode === 'login'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setRegStep(1);
                setAuthError('');
              }}
              className={`py-2 rounded-xl transition duration-150 ${
                mode === 'register'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Title & Help Text */}
          <div className="text-left space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900">
              {mode === 'login'
                ? 'Sign In to Your Account'
                : regStep === 1
                ? 'Create Free Client Account'
                : 'Verify Email Address'}
            </h3>
            <p className="text-xs text-slate-500">
              {mode === 'login'
                ? 'Enter your credentials to continue to filing setup.'
                : regStep === 1
                ? 'Set up your Master Profile to initialize your filing vault.'
                : `Enter the 6-digit verification code sent to ${email}`}
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {authError}
            </div>
          )}

          {mode === 'login' ? (
            /* Sign In Form */
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address or Mobile
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    placeholder="Enter email address or mobile number"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]/10 focus:border-[#111827] transition"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <a
                    href="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      navigate('/login');
                    }}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]/10 focus:border-[#111827] transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-[0.99] cursor-pointer"
              >
                {loading ? 'Authenticating...' : 'Sign In & Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : regStep === 1 ? (
            /* Create Account Form - Step 1: Details */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (as per PAN)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    placeholder="Enter full legal name"
                    className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]/10 focus:border-[#111827] transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="Enter email address"
                      className="w-full pl-9 pr-2.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]/10 focus:border-[#111827] transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      className="w-full pl-9 pr-2.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]/10 focus:border-[#111827] transition"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Create a password (min. 6 characters)"
                    className="w-full pl-10 pr-10 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/40 hover:border-slate-300 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#111827]/10 focus:border-[#111827] transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-[0.99] cursor-pointer"
              >
                {loading ? 'Sending Code...' : 'Continue & Verify Email OTP'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Create Account Form - Step 2: OTP Verification */
            <form onSubmit={handleRegisterVerifyOtp} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Check Your Email Inbox
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  We've sent a 6-digit confirmation code to <span className="font-bold">{email}</span>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">6-Digit Verification Code</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    maxLength={6}
                    value={regOtp}
                    onChange={(e) => setRegOtp(e.target.value.replace(/\D/g, ''))}
                    autoComplete="one-time-code"
                    placeholder="123456"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#111827] focus:outline-hidden text-center text-lg font-mono font-bold tracking-[0.4em]"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || regOtp.length !== 6}
                className="w-full py-3 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-[0.99] cursor-pointer"
              >
                {loading ? 'Verifying...' : 'Verify OTP & Start Filing'}
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <button
                  type="button"
                  onClick={() => setRegStep(1)}
                  className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>

                <button
                  type="button"
                  disabled={regCooldown > 0 || loading}
                  onClick={handleResendRegisterOtp}
                  className={`font-bold flex items-center gap-1 ${
                    regCooldown > 0
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  {regCooldown > 0 ? `Resend code in ${regCooldown}s` : 'Resend Code'}
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo 1-Click Testing Helper */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
              <span>1-Click Test: Continue as Demo Client (Rahul Verma)</span>
            </button>
          </div>

          {/* Footer Security Badges */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>256-Bit SSL Encryption • Licensed ICAI Chartered Accountants</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  Zap,
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
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const { login, register, quickSwitchAccount } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

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
    showSuccess(`Welcome ${authenticatedUser?.full_name || 'back'}! Starting your filing...`);
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

    setLoading(true);
    try {
      const res = await register({
        full_name: fullName,
        email,
        phone: cleanPhone,
        password,
      });

      if (res.success) {
        handleAuthSuccess(res.user);
      } else {
        setAuthError(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setAuthError(err.message || 'Registration failed.');
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
        // Fallback demo client
        const loginRes = await login('rahul.verma@example.com', 'Password@123');
        if (loginRes.success) {
          handleAuthSuccess(loginRes.user);
        } else {
          setAuthError('Demo login unavailable.');
        }
      }
    } catch (err) {
      setAuthError('Failed to switch demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Modal Top Header with Selected Service Context */}
        <div className="bg-[#111827] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2 text-left pr-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CA Protected Filing</span>
            </div>

            {service ? (
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {service.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                  <span className="font-bold text-amber-400">{service.price}</span>
                  {service.period && <span>• {service.period}</span>}
                  <span>• Professional CA Audit</span>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-black text-white">
                  BharatFiling Client Access
                </h3>
                <p className="text-xs text-slate-300">
                  Sign in or create an account to start your filing.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Segmented Control: Sign In vs Create Account */}
        <div className="p-4 sm:p-6 pb-2">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setAuthError('');
              }}
              className={`py-2 rounded-xl transition ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setAuthError('');
              }}
              className={`py-2 rounded-xl transition ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="px-4 sm:px-6 pb-6 overflow-y-auto space-y-4">
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
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="name@business.com or 10-digit mobile"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#111827] focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#111827] focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {loading ? 'Authenticating...' : 'Sign In & Continue Filing'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Create Account Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (as per PAN)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#111827] focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-9 pr-2.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#111827] focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit number"
                      maxLength={10}
                      className="w-full pl-9 pr-2.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#111827] focus:border-transparent transition"
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
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#111827] focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {loading ? 'Creating Profile...' : 'Register & Start Service'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo 1-Click Testing Helper */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-[11px] flex items-center justify-center gap-1.5 transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Instant Test: Continue as Demo Client (Rahul Verma)</span>
            </button>
          </div>

          <p className="text-[10px] text-center text-slate-400">
            Your data is 256-bit encrypted. Certified by Institute of Chartered Accountants of India (ICAI) member CAs.
          </p>
        </div>
      </div>
    </div>
  );
}

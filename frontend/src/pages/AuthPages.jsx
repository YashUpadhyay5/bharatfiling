import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import {
  Lock,
  Mail,
  Phone,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';

export default function AuthPages({ defaultMode = 'login' }) {
  const [mode, setMode] = useState(defaultMode); // 'login' | 'register' | 'forgot-password'

  // Login form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Register form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regStep, setRegStep] = useState(1); // 1: details, 2: OTP
  const [regTxnId, setRegTxnId] = useState('');
  const [regOtp, setRegOtp] = useState('');
  const [regCooldown, setRegCooldown] = useState(0);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [fpStep, setFpStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [fpTxnId, setFpTxnId] = useState('');
  const [fpOtp, setFpOtp] = useState('');
  const [fpResetToken, setFpResetToken] = useState('');
  const [fpNewPassword, setFpNewPassword] = useState('');
  const [fpConfirmPassword, setFpConfirmPassword] = useState('');
  const [fpCooldown, setFpCooldown] = useState(0);
  const [unregisteredAlert, setUnregisteredAlert] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    user,
    isAuthenticated,
    loading: authLoading,
    login,
    requestRegisterOtp,
    verifyRegisterOtp,
    requestForgotPasswordOtp,
    verifyForgotPasswordOtp,
    resetPassword,
    quickSwitchAccount,
  } = useAuth();

  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectParam = new URLSearchParams(location.search).get('redirect');
  const from = redirectParam || location.state?.from?.pathname || '/dashboard';

  // Automatically forward already-authenticated users to their proper portal
  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      if (user.role === 'CA') {
        navigate('/ca/dashboard', { replace: true });
      } else if (user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from || '/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, authLoading, user, from, navigate]);

  // Cooldown timers
  useEffect(() => {
    if (regCooldown <= 0) return;
    const timer = setInterval(() => {
      setRegCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [regCooldown]);

  useEffect(() => {
    if (fpCooldown <= 0) return;
    const timer = setInterval(() => {
      setFpCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [fpCooldown]);

  if (authLoading || (isAuthenticated && user)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-slate-200 border-t-[#111827] rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-500">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  // --- LOGIN SUBMIT ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      showError('Please enter both Email/Phone and Password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(identifier, password);
      if (res.success) {
        showSuccess('Welcome back! Signed in successfully.');
        if (res.user.role === 'CA') navigate('/ca/dashboard');
        else if (res.user.role === 'ADMIN') navigate('/admin');
        else navigate(from);
      }
    } catch (err) {
      showError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER STEP 1: REQUEST OTP ---
  const handleRegisterRequestOtp = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !regPassword) {
      showError('Please fill in all mandatory registration fields.');
      return;
    }

    if (regPassword.length < 6) {
      showError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await requestRegisterOtp({
        full_name: fullName,
        email,
        phone,
        password: regPassword,
      });

      if (res.success) {
        setRegTxnId(res.txn_id);
        setRegStep(2);
        setRegCooldown(res.cooldown_seconds || 60);
        showSuccess(res.message || 'Verification code sent to your email!');
      }
    } catch (err) {
      showError(err.message || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER STEP 2: VERIFY OTP ---
  const handleRegisterVerifyOtp = async (e) => {
    e.preventDefault();
    if (!regOtp || regOtp.trim().length !== 6) {
      showError('Please enter the 6-digit verification code.');
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
        showSuccess('Account verified & created! Welcome to BharatFiling.');
        navigate(from);
      }
    } catch (err) {
      showError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- RESEND REGISTER OTP ---
  const handleResendRegisterOtp = async () => {
    if (regCooldown > 0) return;
    setLoading(true);
    try {
      const res = await requestRegisterOtp({
        full_name: fullName,
        email,
        phone,
        password: regPassword,
      });
      if (res.success) {
        setRegTxnId(res.txn_id);
        setRegCooldown(res.cooldown_seconds || 60);
        showSuccess('New verification code sent to your email!');
      }
    } catch (err) {
      showError(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD STEP 1: REQUEST OTP ---
  const handleForgotRequestOtp = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      showError('Please enter your registered email address.');
      return;
    }

    setUnregisteredAlert(false);
    setLoading(true);
    try {
      const res = await requestForgotPasswordOtp(forgotEmail);
      if (res.success) {
        setFpTxnId(res.txn_id);
        setFpStep(2);
        setFpCooldown(res.cooldown_seconds || 60);
        showSuccess(res.message || 'Recovery code sent!');
      }
    } catch (err) {
      if (err.data?.not_registered || err.status === 404) {
        setUnregisteredAlert(true);
        showError(err.message || 'No BharatFiling account found with this email.');
      } else {
        showError(err.message || 'Failed to request recovery code.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD STEP 2: VERIFY OTP ---
  const handleForgotVerifyOtp = async (e) => {
    e.preventDefault();
    if (!fpOtp || fpOtp.trim().length !== 6) {
      showError('Please enter the 6-digit recovery code.');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyForgotPasswordOtp({
        email: forgotEmail,
        otp: fpOtp.trim(),
        txn_id: fpTxnId,
      });

      if (res.success && res.reset_token) {
        setFpResetToken(res.reset_token);
        setFpStep(3);
        showSuccess('Recovery code verified! Enter your new password.');
      }
    } catch (err) {
      showError(err.message || 'Invalid or expired recovery code.');
    } finally {
      setLoading(false);
    }
  };

  // --- RESEND FORGOT OTP ---
  const handleResendForgotOtp = async () => {
    if (fpCooldown > 0) return;
    setLoading(true);
    try {
      const res = await requestForgotPasswordOtp(forgotEmail);
      if (res.success) {
        setFpTxnId(res.txn_id);
        setFpCooldown(res.cooldown_seconds || 60);
        showSuccess('New recovery code sent to your email!');
      }
    } catch (err) {
      showError(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD STEP 3: RESET PASSWORD ---
  const handleForgotResetPassword = async (e) => {
    e.preventDefault();
    if (!fpNewPassword || !fpConfirmPassword) {
      showError('Please fill both password fields.');
      return;
    }

    if (fpNewPassword.length < 6) {
      showError('Password must be at least 6 characters.');
      return;
    }

    if (fpNewPassword !== fpConfirmPassword) {
      showError('New password and confirm password do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword({
        email: forgotEmail,
        reset_token: fpResetToken,
        new_password: fpNewPassword,
      });

      if (res.success) {
        showSuccess('Password updated successfully! Please sign in with your new password.');
        setIdentifier(forgotEmail);
        setPassword('');
        setMode('login');
        setFpStep(1);
        setFpResetToken('');
      }
    } catch (err) {
      showError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    try {
      await quickSwitchAccount(role);
      showSuccess(`Signed in as ${role} for live preview!`);
      if (role === 'CA') navigate('/ca/dashboard');
      else if (role === 'ADMIN') navigate('/admin');
      else navigate(from);
    } catch (err) {
      showError('Failed to switch demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 text-center space-y-2 border-b border-slate-800">
          <Link to="/" className="inline-flex items-center gap-2">
            <img
              src="/bharatfiling-icon-transparent.png"
              alt="BharatFiling"
              className="h-8 w-auto object-contain bg-white/10 rounded-lg p-0.5"
            />
            <span className="font-extrabold text-lg text-white">
              Bharat<span className="text-[#F26522]">Filing</span>
            </span>
          </Link>

          <h2 className="text-xl font-extrabold">
            {mode === 'login' && 'Sign in to BharatFiling'}
            {mode === 'register' && (regStep === 1 ? 'Create Customer Account' : 'Verify Email Address')}
            {mode === 'forgot-password' &&
              (fpStep === 1
                ? 'Reset Your Password'
                : fpStep === 2
                ? 'Enter Recovery Code'
                : 'Set New Password')}
          </h2>

          <p className="text-xs text-slate-400">
            {mode === 'login' && 'Access your applications, Master Profile & GST certificates'}
            {mode === 'register' &&
              (regStep === 1
                ? 'One Master Profile for all your business compliance needs'
                : `Enter the 6-digit code sent to ${email}`)}
            {mode === 'forgot-password' &&
              (fpStep === 1
                ? 'Enter your registered email to receive a 6-digit recovery OTP'
                : fpStep === 2
                ? `Enter the 6-digit code sent to ${forgotEmail}`
                : 'Choose a strong password with at least 6 characters')}
          </p>

          {/* Mode Switch Tabs (Only when not in forgot password or OTP step) */}
          {mode !== 'forgot-password' && regStep === 1 && (
            <div className="flex bg-slate-800 p-1 rounded-xl mt-4 text-xs font-bold">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  mode === 'login' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMode('register');
                  setRegStep(1);
                }}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  mode === 'register' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* ======================= LOGIN VIEW ======================= */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email or Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    placeholder="Enter email address or mobile number"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot-password');
                      setFpStep(1);
                      setForgotEmail(identifier.includes('@') ? identifier : '');
                    }}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {loading ? 'Signing in...' : 'Sign In & Access Dashboard'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* ======================= REGISTER VIEW: STEP 1 ======================= */}
          {mode === 'register' && regStep === 1 && (
            <form onSubmit={handleRegisterRequestOtp} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    placeholder="Enter your full legal name"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address (Verification OTP sent here)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number (for GST updates & SMS)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Create a password (min. 6 characters)"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {loading ? 'Sending Verification Code...' : 'Continue & Send Email OTP'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* ======================= REGISTER VIEW: STEP 2 (OTP) ======================= */}
          {mode === 'register' && regStep === 2 && (
            <form onSubmit={handleRegisterVerifyOtp} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Check Your Email Inbox
                </div>
                <p className="text-[11px] text-emerald-700">
                  We've sent a 6-digit confirmation code to <span className="font-bold">{email}</span>. Please enter it below.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">6-Digit Verification Code</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    maxLength={6}
                    value={regOtp}
                    onChange={(e) => setRegOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-center text-lg font-mono font-bold tracking-[0.4em]"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || regOtp.length !== 6}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {loading ? 'Verifying...' : 'Verify OTP & Complete Account'}
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                <button
                  type="button"
                  onClick={() => setRegStep(1)}
                  className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" /> Back / Change Email
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

          {/* ======================= FORGOT PASSWORD VIEW ======================= */}
          {mode === 'forgot-password' && (
            <div className="space-y-4 text-xs">
              {/* STEP 1: Enter Email */}
              {fpStep === 1 && (
                <form onSubmit={handleForgotRequestOtp} className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Registered Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        autoComplete="email"
                        placeholder="Enter your registered email address"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  {unregisteredAlert && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                      <div className="font-bold flex items-center gap-1.5 text-xs text-amber-800">
                        <User className="w-4 h-4 text-amber-600" />
                        No Account Found
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        There is no BharatFiling account registered with <span className="font-bold">{forgotEmail}</span>. Would you like to create one?
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail(forgotEmail);
                          setMode('register');
                          setUnregisteredAlert(false);
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition shadow-xs"
                      >
                        Create New Account Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {loading ? 'Sending Recovery Code...' : 'Send Recovery Code'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 mx-auto"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back to Sign In
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Enter 6-digit OTP */}
              {fpStep === 2 && (
                <form onSubmit={handleForgotVerifyOtp} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-xs">
                      <Mail className="w-4 h-4 text-amber-600" />
                      Recovery Code Dispatched
                    </div>
                    <p className="text-[11px] text-amber-800">
                      If an account exists for <span className="font-bold">{forgotEmail}</span>, a 6-digit recovery OTP has been sent.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">6-Digit Recovery Code</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        maxLength={6}
                        value={fpOtp}
                        onChange={(e) => setFpOtp(e.target.value.replace(/\D/g, ''))}
                        autoComplete="one-time-code"
                        placeholder="123456"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-center text-lg font-mono font-bold tracking-[0.4em]"
                        autoFocus
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || fpOtp.length !== 6}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {loading ? 'Verifying...' : 'Verify Code & Continue'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setFpStep(1)}
                      className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>

                    <button
                      type="button"
                      disabled={fpCooldown > 0 || loading}
                      onClick={handleResendForgotOtp}
                      className={`font-bold flex items-center gap-1 ${
                        fpCooldown > 0
                          ? 'text-slate-400 cursor-not-allowed'
                          : 'text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer'
                      }`}
                    >
                      <RotateCcw className="w-3 h-3" />
                      {fpCooldown > 0 ? `Resend in ${fpCooldown}s` : 'Resend Code'}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Enter New Password */}
              {fpStep === 3 && (
                <form onSubmit={handleForgotResetPassword} className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        value={fpNewPassword}
                        onChange={(e) => setFpNewPassword(e.target.value)}
                        autoComplete="new-password"
                        placeholder="Enter new password (min. 6 characters)"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        value={fpConfirmPassword}
                        onChange={(e) => setFpConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        placeholder="Re-enter new password"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {loading ? 'Updating Password...' : 'Save New Password & Sign In'}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Quick Demo Test Logins */}
          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Quick 1-Click Demo Accounts
            </span>
            <p className="text-[10px] text-slate-400 mb-3">
              Standard Password: <span className="font-mono font-semibold text-emerald-600">Test@123</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('CUSTOMER')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-200 text-[11px] font-bold transition text-center shadow-xs cursor-pointer"
              >
                <div>👤 Customer</div>
                <div className="text-[9px] font-normal text-slate-500 truncate mt-0.5">customer@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('CA')}
                className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-bold transition text-center shadow-xs cursor-pointer"
              >
                <div>⚖️ CA Desk</div>
                <div className="text-[9px] font-normal text-amber-700 truncate mt-0.5">ca.sharma@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('ADMIN')}
                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-bold transition text-center shadow-xs cursor-pointer"
              >
                <div>🛡️ Admin</div>
                <div className="text-[9px] font-normal text-blue-700 truncate mt-0.5">admin@...</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

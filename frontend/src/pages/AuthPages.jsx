import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { sendPhoneOtp } from '../config/firebase.js';
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
  Smartphone,
  MessageSquare,
} from 'lucide-react';

export default function AuthPages({ defaultMode = 'login' }) {
  const [mode, setMode] = useState(defaultMode); // 'login' | 'register' | 'forgot-password'

  // Login form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [phoneLoginActive, setPhoneLoginActive] = useState(false);
  const [phoneLoginStep, setPhoneLoginStep] = useState(1); // 1: phone, 2: OTP
  const [phoneLoginMobile, setPhoneLoginMobile] = useState('');
  const [phoneLoginOtp, setPhoneLoginOtp] = useState('');
  const [phoneLoginConfirmation, setPhoneLoginConfirmation] = useState(null);
  const [phoneLoginCooldown, setPhoneLoginCooldown] = useState(0);

  // Register form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regStep, setRegStep] = useState(1); // 1: details, 2: OTP
  const [regMethod, setRegMethod] = useState('phone'); // 'phone' | 'email'
  const [regTxnId, setRegTxnId] = useState('');
  const [regOtp, setRegOtp] = useState('');
  const [regCooldown, setRegCooldown] = useState(0);
  const [phoneConfirmationResult, setPhoneConfirmationResult] = useState(null);

  // Forgot password state
  const [fpMethod, setFpMethod] = useState('phone'); // 'phone' | 'email'
  const [forgotPhone, setForgotPhone] = useState('7668976193');
  const [fpPhoneConfirmation, setFpPhoneConfirmation] = useState(null);
  const [forgotEmail, setForgotEmail] = useState('');
  const [fpStep, setFpStep] = useState(1); // 1: email/phone, 2: OTP/reset
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
    registerWithPhone,
    loginWithPhone,
    requestRegisterOtp,
    verifyRegisterOtp,
    requestForgotPasswordOtp,
    verifyForgotPasswordOtp,
    resetPassword,
    resetPasswordWithPhone,
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

  useEffect(() => {
    if (phoneLoginCooldown <= 0) return;
    const timer = setInterval(() => {
      setPhoneLoginCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [phoneLoginCooldown]);

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

  // --- PHONE LOGIN: REQUEST SMS OTP ---
  const handlePhoneLoginRequestOtp = async (e) => {
    e.preventDefault();
    const cleanDigits = phoneLoginMobile.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      showError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const confirmation = await sendPhoneOtp(phoneLoginMobile, 'recaptcha-container');
      setPhoneLoginConfirmation(confirmation);
      setPhoneLoginStep(2);
      setPhoneLoginCooldown(60);
      showSuccess(`SMS OTP sent to +91 ${cleanDigits.slice(-10)} via Firebase!`);
    } catch (err) {
      console.error('Phone login OTP error:', err);
      showError(err.message || 'Failed to dispatch SMS OTP. Please try password login.');
    } finally {
      setLoading(false);
    }
  };

  // --- PHONE LOGIN: VERIFY SMS OTP ---
  const handlePhoneLoginVerifyOtp = async (e) => {
    e.preventDefault();
    if (!phoneLoginOtp || phoneLoginOtp.trim().length !== 6) {
      showError('Please enter the 6-digit code received on your phone.');
      return;
    }

    setLoading(true);
    try {
      if (!phoneLoginConfirmation) {
        throw new Error('Verification session expired. Please request a new OTP.');
      }
      const userCredential = await phoneLoginConfirmation.confirm(phoneLoginOtp.trim());
      const idToken = await userCredential.user.getIdToken();
      const res = await loginWithPhone(idToken);
      if (res.success) {
        showSuccess('Mobile login successful! Welcome back.');
        if (res.user.role === 'CA') navigate('/ca/dashboard');
        else if (res.user.role === 'ADMIN') navigate('/admin');
        else navigate(from);
      }
    } catch (err) {
      console.error('Phone login verify error:', err);
      if (err.data?.not_registered || err.status === 404) {
        setPhone(phoneLoginMobile);
        setMode('register');
        setRegStep(1);
        showError(err.message || 'Mobile number not registered. Please create an account.');
      } else {
        showError(err.message || 'Failed to sign in with SMS OTP.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Optional phone handler fallback
  const handleRegisterSendPhoneOtp = async (e) => {
    setRegMethod('phone');
    return handleRegisterRequestOtp(e);
  };


  // --- REGISTER STEP 1: REQUEST OTP (PHONE OR EMAIL) ---
  const handleRegisterRequestOtp = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!fullName || !fullName.trim()) {
      showError('Please enter your full legal name.');
      return;
    }

    if (!regPassword || regPassword.length < 8) {
      showError('Password must be at least 8 characters.');
      return;
    }

    if (regMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.trim())) {
        showError('Please enter a valid email address (e.g. name@example.com).');
        return;
      }
    } else {
      const cleanPhone = phone ? phone.replace(/\D/g, '') : '';
      if (cleanPhone.length < 10) {
        showError('Please enter a valid 10-digit Indian mobile number.');
        return;
      }
    }

    setLoading(true);
    try {
      const res = await requestRegisterOtp({
        full_name: fullName.trim(),
        email: regMethod === 'email' ? email.trim() : undefined,
        phone: regMethod === 'phone' ? phone.trim() : undefined,
        password: regPassword,
        method: regMethod,
      });

      if (res.success) {
        setRegTxnId(res.txn_id);
        setRegStep(2);
        setRegCooldown(res.cooldown_seconds || 60);
        showSuccess(res.message || (regMethod === 'email' ? 'Verification code sent to your email!' : 'SMS verification code sent to your mobile phone!'));
      }
    } catch (err) {
      console.error('Registration OTP dispatch error:', err);
      showError(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER STEP 2: VERIFY OTP (PHONE OR EMAIL) ---
  const handleRegisterVerifyOtp = async (e) => {
    e.preventDefault();
    if (!regOtp || regOtp.trim().length !== 6) {
      showError('Please enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      if (regMethod === 'phone' && phoneConfirmationResult) {
        const userCredential = await phoneConfirmationResult.confirm(regOtp.trim());
        const idToken = await userCredential.user.getIdToken();
        const res = await registerWithPhone({
          id_token: idToken,
          full_name: fullName,
          email: email || undefined,
          password: regPassword,
          phone,
        });

        if (res.success) {
          showSuccess('Mobile verified & account created! Welcome to BharatFiling.');
          navigate(from || '/dashboard');
        }
      } else {
        const res = await verifyRegisterOtp({
          email: regMethod === 'email' ? email.trim() : undefined,
          phone: regMethod === 'phone' ? phone.trim() : undefined,
          identifier: regMethod === 'email' ? email.trim() : phone.trim(),
          otp: regOtp.trim(),
          txn_id: regTxnId,
        });

        if (res.success) {
          showSuccess('Account verified & created! Welcome to BharatFiling.');
          navigate(from || '/dashboard');
        }
      }
    } catch (err) {
      console.error('OTP Verification error:', err);
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
      if (regMethod === 'phone' && phoneConfirmationResult) {
        const confirmation = await sendPhoneOtp(phone, 'recaptcha-container');
        setPhoneConfirmationResult(confirmation);
        setRegCooldown(60);
        showSuccess('New SMS OTP dispatched to your mobile number!');
      } else {
        const res = await requestRegisterOtp({
          full_name: fullName.trim(),
          email: regMethod === 'email' ? email.trim() : undefined,
          phone: regMethod === 'phone' ? phone.trim() : undefined,
          password: regPassword,
          method: regMethod,
        });
        if (res.success) {
          setRegTxnId(res.txn_id);
          setRegCooldown(res.cooldown_seconds || 60);
          showSuccess(res.message || (regMethod === 'email' ? 'New verification code sent to your email!' : 'New verification code sent to your mobile phone!'));
        }
      }
    } catch (err) {
      showError(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD (PHONE): REQUEST SMS OTP ---
  const handleForgotPhoneRequestOtp = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanDigits = forgotPhone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      showError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setUnregisteredAlert(false);
    setLoading(true);
    try {
      const confirmation = await sendPhoneOtp(forgotPhone, 'recaptcha-container');
      setFpPhoneConfirmation(confirmation);
      setFpMethod('phone');
      setFpStep(2);
      setFpCooldown(60);
      showSuccess(`Random 6-digit SMS OTP sent to +91 ${cleanDigits.slice(-10)} via Firebase!`);
    } catch (err) {
      console.error('Firebase Forgot Phone OTP Error:', err);
      showError(err.message || 'Failed to dispatch recovery SMS. Please try Email recovery.');
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD (PHONE): VERIFY OTP & RESET PASSWORD ---
  const handleForgotPhoneResetPassword = async (e) => {
    e.preventDefault();
    if (!fpOtp || fpOtp.trim().length !== 6) {
      showError('Please enter the 6-digit recovery code received via SMS.');
      return;
    }

    if (!fpNewPassword || !fpConfirmPassword) {
      showError('Please fill both new password fields.');
      return;
    }

    if (fpNewPassword.length < 8) {
      showError('Password must be at least 8 characters.');
      return;
    }

    if (fpNewPassword !== fpConfirmPassword) {
      showError('New password and confirm password do not match.');
      return;
    }

    setLoading(true);
    try {
      if (!fpPhoneConfirmation) {
        throw new Error('Recovery session expired. Please request a new code.');
      }
      const userCredential = await fpPhoneConfirmation.confirm(fpOtp.trim());
      const idToken = await userCredential.user.getIdToken();
      const res = await resetPasswordWithPhone({
        id_token: idToken,
        phone: forgotPhone,
        new_password: fpNewPassword,
      });

      if (res.success) {
        showSuccess('Password updated successfully! Welcome back to BharatFiling.');
        setFpStep(1);
        setFpOtp('');
        setFpNewPassword('');
        setFpConfirmPassword('');
        if (res.user?.role === 'CA') {
          navigate('/ca/dashboard', { replace: true });
        } else if (res.user?.role === 'ADMIN') {
          navigate('/admin', { replace: true });
        } else {
          navigate(from || '/dashboard', { replace: true });
        }
      }
    } catch (err) {
      console.error('Phone reset password error:', err);
      if (err.data?.not_registered || err.status === 404) {
        setPhone(forgotPhone);
        setMode('register');
        setRegStep(1);
        showError(err.message || 'Mobile number not registered. Please create an account.');
      } else {
        showError(err.message || 'Failed to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD (EMAIL) STEP 1: REQUEST OTP ---
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
        setFpMethod('email');
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

  // --- FORGOT PASSWORD (EMAIL) STEP 2: VERIFY OTP ---
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
      if (fpMethod === 'phone') {
        const confirmation = await sendPhoneOtp(forgotPhone, 'recaptcha-container');
        setFpPhoneConfirmation(confirmation);
        setFpCooldown(60);
        showSuccess('New 6-digit recovery code sent to your mobile phone!');
      } else {
        const res = await requestForgotPasswordOtp(forgotEmail);
        if (res.success) {
          setFpTxnId(res.txn_id);
          setFpCooldown(res.cooldown_seconds || 60);
          showSuccess('New recovery code sent to your email!');
        }
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

    if (fpNewPassword.length < 8) {
      showError('Password must be at least 8 characters.');
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
        showSuccess('Password updated successfully! Welcome back to BharatFiling.');
        setFpStep(1);
        setFpResetToken('');
        setFpOtp('');
        setFpNewPassword('');
        setFpConfirmPassword('');
        if (res.user?.role === 'CA') {
          navigate('/ca/dashboard', { replace: true });
        } else if (res.user?.role === 'ADMIN') {
          navigate('/admin', { replace: true });
        } else {
          navigate(from || '/dashboard', { replace: true });
        }
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-3 sm:p-4 py-6 sm:py-12">
      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 text-center space-y-2 border-b border-slate-800">
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
            {mode === 'login' && (phoneLoginActive ? 'Sign in with Mobile OTP' : 'Sign in to BharatFiling')}
            {mode === 'register' &&
              (regStep === 1
                ? 'Create Customer Account'
                : regMethod === 'phone'
                ? 'Verify Mobile Number'
                : 'Verify Email Address')}
            {mode === 'forgot-password' &&
              (fpStep === 1
                ? 'Reset Your Password'
                : fpStep === 2
                ? 'Enter Recovery Code'
                : 'Set New Password')}
          </h2>

          <p className="text-xs text-slate-400">
            {mode === 'login' &&
              (phoneLoginActive
                ? 'Instant passwordless login via 6-digit SMS OTP'
                : 'Access your applications, Master Profile & GST certificates')}
            {mode === 'register' &&
              (regStep === 1
                ? 'One Master Profile for all your business compliance needs'
                : regMethod === 'phone'
                ? `Enter the 6-digit SMS code sent to +91 ${phone.replace(/\D/g, '').slice(-10)}`
                : `Enter the 6-digit code sent to ${email}`)}
            {mode === 'forgot-password' &&
              (fpStep === 1
                ? fpMethod === 'phone'
                  ? 'Enter your mobile number to receive a 6-digit recovery SMS'
                  : 'Enter your registered email to receive a 6-digit recovery OTP'
                : fpStep === 2
                ? fpMethod === 'phone'
                  ? `Enter the 6-digit SMS code sent to +91 ${forgotPhone.replace(/\D/g, '').slice(-10)}`
                  : `Enter the 6-digit code sent to ${forgotEmail}`
                : 'Choose a strong password with at least 8 characters')}
          </p>

          {/* Mode Switch Tabs (Only when not in forgot password or OTP step) */}
          {mode !== 'forgot-password' && regStep === 1 && (
            <div className="flex bg-slate-800 p-1 rounded-xl mt-4 text-xs font-bold">
              <button
                onClick={() => {
                  setMode('login');
                  setPhoneLoginActive(false);
                }}
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
                  setPhoneLoginActive(false);
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
        <div className="p-4 sm:p-6">
          {/* ======================= LOGIN VIEW: PASSWORD ======================= */}
          {mode === 'login' && !phoneLoginActive && (
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

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setPhoneLoginActive(true);
                    setPhoneLoginStep(1);
                    setPhoneLoginMobile(identifier.replace(/\D/g, '').length >= 10 ? identifier : '');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-600 transition cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  Sign in with Mobile SMS OTP instead
                </button>
              </div>
            </form>
          )}

          {/* ======================= LOGIN VIEW: PHONE OTP ======================= */}
          {mode === 'login' && phoneLoginActive && (
            <div className="space-y-4 text-xs">
              {phoneLoginStep === 1 && (
                <form onSubmit={handlePhoneLoginRequestOtp} className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Indian Mobile Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phoneLoginMobile}
                        onChange={(e) => setPhoneLoginMobile(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                        required
                        autoFocus
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      A 6-digit SMS OTP will be sent to your mobile phone via Google Firebase.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {loading ? 'Sending SMS OTP...' : 'Send SMS OTP'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setPhoneLoginActive(false)}
                      className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 mx-auto text-xs cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back to Password Sign In
                    </button>
                  </div>
                </form>
              )}

              {phoneLoginStep === 2 && (
                <form onSubmit={handlePhoneLoginVerifyOtp} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      SMS OTP Sent
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      Enter the 6-digit code sent to <span className="font-bold">+91 {phoneLoginMobile.slice(-10)}</span>.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">6-Digit SMS Code</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={phoneLoginOtp}
                        onChange={(e) => setPhoneLoginOtp(e.target.value.replace(/\D/g, ''))}
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
                    disabled={loading || phoneLoginOtp.length !== 6}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {loading ? 'Verifying OTP...' : 'Verify & Sign In'}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setPhoneLoginStep(1)}
                      className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" /> Change Number
                    </button>

                    <button
                      type="button"
                      disabled={phoneLoginCooldown > 0 || loading}
                      onClick={handlePhoneLoginRequestOtp}
                      className={`font-bold flex items-center gap-1 ${
                        phoneLoginCooldown > 0
                          ? 'text-slate-400 cursor-not-allowed'
                          : 'text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer'
                      }`}
                    >
                      <RotateCcw className="w-3 h-3" />
                      {phoneLoginCooldown > 0 ? `Resend in ${phoneLoginCooldown}s` : 'Resend Code'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ======================= REGISTER VIEW: STEP 1 ======================= */}
          {mode === 'register' && regStep === 1 && (
            <form onSubmit={handleRegisterRequestOtp} className="space-y-3.5 text-xs">
              {/* Method Selector Tabs: Phone Number vs Email / Gmail */}
              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
                <button
                  type="button"
                  onClick={() => setRegMethod('phone')}
                  className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    regMethod === 'phone'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Mobile Number
                </button>
                <button
                  type="button"
                  onClick={() => setRegMethod('email')}
                  className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    regMethod === 'email'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email / Gmail
                </button>
              </div>

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

              {regMethod === 'phone' ? (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number (Verification OTP sent here)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder="Enter 10-digit mobile number"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      required
                      autoFocus
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    No email required. You can log into your account anytime with this mobile number & password.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email / Gmail Address (Verification OTP sent here)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="Enter your email or gmail address"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      required
                      autoFocus
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    No mobile required. You can log into your account anytime with this email & password.
                  </p>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Create a password (min. 8 characters)"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {regMethod === 'phone' ? (
                    <>
                      <Smartphone className="w-4 h-4 text-emerald-200" />
                      {loading ? 'Sending SMS OTP...' : 'Verify Mobile & Send Code'}
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 text-emerald-200" />
                      {loading ? 'Sending Email OTP...' : 'Verify Email & Send Code'}
                    </>
                  )}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* ======================= REGISTER VIEW: STEP 2 (OTP) ======================= */}
          {mode === 'register' && regStep === 2 && (
            <form onSubmit={handleRegisterVerifyOtp} className="space-y-4 text-xs">
              {regMethod === 'phone' ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    SMS Verification Code Dispatched
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    We've sent a 6-digit SMS verification code to <span className="font-bold">+91 {phone.replace(/\D/g, '').slice(-10)}</span>.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    Check Your Email / Gmail Inbox
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    We've sent a 6-digit confirmation code to <span className="font-bold">{email}</span>. Please enter it below.
                  </p>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">6-Digit Verification Code</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
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
                  className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" /> Back / Edit Details
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
                  {regCooldown > 0 ? `Resend in ${regCooldown}s` : 'Resend Code'}
                </button>
              </div>
            </form>
          )}

          {/* ======================= FORGOT PASSWORD VIEW ======================= */}
          {mode === 'forgot-password' && (
            <div className="space-y-4 text-xs">
              {/* STEP 1: Phone or Email Recovery Selector */}
              {fpStep === 1 && (
                <div className="space-y-4">
                  {/* Selector Tabs: Mobile SMS vs Email */}
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
                    <button
                      type="button"
                      onClick={() => {
                        setFpMethod('phone');
                        setUnregisteredAlert(false);
                      }}
                      className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        fpMethod === 'phone'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      Via Mobile SMS OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFpMethod('email');
                        setUnregisteredAlert(false);
                      }}
                      className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        fpMethod === 'email'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Via Email OTP
                    </button>
                  </div>

                  {fpMethod === 'phone' ? (
                    <form onSubmit={handleForgotPhoneRequestOtp} className="space-y-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Registered Mobile Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={forgotPhone}
                            onChange={(e) => setForgotPhone(e.target.value)}
                            placeholder="10-digit mobile number"
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                            required
                            autoFocus
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">
                          A random 6-digit SMS recovery code will be dispatched to this number via Google Firebase.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {loading ? 'Sending Recovery SMS...' : 'Send SMS Recovery Code'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="text-center pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setMode('login')}
                          className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 mx-auto cursor-pointer"
                        >
                          <ArrowLeft className="w-3 h-3" /> Back to Sign In
                        </button>
                      </div>
                    </form>
                  ) : (
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
                          className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 mx-auto cursor-pointer"
                        >
                          <ArrowLeft className="w-3 h-3" /> Back to Sign In
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* STEP 2: Phone OTP + New Password OR Email OTP */}
              {fpStep === 2 && (
                fpMethod === 'phone' ? (
                  <form onSubmit={handleForgotPhoneResetPassword} className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        SMS Recovery Code Dispatched
                      </div>
                      <p className="text-[11px] text-emerald-700">
                        Enter the random 6-digit SMS OTP sent to <span className="font-bold">+91 {forgotPhone.replace(/\D/g, '').slice(-10)}</span> via Firebase.
                      </p>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">6-Digit SMS Recovery Code</label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
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

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">New Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="password"
                          value={fpNewPassword}
                          onChange={(e) => setFpNewPassword(e.target.value)}
                          placeholder="Enter new password (min. 8 characters)"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                          required
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
                          placeholder="Re-enter new password"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || fpOtp.length !== 6}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {loading ? 'Verifying & Updating...' : 'Verify SMS OTP & Set New Password'}
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setFpStep(1)}
                        className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <ArrowLeft className="w-3 h-3" /> Change Number
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
                ) : (
                  <form onSubmit={handleForgotVerifyOtp} className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        Recovery Code Dispatched
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        A 6-digit recovery OTP has been sent to <span className="font-bold">{forgotEmail}</span>. Please check your inbox and spam folder.
                      </p>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">6-Digit Recovery Code</label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
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
                        className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer"
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
                )
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
                        placeholder="Enter new password (min. 8 characters)"
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

          {/* Quick Demo Test Logins (local development builds only - never shipped to production) */}
          {import.meta.env.DEV && (
          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Quick 1-Click Demo Accounts
            </span>
            <p className="text-[10px] text-slate-400 mb-3">
              Local seed accounts only
            </p>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('CUSTOMER')}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-200 text-[10px] sm:text-[11px] font-bold transition text-center shadow-xs cursor-pointer"
              >
                <div>Customer</div>
                <div className="text-[9px] font-normal text-slate-500 truncate mt-0.5">customer@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('CA')}
                className="p-2 sm:p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[10px] sm:text-[11px] font-bold transition text-center shadow-xs cursor-pointer"
              >
                <div>CA Desk</div>
                <div className="text-[9px] font-normal text-amber-700 truncate mt-0.5">ca.sharma@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('ADMIN')}
                className="p-2 sm:p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[10px] sm:text-[11px] font-bold transition text-center shadow-xs cursor-pointer"
              >
                <div>Admin</div>
                <div className="text-[9px] font-normal text-blue-700 truncate mt-0.5">admin@...</div>
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
      {/* Invisible Google reCAPTCHA container for Firebase Phone SMS OTP */}
      <div id="recaptcha-container"></div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { Lock, Mail, Phone, User, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AuthPages({ defaultMode = 'login' }) {
  const [mode, setMode] = useState(defaultMode); // 'login' or 'register'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, quickSwitchAccount } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectParam = new URLSearchParams(location.search).get('redirect');
  const from = redirectParam || location.state?.from?.pathname || '/dashboard';

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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password) {
      showError('Please fill in all mandatory registration fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        full_name: fullName,
        email,
        phone,
        password,
      });

      if (res.success) {
        showSuccess('Account created! Your Master Profile is initialized.');
        navigate(from);
      }
    } catch (err) {
      showError(err.message || 'Registration failed.');
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
            {mode === 'login' ? 'Sign in to BharatFiling' : 'Create Customer Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login'
              ? 'Access your applications, Master Profile & GST certificates'
              : 'One Master Profile for all your business compliance needs'}
          </p>

          {/* Mode Switch Tabs */}
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
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 rounded-lg transition ${
                mode === 'register' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email or Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. customer@bharatfiling.com or 9876501234"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••••••••• (e.g. Test@123)"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {loading ? 'Signing in...' : 'Sign In & Access Dashboard'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name as printed on PAN card"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="official@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number (for OTP & GST updates)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {loading ? 'Creating Account...' : 'Register & Start Master Profile'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
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
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-200 text-[11px] font-bold transition text-center shadow-xs"
              >
                <div>👤 Customer</div>
                <div className="text-[9px] font-normal text-slate-500 truncate mt-0.5">customer@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('CA')}
                className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-bold transition text-center shadow-xs"
              >
                <div>⚖️ CA Desk</div>
                <div className="text-[9px] font-normal text-amber-700 truncate mt-0.5">ca.sharma@...</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('ADMIN')}
                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-bold transition text-center shadow-xs"
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

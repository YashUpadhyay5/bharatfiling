import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { ShieldCheck, UserCheck, Sparkles, X, ChevronUp, ChevronDown } from 'lucide-react';

export default function DemoSwitcher() {
  const { user, isAuthenticated, quickSwitchAccount } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50 print:hidden font-sans">
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg border border-slate-700 flex items-center gap-1.5 hover:bg-slate-800 transition"
          title="Open Demo Role Switcher"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Demo Switcher
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      ) : (
        <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-800 p-2.5 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 pl-1.5 pr-1 border-r border-slate-700/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-bold text-slate-300">Demo Role:</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => quickSwitchAccount('CUSTOMER')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                user?.role === 'CUSTOMER'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => quickSwitchAccount('CA')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                user?.role === 'CA'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              CA
            </button>
            <button
              onClick={() => quickSwitchAccount('ADMIN')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                user?.role === 'ADMIN'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Admin
            </button>
          </div>

          <button
            onClick={() => setCollapsed(true)}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition ml-1"
            title="Minimize"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

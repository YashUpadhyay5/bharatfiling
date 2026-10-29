import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Printer } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * The confirmation shown after a successful payment.
 *
 *  intro      - the sentence under the heading
 *  rows       - [label, value] pairs of the order
 *  nextSteps  - what happens next, one item per step
 */
export default function Receipt({ intro, rows, nextSteps, applicationNumber, email }) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-9">
        <div className="text-center pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Check className="w-8 h-8 stroke-[3]" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
          <p className="text-sm text-slate-500 mt-1">{intro}</p>
        </div>

        <dl className="py-6 space-y-4 text-sm border-b border-slate-100">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-slate-500">{k}:</dt>
              <dd className="font-semibold text-slate-800 text-right">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="bg-blue-50/50 rounded-xl p-5 my-5 border border-blue-100">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800">What happens next</h2>
          <ol className="mt-3 space-y-2 text-sm text-slate-700 list-decimal list-inside">
            {nextSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {!isAuthenticated && (
            <p className="mt-3 text-xs text-slate-500">
              Log in or sign up with <strong>{email}</strong> to see this order on your dashboard.
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>Print Receipt</span>
          </button>
          <Link
            to={`/dashboard?app=${applicationNumber}`}
            className="inline-flex items-center gap-1.5 bg-[#002B49] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#001D38]"
          >
            Track on Dashboard &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

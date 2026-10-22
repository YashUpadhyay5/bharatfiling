import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CATEGORIES, SERVICES, formatFee, servicePath, servicesInCategory } from '../../data/serviceCatalog.js';

/** Every service with its price, filterable by category and search. Reads the shared catalogue. */
export default function CatalogBrowser({ heading = 'All services and prices', id }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const base = category === 'all' ? SERVICES : servicesInCategory(category);
    const q = query.trim().toLowerCase();
    return q ? base.filter((svc) => svc.name.toLowerCase().includes(q)) : base;
  }, [category, query]);

  const tab = (key, label) => (
    <button
      key={key}
      type="button"
      onClick={() => setCategory(key)}
      aria-pressed={category === key}
      className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
        category === key ? 'bg-[#111827] text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id={id} aria-label={heading} className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0F172A]">{heading}</h2>
          <p className="text-xs text-slate-500 mt-1">
            {SERVICES.length} services. Professional fee shown before 18% GST and government fees.
          </p>
        </div>
        <label className="relative block w-full sm:w-64">
          <span className="sr-only">Search services</span>
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services"
            className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#111827]"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {tab('all', 'All')}
        {CATEGORIES.map((c) => tab(c.key, c.label))}
      </div>

      <ul className="rounded-2xl border border-slate-200/80 bg-white divide-y divide-slate-100 overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        {rows.map((svc) => (
          <li key={svc.slug}>
            <Link
              to={servicePath(svc)}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_180px_110px] items-center gap-x-4 px-4 py-3 text-sm hover:bg-slate-50"
            >
              <span className="font-medium text-[#0F172A]">
                {svc.name}
                {svc.status === 'live' && (
                  <span className="ml-2 rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 align-middle">Live</span>
                )}
              </span>
              <span className="hidden sm:block text-xs text-slate-500">{svc.tat}</span>
              <span className="text-right text-[13px] font-semibold tabular-nums text-[#0F172A]">
                {formatFee(svc)}
                <span className="block text-[10px] font-normal text-slate-400">{svc.fee === 0 ? '' : svc.unit}</span>
              </span>
            </Link>
          </li>
        ))}
        {rows.length === 0 && <li className="px-4 py-6 text-center text-xs text-slate-500">No service matches your search.</li>}
      </ul>
    </section>
  );
}

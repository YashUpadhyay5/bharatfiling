import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="bg-slate-50/80 border-b border-slate-200/60 py-2.5 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
        <Link
          to="/"
          className="flex items-center gap-1 font-semibold text-slate-700 hover:text-[#0B1E36] transition-colors"
          title="Return to BharatFiling Home"
        >
          <Home className="w-3.5 h-3.5 text-slate-400" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={item.label || idx}>
              <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
              {isLast || !item.path ? (
                <span className="font-bold text-[#0B1E36] truncate">{item.label}</span>
              ) : (
                <Link
                  to={item.path}
                  className="text-slate-600 hover:text-[#0B1E36] transition-colors truncate"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

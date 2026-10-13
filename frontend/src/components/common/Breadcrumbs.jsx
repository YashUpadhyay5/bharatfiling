import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="bg-[#F8F9FB] border-b border-[#E5E7EB] py-2.5 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-[#667085]">
        <Link
          to="/"
          className="flex items-center gap-1 font-medium text-[#667085] hover:text-[#155EEF] transition-colors"
          title="Return to BharatFiling Home"
        >
          <Home className="w-3.5 h-3.5 text-[#667085]" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={item.label || idx}>
              <ChevronRight className="w-3 h-3 text-[#98A2B3] shrink-0" />
              {isLast || !item.path ? (
                <span className="font-semibold text-[#252B36] truncate">{item.label}</span>
              ) : (
                <Link
                  to={item.path}
                  className="font-medium text-[#667085] hover:text-[#155EEF] transition-colors truncate"
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

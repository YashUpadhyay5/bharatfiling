import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';

export default function SearchableSelect({
  label,
  required = false,
  value = '',
  onChange,
  options = [],
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  disabled = false,
  emptyMessage = 'No matching options found',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listRef = useRef(null);

  // Filter options based on search query (case-insensitive multi-term matching)
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase().trim();
    const queryParts = q.split(/\s+/);
    return options.filter((opt) => {
      const optStr = typeof opt === 'string' ? opt : (opt.label || opt.name || '');
      const lower = optStr.toLowerCase();
      return queryParts.every((part) => lower.includes(part));
    });
  }, [options, searchQuery]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.children[highlightedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        if (!disabled) setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0 && highlightedIndex < filteredOptions.length) {
        handleSelect(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handleSelect = (option) => {
    const selectedVal = typeof option === 'string' ? option : (option.value || option.id || option.label);
    onChange(selectedVal);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Helper to highlight matched query in option label
  const renderHighlightedText = (text, query) => {
    if (!query.trim()) return text;
    const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.trim().toLowerCase() ? (
        <span key={i} className="text-blue-600 bg-blue-50 font-extrabold rounded-xs px-0.5">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} className={`relative space-y-1 ${className}`}>
      {/* Trigger Button styled identical to native floating-label fields */}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full px-4 pt-5 pb-2 text-left text-xs sm:text-sm font-semibold rounded-xl border transition flex items-center justify-between cursor-pointer pr-10 ${
            disabled
              ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
              : isOpen
              ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 text-slate-900 shadow-xs'
              : 'bg-white border-slate-300 hover:border-slate-400 text-slate-900'
          }`}
        >
          <span className={`block truncate ${!value ? 'text-slate-400 font-normal' : 'text-slate-900 font-semibold'}`}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 absolute right-3.5 top-4 transition-transform duration-200 pointer-events-none ${
              isOpen ? 'rotate-180 text-blue-600' : ''
            }`}
          />
        </button>

        {label && (
          <label className="absolute left-4 top-1.5 text-[11px] font-semibold text-blue-600 pointer-events-none tracking-tight">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
      </div>

      {/* Dropdown Popover */}
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-2xl shadow-[0_16px_40px_rgba(15,23,42,0.16)] border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-72">
          {/* Integrated Search Bar with auto-focus */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder || 'Search...'}
              className="w-full text-xs font-semibold bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  if (searchInputRef.current) searchInputRef.current.focus();
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition cursor-pointer"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Options Count Badge */}
          {searchQuery && (
            <div className="px-3 py-1 bg-blue-50/50 border-b border-blue-100 text-[10px] font-semibold text-blue-700 flex items-center justify-between">
              <span>Matching results</span>
              <span className="font-bold">{filteredOptions.length} found</span>
            </div>
          )}

          {/* Scrollable Filtered List */}
          <ul
            ref={listRef}
            role="listbox"
            className="overflow-y-auto max-h-56 divide-y divide-slate-100/60 p-1 space-y-0.5"
          >
            {filteredOptions.length === 0 ? (
              <li className="p-4 text-center text-xs text-slate-400 space-y-1">
                <div className="font-medium text-slate-600">{emptyMessage}</div>
                <div className="text-[11px] text-slate-400">
                  Try typing a different keyword or part of the code
                </div>
              </li>
            ) : (
              filteredOptions.map((opt, idx) => {
                const optStr = typeof opt === 'string' ? opt : (opt.label || opt.name || '');
                const isSelected = value === optStr;
                const isHighlighted = idx === highlightedIndex;

                return (
                  <li
                    key={optStr + idx}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-blue-50 text-blue-900 font-bold'
                        : isHighlighted
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="break-words leading-relaxed flex-1">
                      {renderHighlightedText(optStr, searchQuery)}
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

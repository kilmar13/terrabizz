import React, { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface QuickGlobalFinderProps {
  onClose: () => void;
}

export default function QuickGlobalFinder({ onClose }: QuickGlobalFinderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the modal opens
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Input Area */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search size={22} className="text-slate-400 shrink-0" strokeWidth={2} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products by name/SKU, customers, orders..."
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-base font-medium text-slate-800 placeholder-slate-400 ml-3"
          />
          <div className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0 hidden sm:block">
            ESC
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4">
            <Search size={20} className="text-slate-300" strokeWidth={2.5} />
          </div>
          <h3 className="text-[13px] font-bold text-slate-800 tracking-tight">Quick Global Finder</h3>
          <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
            Search across all inventory products, storefront orders, and registered business customers instantly.
          </p>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
          <span>Tip: Click any result to view details or navigate directly.</span>
          <span>Press ESC to close</span>
        </div>
      </div>
      
      {/* Click outside to close overlay */}
      <div className="absolute inset-0 z-[-1]" onClick={onClose} />
    </div>
  );
}

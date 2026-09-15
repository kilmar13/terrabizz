import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  searchPlaceholder?: string;
  emptyState?: React.ReactNode;
  children?: React.ReactNode;
}

export default function GenericDataPage({ title, subtitle, actions, searchPlaceholder, emptyState, children }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs font-bold text-slate-400 mt-1 tracking-wider uppercase">{subtitle}</p>}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {actions}
        </div>
      </div>
      
      {/* Search and Table Area */}
      <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {searchPlaceholder && (
          <div className="px-5 py-4 border-b border-slate-100 bg-white">
            <div className="relative max-w-2xl w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" strokeWidth={3} />
              </div>
              <input 
                type="text" 
                placeholder={searchPlaceholder} 
                className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] sm:text-sm font-semibold transition-colors"
              />
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col bg-slate-50/50 relative">
           {children ? (
             <div className="w-full flex-1 overflow-x-auto">
               {children}
             </div>
           ) : (
             <div className="absolute inset-0 flex items-center justify-center p-8">
               {emptyState || (
                 <div className="flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 bg-slate-100 rounded-xl mb-4 flex items-center justify-center border border-slate-200">
                      <div className="w-8 h-8 rounded border-2 border-slate-300 border-dashed opacity-50"></div>
                   </div>
                   <h3 className="text-sm font-bold text-slate-700 tracking-wide">NO MATCHING DATA</h3>
                   <p className="text-xs font-semibold text-slate-400 mt-1">Adjust your search or add a new record.</p>
                 </div>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { X, TrendingUp, Download, Printer, BarChart3 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  value: string | number;
  type: string;
}

export default function DetailedAnalyticsModal({ isOpen, onClose, title, value, type }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-2xl">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-200">
               {type === 'currency' ? <TrendingUp size={18} /> : <BarChart3 size={18} />}
             </div>
             <div>
               <h2 className="text-lg font-black text-slate-800 tracking-tight">{title} Analytics</h2>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">Historical Trends & Data</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current Value</p>
               <p className="text-2xl font-black text-slate-800">{value}</p>
               <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-2 bg-emerald-50 px-2 py-1 rounded w-max">
                  <TrendingUp size={12} />
                  <span>+12.5% vs last period</span>
               </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Previous Period</p>
               <p className="text-xl font-black text-slate-600">{type === 'currency' ? '₦0' : '0'}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Year to Date (YTD)</p>
               <p className="text-xl font-black text-slate-600">{type === 'currency' ? '₦0' : '0'}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Historical Trend (Last 7 Days)</h3>
            <div className="h-48 w-full bg-slate-50 rounded-2xl border border-slate-100 flex items-end px-4 gap-2 pt-6 pb-2">
               {/* Mock Chart Bars */}
               {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                 <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group h-full">
                    <div 
                      className="w-full bg-slate-200 group-hover:bg-[#10B981] rounded-t-md transition-colors relative"
                      style={{ height: `${height}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap transition-opacity">
                         Value: {height}
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">D{i+1}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">Recent Related Activity</h3>
            <div className="bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center p-8 text-center">
               <BarChart3 size={32} className="text-slate-300 mb-3" />
               <p className="text-sm font-bold text-slate-800 mb-1">No detailed logs yet</p>
               <p className="text-xs text-slate-500">Activity affecting this metric will appear here once transactions are recorded in the system.</p>
            </div>
          </div>
        </div>

        <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-slate-50 z-10 w-full sticky bottom-0 mt-auto flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold px-6 py-4 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-sm">
            <Printer size={16} /> Print Report
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg shadow-slate-900/20">
            <Download size={16} /> Export to CSV
          </button>
        </div>
      </div>
    </div>
  );
}

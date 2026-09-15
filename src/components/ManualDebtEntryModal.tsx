import React from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ManualDebtEntryModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-lg shadow">
        <div className="shrink-0 p-4 sm:p-6 flex items-center justify-between bg-white z-10 w-full sticky top-0 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-black tracking-tight text-slate-800 uppercase">
            Manual Debt Entry
          </h2>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors">
            EXIT
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="flex flex-col flex-1 overflow-y-auto">
          <div className="p-6">
              <div className="grid grid-cols-1 gap-6">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Customer</label>
                  <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-bold text-slate-700">
                    <option value="">Choose a customer...</option>
                    <option value="1">Eromosele Davidson</option>
                  </select>
               </div>
               
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Debt Amount</label>
                  <input required type="number" placeholder="Enter amount (₦)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
               </div>

               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Note / Reference</label>
                  <input type="text" placeholder="e.g. Previous balance, Late pick up..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
               </div>
            </div>
          </div>

          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3 sticky bottom-0 bg-white">
            <button type="submit" className="flex items-center justify-center gap-2 flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-xl text-sm font-bold tracking-wide transition-colors shadow-lg shadow-red-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Record Debt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

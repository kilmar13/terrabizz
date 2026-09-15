import React from 'react';
import { X, Printer, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function InventoryPrintModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-sm shadow">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0">
          <h2 className="text-xl font-black text-[#0F172A] tracking-tight uppercase flex items-center gap-2">
             <Printer size={20} className="text-slate-500" /> Print Inventory
          </h2>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors">
            EXIT
          </button>
        </div>
        
        <div className="p-6 space-y-4">
           <div className="space-y-2">
             <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scope</label>
             <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all">
                <option value="current">Print Current Page</option>
                <option value="selected">Print Selected Records</option>
                <option value="full">Print Full Inventory</option>
             </select>
           </div>
           
           <div className="space-y-2">
             <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Format</label>
             <div className="flex gap-3">
               <button className="flex-1 p-3 rounded-xl border-2 border-[#10B981] bg-emerald-50 text-[#10B981] font-bold text-xs flex items-center justify-center gap-2">
                 <Printer size={16} /> Printer
               </button>
               <button className="flex-1 p-3 rounded-xl border border-slate-200 text-slate-600 hover:border-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors">
                 <FileText size={16} /> PDF
               </button>
             </div>
           </div>
        </div>
        
        <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto bg-slate-50">
           <button onClick={() => { alert('Generating report...'); onClose(); }} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3.5 text-xs font-bold uppercase tracking-widest shadow-sm">
             Generate Print Copy
           </button>
        </div>
      </div>
    </div>
  );
}

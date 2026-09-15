import React, { useState } from 'react';
import { X, FileText, Download, Calendar, Tag, Store, Users, Package } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportGenerationModal({ isOpen, onClose }: Props) {
  const [dateRange, setDateRange] = useState('Today');
  const [store, setStore] = useState('All Stores');
  const [category, setCategory] = useState('All Categories');
  const [extFormat, setExtFormat] = useState('PDF');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-lg shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-emerald-50 text-[#10B981] rounded-[20px] flex items-center justify-center border border-emerald-100 shadow-sm">
                <FileText size={24} />
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">GENERATE REPORT</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">BUILD CUSTOM DATA EXTRACT</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="overflow-y-auto w-full flex-1 p-6 space-y-5">
           
           <div className="space-y-4">
              <div>
                 <label className="flex text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5 items-center gap-2">
                    <Calendar size={12}/> Date Range
                 </label>
                 <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all cursor-pointer">
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                 </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="flex text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5 items-center gap-2">
                       <Store size={12}/> Store Location
                    </label>
                    <select value={store} onChange={e => setStore(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all cursor-pointer">
                       <option>All Stores</option>
                       <option>Central Store</option>
                       <option>Warehouse A</option>
                    </select>
                 </div>
                 <div>
                    <label className="flex text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5 items-center gap-2">
                       <Tag size={12}/> Category
                    </label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all cursor-pointer">
                       <option>All Categories</option>
                       <option>Electronics</option>
                       <option>Groceries</option>
                    </select>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="flex text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5 items-center gap-2">
                       <Package size={12}/> Product (Optional)
                    </label>
                    <input type="text" placeholder="SKU or Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all cursor-pointer" />
                 </div>
                 <div>
                    <label className="flex text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5 items-center gap-2">
                       <Users size={12}/> Customer (Optional)
                    </label>
                    <input type="text" placeholder="Phone or Email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all cursor-pointer" />
                 </div>
              </div>
           </div>

           <div className="pt-2 border-t border-slate-100">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5 mt-2">Export Format</label>
              <div className="flex gap-2">
                 {['PDF', 'Excel', 'CSV'].map(fmt => (
                    <button type="button" key={fmt} onClick={() => setExtFormat(fmt)} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${extFormat === fmt ? 'bg-[#0F172A] text-white shadow-lg' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}>
                       {fmt}
                    </button>
                 ))}
              </div>
           </div>

           <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 flex gap-3 mt-auto">
              <button type="button" onClick={onClose} className="flex-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold py-3.5 rounded-xl text-[11px] uppercase tracking-widest transition-colors shadow-sm">
                 Cancel
              </button>
              <button type="submit" className="flex-1 bg-[#10B981] hover:bg-[#0ea5e9] text-white font-bold py-3.5 rounded-xl text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                 <Download size={16} /> Generate {extFormat}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
}

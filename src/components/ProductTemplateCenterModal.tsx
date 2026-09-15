import React from 'react';
import { X, Search, FileJson, Download, PlusCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductTemplateCenterModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const templates = [
    { name: 'Retail', items: 154, active: true },
    { name: 'Supermarket', items: 1042, active: false },
    { name: 'Electronics', items: 315, active: false },
    { name: 'Pharmacy', items: 852, active: false },
    { name: 'Fashion', items: 412, active: false },
    { name: 'Restaurant', items: 124, active: false },
    { name: 'Wholesale', items: 400, active: false },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-4xl shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-4xl shadow">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-[#0F172A] tracking-tight uppercase flex items-center gap-2">
              <FileJson className="text-indigo-500" />
              Product Template Center
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 text-left">
              Preview, Download, or Apply Industry-Specific Catalogs
            </p>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors">
            EXIT
          </button>
        </div>

        <div className="p-4 border-b border-slate-100 flex items-center shrink-0">
           <div className="relative w-full  md:max-w-sm max-h-[90vh] flex flex-col overflow-hidden w-full max-w-[90vw] md:max-w-sm">
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input type="text" placeholder="Search templates..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"/>
           </div>
        </div>

        <div className="flex-1 overflow-auto bg-slate-50/50 p-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((tpl) => (
                 <div key={tpl.name} className="bg-white border text-left border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight mb-1">{tpl.name}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{tpl.items} Items Included</p>
                    
                    <div className="flex gap-2">
                       <button className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 focus:outline-none">
                         <Download size={14} /> Download
                       </button>
                       <button className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 focus:outline-none">
                         <CheckCircle2 size={14} /> Apply Mode
                       </button>
                    </div>
                    <button className="w-full mt-2 py-2 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors focus:outline-none">
                       Customize
                    </button>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Plus, Search, Tag, AlertTriangle } from 'lucide-react';

export default function Categories() {
  const [search, setSearch] = useState('');
  const [groupName, setGroupName] = useState('');
  const [showError, setShowError] = useState(false);

  const handleCreate = () => {
    if (!groupName) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">CATEGORY MANAGER</h1>
        <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">Organize products into distinct taxonomical groups</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-8">
            <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-widest text-[11px]">
              CREATE CLASSIFICATION
            </h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-2 relative">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Class Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Beverages, Pastries, Electronics" 
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10B981] transition-all text-sm"
                />
              </div>
              <button 
                type="submit"
                className={`w-full text-slate-50 py-3 rounded-lg font-bold text-[11px] uppercase tracking-widest transition-all ${groupName ? 'bg-slate-900 hover:bg-slate-800' : 'bg-[#cbd5e1]'}`}
              >
                FINALIZE CREATION
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                 type="text" 
                 placeholder="Search classifications..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all placeholder:text-slate-400"
              />
           </div>

           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-sm">
             <div className="grid grid-cols-2 p-4 border-b border-slate-100 bg-slate-50/50">
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CATEGORY IDENTITY</div>
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">REGISTRATION DATE</div>
             </div>
             <div className="p-8 text-center bg-white flex flex-col items-center justify-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-6">NO MATCHING CATEGORIES</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

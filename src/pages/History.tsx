import React, { useState } from 'react';
import { History as HistoryIcon, Search, Filter, Clock, RefreshCw } from 'lucide-react';

export default function History() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filters = ['ALL', 'SALE', 'INVENTORY', 'EXPENSE', 'SYSTEM'];
  
  const activities: any[] = [
    {
      type: 'SUPPLIER_UPDATE',
      title: 'Supplier Update',
      description: 'Registered new supplier: KM',
      user: 'EROMOSELE DAVID',
      tag: 'SUPPLIER_UPDATE',
      date: 'JUN 28, 2026',
      time: '13:13'
    }
  ];

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
           <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
               <HistoryIcon size={20} strokeWidth={2.5} />
             </div>
             <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">ACTIVITY HISTORY</h1>
           </div>
           <p className="text-sm text-slate-500 font-medium ml-13">
             Chronological audit log of all business operations.
           </p>
        </div>
        <button className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors px-3 py-2 text-[10px] font-black tracking-widest uppercase">
          <Clock size={14} /> SNAPSHOT VIEW
        </button>
      </header>

      {/* Main Content Area */}
      <div className="bg-white rounded-[32px] p-2 shadow-sm border border-slate-200 flex-1 flex flex-col min-h-[500px]">
        {/* Controls */}
        <div className="p-4 flex flex-col xl:flex-row gap-4 items-center border-b border-slate-100">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search logs by title, ID or description..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-3 rounded-full text-[10px] font-black tracking-widest transition-colors uppercase ${
                  filter === f 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List area */}
        <div className="flex-1 overflow-y-auto p-4">
          {activities.length > 0 && filter === 'ALL' && search === '' ? (
            <div className="space-y-3">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <RefreshCw size={18} className="text-slate-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{activity.title}</h4>
                      <p className="text-sm text-slate-500 mt-0.5">{activity.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          {activity.user}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                          {activity.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <Clock size={12} /> {activity.date} <span className="text-slate-300 mx-1">•</span> {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Filter className="text-slate-300" size={28} />
              </div>
              <h3 className="text-[15px] font-bold text-slate-800 mb-1">
                No activities match your filters
              </h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                TRY BROADENING YOUR SEARCH CRITERIA
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Architecture Note */}
      <div className="bg-slate-900 rounded-[24px] p-6 relative overflow-hidden flex items-center justify-between shadow-xl shadow-slate-900/20 mt-auto">
        <div className="relative z-10 max-w-2xl">
          <p className="text-[#10B981] text-[10px] font-black tracking-[0.2em] mb-2 uppercase">ARCHITECTURE NOTE</p>
          <h3 className="text-white text-lg font-black tracking-tight mb-2 uppercase">OPTIMIZED DATA FETCHING</h3>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            This history log utilizes real-time snapshots to ensure maximum performance and minimal system overhead across your enterprise terminal.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-slate-800/50 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex gap-1 mr-4">
          <div className="w-2 h-12 rounded-full bg-rose-500/20"></div>
          <div className="w-2 h-12 rounded-full bg-emerald-500/20"></div>
          <div className="w-2 h-12 rounded-full bg-[#10B981]"></div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Clock, FileText, File, Download } from 'lucide-react';
import ReportGenerationModal from '../components/ReportGenerationModal';

export default function Reports() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter">Business Reconciliations</h1>
          <div className="flex items-center gap-2 text-slate-500 mt-1">
            <Clock size={14} strokeWidth={2.5} className="opacity-70" />
            <p className="text-[11px] font-bold uppercase tracking-widest">AUDIT LOG OF END-OF-DAY CLOSURES</p>
          </div>
        </div>
        <button 
          onClick={() => setIsReportModalOpen(true)}
          className="bg-[#0F172A] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors"
        >
          <Download size={16} /> Generate Extract
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* ... (existing content) ... */}
        
        {/* Left Side: Empty State Card */}
        <div className="flex-1 bg-white rounded-[32px] border-4 border-slate-50 shadow-xl shadow-slate-100/50 p-12 lg:p-24 flex flex-col items-center justify-center text-center min-h-[500px]">
          <div className="mb-6">
            <FileText size={48} strokeWidth={1} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-3">
            NO ARCHIVES FOUND
          </h3>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 max-w-sm leading-relaxed">
            REPORTS WILL APPEAR HERE ONCE BUSINESS IS CLOSED
          </p>
        </div>

        {/* Right Side: Placeholder Card */}
        <div className="w-full lg:w-[380px] border-[3px] border-dashed border-slate-200 rounded-[32px] p-12 flex flex-col items-center justify-center text-center bg-slate-50/30">
          <div className="mb-6">
             <File size={36} strokeWidth={1.5} className="text-slate-300" />
          </div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            SELECT AN EXTRACT
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed max-w-[240px]">
            VIEW DETAILED RECONCILIATION METRICS<br/>FOR ANY DAILY CLOSURE RECORD
          </p>
        </div>

      </div>

      <ReportGenerationModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
    </div>
  );
}

import React, { useState } from 'react';
import { X, Search, Filter, RefreshCcw, Eye, Printer, RotateCcw, Download, Receipt } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecentActivityModal({ isOpen, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Empty data for live db representation, no fake data
  const [transactions, setTransactions] = useState<any[]>([]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-5xl shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-5xl shadow">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
                <Receipt size={24} />
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">Recent Terminal Activity</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Review, Edit, or Refund Past Transactions</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors">
            EXIT
          </button>
        </div>
        
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-3 bg-slate-50/50 shrink-0">
           <div className="relative flex-1">
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input
               type="text"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
               placeholder="Search by Transaction ID, Customer, or Cashier..."
               className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
             />
           </div>
           <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
               <Filter size={14} /> Filter
             </button>
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
               <Download size={14} /> Export
             </button>
           </div>
        </div>

        <div className="flex-1 overflow-auto bg-white p-6 relative">
          {transactions.length === 0 ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
               <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-4 border border-slate-200">
                 <Receipt size={32} />
               </div>
               <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">No Recent Activity</h3>
               <p className="text-xs font-medium text-slate-400">There are no transactions logged for this terminal yet.</p>
             </div>
          ) : (
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Transaction ID</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Cashier</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Method</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="pb-3 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {/* Live records map here */}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

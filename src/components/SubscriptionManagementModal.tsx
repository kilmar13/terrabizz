import React from 'react';
import { X, CreditCard, CheckCircle2, Zap } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionManagementModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-2xl shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-[20px] flex items-center justify-center border border-amber-100">
                <CreditCard size={24} />
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">SUBSCRIPTION PLAN</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">PRO PLAN ACTIVATED</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto w-full space-y-6">
           <div className="bg-[#0F172A] text-white rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-slate-900/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div>
                    <span className="bg-[#10B981] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded inline-block mb-3">Current Plan</span>
                    <h3 className="text-3xl font-black italic tracking-tighter mb-1">PRO BUSINESS</h3>
                    <p className="text-slate-400 text-sm font-medium">Billed annually • Next payment on Dec 12, 2025</p>
                 </div>
                 <div className="text-right">
                    <div className="text-3xl font-black tracking-tighter">₦45,000<span className="text-sm font-bold text-slate-500">/yr</span></div>
                    <button className="mt-4 bg-white text-[#0F172A] hover:bg-slate-100 px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors shadow-lg">
                      Renew Plan
                    </button>
                 </div>
              </div>
           </div>

           <div>
              <h3 className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-3">BILLING HISTORY</h3>
              <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                       <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Description</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3 text-center">Receipt</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-slate-600">Dec 12, 2024</td>
                          <td className="px-4 py-3 font-bold text-slate-800">Pro Business (Annual)</td>
                          <td className="px-4 py-3 font-bold text-slate-800">₦45,000</td>
                          <td className="px-4 py-3 text-center">
                             <button className="text-[#10B981] hover:text-emerald-700 text-xs font-bold uppercase tracking-widest">Download</button>
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
           
           <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-[#10B981] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-black text-emerald-900 uppercase tracking-tight mb-2">Want to upgrade to Enterprise?</h3>
              <p className="text-xs font-semibold text-emerald-600 mb-4  md:max-w-md mx-auto max-h-[90vh] flex flex-col overflow-hidden w-full max-w-[90vw] md:max-w-md mx">Get dedicated support, unlimited branches, custom AI features, and a 99.9% uptime SLA.</p>
              <button className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl text-[11px] uppercase tracking-widest transition-colors shadow-lg">
                Contact Sales
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

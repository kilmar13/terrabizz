import React, { useState, useEffect } from 'react';
import { X, Calendar, RefreshCw, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EndOfDayReconciliationModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState<'calculating' | 'form' | 'processing' | 'closed'>('calculating');

  useEffect(() => {
    if (isOpen) {
      setStep('calculating');
      const timer = setTimeout(() => {
        setStep('form');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('closed');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      {(step === 'calculating' || step === 'form' || step === 'processing') && (
        <div className="bg-slate-100 rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col my-auto overflow-hidden max-h-[90vh] w-full max-w-[90vw] md:max-w-2xl">
          <div className="shrink-0 p-4 sm:p-6 flex items-center justify-between bg-slate-800 text-white z-10 w-full sticky top-0 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                <Calendar size={18} />
              </div>
              <div>
                <h2 className="text-sm font-black tracking-widest text-slate-100 uppercase">
                  End of Day Reconciliation
                </h2>
                <p className="text-xs text-slate-400 font-bold tracking-wider">
                  MONDAY, JUNE 15TH, 2026
                </p>
              </div>
            </div>
            <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
          </div>

          {step === 'calculating' && (
            <div className="p-20 flex flex-col items-center justify-center bg-slate-800/95 flex-1">
              <RefreshCw size={48} className="text-emerald-500 animate-spin mb-6" />
              <p className="text-sm font-bold text-slate-400 tracking-wider">Calculating today's numbers...</p>
            </div>
          )}

          {(step === 'form' || step === 'processing') && (
            <div className="flex-1 overflow-y-auto bg-slate-800/95 p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'CASH SALES', val: '₦ 0', icon: '↗', color: 'bg-emerald-500' },
                  { label: 'TRANSFERS', val: '₦ 0', icon: '⇄', color: 'bg-blue-500' },
                  { label: 'RECOVERIES', val: '₦ 0', icon: '⟲', color: 'bg-purple-500' },
                  { label: 'EXPENSES', val: '₦ 0', icon: '↙', color: 'bg-red-500' },
                  { label: 'SUPPLIERS', val: '₦ 0', icon: '↗', color: 'bg-orange-500' },
                  { label: 'NET CASH', val: '₦ 0', icon: '=', color: 'bg-slate-500' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${item.color}`}></span>
                       <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">{item.label}</span>
                    </div>
                    <div className="text-xl font-black text-slate-800">{item.val}</div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Layers size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-700 tracking-wider">TODAY'S TRANSACTION HISTORY (0)</span>
                 </div>
                 <button className="px-3 py-1.5 bg-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-300">
                    show details
                 </button>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-sm overflow-hidden relative">
                <div className="absolute right-0 top-0 text-slate-800 opacity-50 p-6 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">SYSTEM EXPECTED CASH</p>
                  <p className="text-3xl font-black text-white mb-6">₦ 0</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">PHYSICAL CASH COUNTED</label>
                      <input type="text" placeholder="0" className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                       <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2"><RefreshCw size={14} /> CASH DIFFERENCE</span>
                       <span className="text-sm font-black text-emerald-400">₦ 0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-sm overflow-hidden relative">
                <div className="absolute right-0 top-0 text-slate-800 opacity-50 p-6 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-1">EXPECTED BANK BALANCE</p>
                  <p className="text-3xl font-black text-white mb-6">₦ 0</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">ACTUAL BANK/TRANSFER BALANCE</label>
                      <input type="text" placeholder="0" className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                       <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-2"><RefreshCw size={14} /> BANK DIFFERENCE</span>
                       <span className="text-sm font-black text-emerald-400">₦ 0</span>
                    </div>
                  </div>
                </div>
              </div>

              {step === 'processing' ? (
                <div className="bg-slate-200 text-slate-500 font-bold py-4 rounded-xl flex items-center justify-center gap-3">
                  <RefreshCw size={18} className="animate-spin" />
                  <span className="text-sm tracking-wider uppercase">PROCESSING REPORT...</span>
                </div>
              ) : (
                <button 
                  onClick={handleConfirm}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm tracking-wider uppercase"
                >
                  <RefreshCw size={16} /> Confirm & Close Business For Today
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {step === 'closed' && (
        <div className="bg-white rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-sm p-8 text-center">
           <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
           </div>
           <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-3">Business Closed</h2>
           <p className="text-sm text-slate-500 font-semibold mb-8">
              TODAY'S RECONCILIATION REPORT HAS BEEN SUBMITTED. NO FURTHER TRANSACTIONS CAN BE PROCESSED UNTIL TOMORROW.
           </p>
           <button 
              onClick={() => {
                onClose();
                setStep('calculating');
                navigate('/dashboard');
              }}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl tracking-wider text-sm transition-colors shadow-lg"
           >
              RETURN TO DASHBOARD
           </button>
        </div>
      )}
    </div>
  );
}

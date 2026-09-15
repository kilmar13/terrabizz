import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Receipt, CreditCard, Banknote, Building, Wallet, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  itemsCount: number;
  onComplete: () => void;
  paymentMethod?: string;
}

export default function PaymentModal({ isOpen, onClose, total, itemsCount, onComplete, paymentMethod: initialMethod }: Props) {
  const [method, setMethod] = useState<'Cash' | 'Bank Transfer' | 'POS/Card' | 'Mobile Wallet' | 'Credit Sale'>('Cash');
  const [amountPaid, setAmountPaid] = useState<string>('');
  const [customer, setCustomer] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    if (initialMethod) {
      setMethod(initialMethod as any);
    }
    if (isOpen) {
      setAmountPaid(total.toString());
      setIsSuccess(false);
      setDetecting(false);
    }
  }, [initialMethod, isOpen, total]);

  if (!isOpen) return null;

  const handleComplete = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onComplete();
      setIsSuccess(false);
    }, 2000);
  };

  const simulateBankTransfer = () => {
    setDetecting(true);
    setTimeout(() => {
       setDetecting(false);
       handleComplete();
    }, 3000);
  };

  const balance = total - (Number(amountPaid) || 0);

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
        <div className="bg-white rounded-[24px] w-full  md:max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-sm shadow">
           <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-500">
             <CheckCircle2 size={40} className="animate-pulse" />
           </div>
           <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Payment Successful</h2>
           <p className="text-sm font-bold text-slate-500 mb-8">Transaction #TRX-{Math.floor(Math.random()*1000000)} saved.</p>
           
           <div className="flex w-full gap-3">
             <button className="flex-1 bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
               <Receipt size={16} /> Print
             </button>
             <button onClick={onClose} className="flex-1 bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
               Done
             </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-3xl w-full  md:max-w-lg shadow-xl animate-in zoom-in-95 duration-200 overflow-hidden relative border border-slate-100 flex flex-col my-auto max-h-[90vh] w-full max-w-[90vw] md:max-w-lg shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight">Complete Sale</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">{itemsCount} Items</p>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors">
            EXIT
          </button>
        </div>
        
        <form onSubmit={handleComplete} className="overflow-y-auto w-full">
          <div className="p-6 space-y-6">
            <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 p-6 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest mb-1 text-emerald-500">Total Amount Due</span>
              <span className="text-4xl font-black tracking-tighter">₦{total.toLocaleString()}</span>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Customer</label>
              <select 
                title="Customer selection"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              >
                <option value="">Walk-in Customer</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Amount Tendered</label>
              <input 
                title="Amount paid"
                type="number" 
                required
                min={method === 'Credit Sale' ? 0 : total}
                value={amountPaid}
                onChange={e => setAmountPaid(e.target.value)}
                placeholder="Enter amount paid"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-black focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
              />
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Change Due</span>
               <span className={`text-lg font-black ${balance < 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                 ₦{balance < 0 ? Math.abs(balance).toLocaleString() : '0'}
               </span>
            </div>

            {method === 'Bank Transfer' && (
               <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col items-center text-center">
                   <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1.5">Monnify Dedicated Account</h3>
                   <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Transfer EXACTLY ₦{total.toLocaleString()} to complete.</p>
                   <div className="bg-white px-6 py-3 rounded-xl border border-blue-100 my-4 shadow-sm w-full">
                       <p className="text-lg font-black text-slate-800 tracking-widest font-mono">0123456789</p>
                       <p className="text-xs font-bold text-slate-400">Wema Bank</p>
                   </div>
                   <button 
                     type="button" 
                     onClick={simulateBankTransfer}
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-widest py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                   >
                     {detecting ? <><RefreshCcw size={14} className="animate-spin" /> Verifying Payment...</> : <><CheckCircle2 size={14} /> I Have Sent The Money</>}
                   </button>
               </div>
            )}
          </div>

          {method !== 'Bank Transfer' && (
            <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3 sticky bottom-0 bg-white">
              <button type="submit" className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-colors shadow-xl shadow-slate-900/20">
                Confirm Payment
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

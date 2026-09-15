import React, { useState } from 'react';
import { X, AlertTriangle, Ban } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  order: any;
}

export default function OrderCancellationModal({ isOpen, onClose, onConfirm, order }: Props) {
  const [reason, setReason] = useState('');

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-sm shadow">
        <div className="p-6 text-center border-b border-slate-100">
           <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-4 border border-rose-100">
             <Ban size={32} />
           </div>
           <h2 className="text-xl font-black text-slate-800 tracking-tight mb-2">Cancel Order</h2>
           <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Order #{order.id}</p>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onConfirm(reason); onClose(); }}>
          <div className="p-6 space-y-4">
             <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reason for cancellation</label>
             <textarea 
               required
               value={reason}
               onChange={e => setReason(e.target.value)}
               placeholder="Please provide a reason to log this cancellation..."
               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all min-h-[100px] resize-none font-medium"
             />
          </div>

          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3 bg-slate-50">
            <button type="button" onClick={onClose} className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-colors">
              EXIT
            </button>
            <button type="submit" disabled={!reason.trim()} className="flex-1 bg-rose-500 disabled:bg-rose-300 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg shadow-rose-500/20">
              Confirm Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

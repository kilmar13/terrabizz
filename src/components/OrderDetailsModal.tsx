import React from 'react';
import { X, Printer, Download, PackageOpen, CreditCard, ChevronRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function OrderDetailsModal({ isOpen, onClose, order }: Props) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-3xl shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-3xl shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
               <PackageOpen size={24} />
             </div>
             <div>
               <h2 className="text-xl font-black text-slate-800 tracking-tight">Order #{order.id}</h2>
               <div className="flex gap-2 items-center mt-1">
                 <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-widest">{order.date}</span>
                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${order.status === 'Completed' ? 'text-[#10B981] bg-emerald-50 border border-emerald-100' : 'text-amber-500 bg-amber-50 border border-amber-100'}`}>
                   {order.status}
                 </span>
               </div>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Customer Information</h3>
               <p className="text-sm font-bold text-slate-800">{order.customer || 'Walk-in Customer'}</p>
             </div>
             <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><CreditCard size={12}/> Payment Details</h3>
               <p className="text-sm font-bold text-slate-800">{order.paymentMethod || 'Cash'}</p>
             </div>
          </div>

          <div>
             <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Order Items</h3>
             <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                   <tr>
                     <th className="px-4 py-3 border-b border-slate-100">Item Name</th>
                     <th className="px-4 py-3 border-b border-slate-100 text-center">Qty</th>
                     <th className="px-4 py-3 border-b border-slate-100 text-right">Price</th>
                     <th className="px-4 py-3 border-b border-slate-100 text-right">Total</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-800">Logitech Master 3s</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-500">1</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-500">₦95,000</td>
                      <td className="px-4 py-3 text-right font-black text-slate-800">₦95,000</td>
                    </tr>
                 </tbody>
               </table>
               <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Grand Total</span>
                 <span className="text-2xl font-black text-[#10B981]">₦{order.amount.toLocaleString()}</span>
               </div>
             </div>
          </div>
        </div>

        <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3 bg-slate-50">
          <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold px-4 py-4 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2">
            <Printer size={16} /> Print Receipt
          </button>
          <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold px-4 py-4 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2">
            <Printer size={16} /> Print Invoice
          </button>
          <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-4 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}

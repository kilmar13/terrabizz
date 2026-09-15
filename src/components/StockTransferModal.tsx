import React, { useState } from 'react';
import { X, ArrowRightLeft, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function StockTransferModal({ isOpen, onClose }: Props) {
  const [source, setSource] = useState('Central Store');
  const [destination, setDestination] = useState('Warehouse A');
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-lg shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-[20px] flex items-center justify-center border border-indigo-100 shadow-sm">
                <ArrowRightLeft size={24} />
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">STOCK TRANSFER</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">MOVE ITEMS BETWEEN STORES</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors">
            EXIT
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="overflow-y-auto w-full flex-1 p-6 space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Source Store</label>
                 <select value={source} onChange={e => setSource(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all cursor-pointer">
                    <option value="Central Store">Central Store</option>
                    <option value="Warehouse A">Warehouse A</option>
                 </select>
              </div>
              <div>
                 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Destination Store</label>
                 <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all cursor-pointer">
                    <option value="Warehouse A">Warehouse A</option>
                    <option value="Central Store">Central Store</option>
                    <option value="Outlet 2">Outlet 2</option>
                 </select>
              </div>
           </div>

           <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Select Product</label>
              <select required value={product} onChange={e => setProduct(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all cursor-pointer">
                 <option value="" disabled>Select a product...</option>
                 <option value="LGT-M3S text">Logitech Master 3s</option>
                 <option value="KIN-O1A text">Kinetic Oak Desk</option>
              </select>
           </div>
           
           <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Quantity to Transfer</label>
              <input type="number" required min="1" placeholder="0" value={qty} onChange={e => setQty(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
           </div>

           <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Notes (Optional)</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Reason for transfer..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all resize-none h-20" />
           </div>

           <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 flex gap-3 mt-auto">
              <button type="button" onClick={onClose} className="flex-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold py-3.5 rounded-xl text-[11px] uppercase tracking-widest transition-colors shadow-sm">
                 Cancel
              </button>
              <button type="submit" className="flex-1 bg-[#10B981] hover:bg-[#0ea5e9] text-white font-bold py-3.5 rounded-xl text-[11px] uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2">
                 <Send size={16} /> Transfer Status
              </button>
           </div>
        </form>
      </div>
    </div>
  );
}

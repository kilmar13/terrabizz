import React from 'react';
import { X, PackageOpen, TrendingUp, History, Tag, Box } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export default function ViewProductModal({ isOpen, onClose, product }: Props) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-2xl shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-200">
               <PackageOpen size={24} className="text-[#10B981]" />
             </div>
             <div>
               <h2 className="text-xl font-black text-slate-800 tracking-tight">{product.name || 'Product Details'}</h2>
               <div className="flex gap-2 items-center mt-1">
                 <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-widest">{product.sku || 'N/A'}</span>
                 <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase tracking-widest">Active</span>
               </div>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-3 gap-4">
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex gap-1 mb-1 items-center"><Tag size={12}/> Selling Price</div>
                <div className="text-2xl font-black text-slate-800">₦{(product.price || 0).toLocaleString()}</div>
             </div>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex gap-1 mb-1 items-center"><Box size={12}/> Current Stock</div>
                <div className="text-2xl font-black text-[#10B981]">{product.stock || 0}</div>
             </div>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex gap-1 mb-1 items-center"><TrendingUp size={12}/> Sales</div>
                <div className="text-2xl font-black text-slate-800">45</div>
             </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2"><History size={14} className="text-slate-400"/> Stock History</h3>
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-4 py-3 border-b border-slate-100">Date</th>
                    <th className="px-4 py-3 border-b border-slate-100">Action</th>
                    <th className="px-4 py-3 border-b border-slate-100">Qty Changed</th>
                    <th className="px-4 py-3 border-b border-slate-100">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-500 font-medium whitespace-nowrap">Today, 10:23 AM</td>
                    <td className="px-4 py-3">
                      <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Sale</span>
                    </td>
                    <td className="px-4 py-3 text-rose-500 font-bold">-1</td>
                    <td className="px-4 py-3 text-slate-800 font-black">{product.stock || 0}</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-500 font-medium whitespace-nowrap">Yesterday, 14:10 PM</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Restock</span>
                    </td>
                    <td className="px-4 py-3 text-[#10B981] font-bold">+{product.stock ? Number(product.stock) + 1 : 1}</td>
                    <td className="px-4 py-3 text-slate-800 font-black">{product.stock ? Number(product.stock) + 1 : 1}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

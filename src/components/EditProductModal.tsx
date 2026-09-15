import React, { useState, useEffect } from 'react';
import { X, Save, Box, PackageOpen, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

export default function EditProductModal({ isOpen, onClose, product }: Props) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('0');
  const [stock, setStock] = useState('0');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setSku(product.sku || '');
      setPrice((product.price || 0).toString());
      setStock((product.stock || 0).toString());
    }
  }, [product]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-lg shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-2 text-lg font-black text-slate-800 tracking-tight">
             <Box size={20} className="text-[#10B981]" />
             EDIT PRODUCT
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="overflow-y-auto">
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Product Name</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">SKU / Code</label>
                <input required type="text" value={sku} onChange={e => setSku(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Category</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all">
                  <option>General</option>
                  <option>Electronics</option>
                  <option>Groceries</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Selling Price (₦)</label>
                <input required min="0" type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Stock Level</label>
                <input required min="0" type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
              </div>
            </div>
          </div>
          
          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3 sticky bottom-0 bg-white">
            <button type="submit" className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

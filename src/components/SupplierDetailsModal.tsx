import React, { useState } from 'react';
import { X, Truck, Package, CreditCard, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  supplier: any;
}

export default function SupplierDetailsModal({ isOpen, onClose, supplier }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');

  if (!isOpen || !supplier) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-3xl shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-3xl shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-[20px] flex items-center justify-center border border-sky-100 shadow-sm font-black text-xl uppercase">
                {supplier.name.substring(0, 2)}
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">{supplier.name}</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Vendor ID: #{supplier.id}</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>

        <div className="flex bg-slate-50 border-b border-slate-100 p-2 gap-2 overflow-x-auto shrink-0">
           <button onClick={() => setActiveTab('overview')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              Overview
           </button>
           <button onClick={() => setActiveTab('products')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'products' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              Products Supplied
           </button>
           <button onClick={() => setActiveTab('orders')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              Purchase Orders
           </button>
        </div>
        
        <div className="overflow-y-auto w-full flex-1 p-6 bg-white">
           {activeTab === 'overview' && (
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center text-white">
                      <CreditCard className="text-[#10B981] mb-2" size={24} />
                      <span className="text-2xl font-black tracking-tighter">{supplier.debt}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Outstanding Balance</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center justify-center text-center">
                      <Package className="text-amber-500 mb-2" size={24} />
                      <span className="text-2xl font-black text-slate-800 tracking-tighter">45</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Total Transactions</span>
                   </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-2">Supplier Details</h3>
                   <div className="text-sm font-bold text-slate-600">
                      Contact Person: {supplier.contact || 'Main Desk'}
                   </div>
                   <div className="text-sm font-bold text-slate-600">
                      Phone: {supplier.phone || '0801 999 8888'}
                   </div>
                   <div className="text-sm font-bold text-slate-600">
                      Email: {supplier.email || 'vendor@example.com'}
                   </div>
                   <div className="text-sm font-bold text-slate-600">
                      Address: {supplier.address || 'Vendor Warehouse Zone, City.'}
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'products' && (
              <div className="text-center py-10">
                 <Package className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Products Supplied</h3>
                 <p className="text-[11px] font-medium text-slate-500 mt-1">List of all product variants registered under this supplier.</p>
              </div>
           )}

           {activeTab === 'orders' && (
              <div className="text-center py-10">
                 <Truck className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Purchase Orders</h3>
                 <p className="text-[11px] font-medium text-slate-500 mt-1">Past and pending orders raised to this supplier.</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, User, ShoppingCart, DollarSign, Clock, MapPin, Phone, Mail } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
}

export default function CustomerProfileModal({ isOpen, onClose, customer }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'purchases' | 'payments' | 'notes'>('overview');

  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-3xl shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-3xl shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-[20px] flex items-center justify-center border border-indigo-100 shadow-sm font-black text-xl uppercase">
                {customer.name.substring(0, 2)}
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">{customer.name}</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{customer.type}</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors">
            EXIT
          </button>
        </div>

        <div className="flex bg-slate-50 border-b border-slate-100 p-2 gap-2 overflow-x-auto shrink-0">
           <button onClick={() => setActiveTab('overview')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              Overview
           </button>
           <button onClick={() => setActiveTab('purchases')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'purchases' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              Purchases
           </button>
           <button onClick={() => setActiveTab('payments')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'payments' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              Payments
           </button>
           <button onClick={() => setActiveTab('notes')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'notes' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              Notes
           </button>
        </div>
        
        <div className="overflow-y-auto w-full flex-1 p-6 bg-white">
           {activeTab === 'overview' && (
             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-center">
                      <ShoppingCart className="text-emerald-500 mb-2" size={24} />
                      <span className="text-2xl font-black text-slate-800 tracking-tighter">14</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Total Orders</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center text-center">
                      <DollarSign className="text-indigo-500 mb-2" size={24} />
                      <span className="text-2xl font-black text-slate-800 tracking-tighter">₦450k</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Total Spent</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex flex-col items-center justify-center text-center">
                      <Clock className="text-rose-500 mb-2" size={24} />
                      <span className="text-xl font-black text-slate-800 tracking-tighter mt-1">Oct 12</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Last Purchase</span>
                   </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-2">Contact Details</h3>
                   <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                      <Phone size={16} className="text-slate-400" />
                      {customer.phone || '0801 234 5678'}
                   </div>
                   <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                      <Mail size={16} className="text-slate-400" />
                      {customer.email || 'customer@example.com'}
                   </div>
                   <div className="flex text-sm font-bold text-slate-600 items-start gap-3">
                      <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      {customer.address || '42 Business Ave, Layout Phase 1, City.'}
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'purchases' && (
              <div className="text-center py-10">
                 <ShoppingCart className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Purchase History</h3>
                 <p className="text-[11px] font-medium text-slate-500 mt-1">List of all orders made by this customer will appear here.</p>
              </div>
           )}

           {activeTab === 'payments' && (
              <div className="text-center py-10">
                 <DollarSign className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                 <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Payment History</h3>
                 <p className="text-[11px] font-medium text-slate-500 mt-1">Transactions, deposits, and outstanding balances.</p>
              </div>
           )}

           {activeTab === 'notes' && (
              <div className="space-y-4">
                 <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all resize-none h-32" placeholder="Add administrative notes about this customer..." />
                 <button className="bg-slate-900 border border-slate-900 text-white text-xs px-6 py-3 font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors shadow-sm ml-auto block">Save Note</button>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

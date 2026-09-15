import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (supplier: any) => void;
}

export default function NewSupplierRegistrationModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      address: formData.address,
      debt: '₦0',
      nextDue: '-',
      transactions: 0
    });
    setFormData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      category: '',
      address: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-3xl w-full flex flex-col my-auto  md:max-w-2xl shadow-xl animate-in zoom-in-95 duration-200 relative overflow-hidden max-h-[90vh] w-full max-w-[90vw] md:max-w-2xl shadow">
        <div className="shrink-0 p-4 sm:p-6 flex items-center justify-between bg-white z-10 w-full sticky top-0 border-b border-slate-100">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase">
            New Supplier Registration
          </h2>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>

        <div className="overflow-y-auto flex-1 w-full"><form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6">
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 mb-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer group">
               <div className="w-10 h-10 mb-2 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 group-hover:bg-slate-100">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                   </svg>
               </div>
               <span className="text-xs font-bold uppercase tracking-wider group-hover:text-slate-800 transition-colors">Profile Image</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Alaba Electronics Ltd" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Person</label>
                  <input required type="text" value={formData.contactPerson} onChange={(e) => setFormData({...formData, contactPerson: e.target.value})} placeholder="Name of representative" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address (Optional)</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="vendor@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number (Optional)</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+234..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
               </div>
            </div>

            <div className="space-y-6">
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Supply Category</label>
                  <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="e.g. Raw Materials, Electronics, Office Supplies" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
               </div>
               <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Physical Address</label>
                  <input required type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Full business address" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
               </div>
            </div>
          </div>

          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3 pb-8">
            <button type="submit" className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-colors shadow-lg shadow-slate-900/20">
              Register Supplier
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

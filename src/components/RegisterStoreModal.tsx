import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (store: any) => void;
}

export default function RegisterStoreModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    manager: '',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) {
      onAdd({
        ...formData,
        established: new Date().getFullYear().toString()
      });
    }
    setFormData({ name: '', location: '', manager: '', contact: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-3xl w-full flex flex-col my-auto  md:max-w-lg shadow-xl animate-in zoom-in-95 duration-200 relative overflow-hidden max-h-[90vh] w-full max-w-[90vw] md:max-w-lg shadow">
        <div className="shrink-0 p-4 sm:p-6 flex items-center justify-between bg-white z-10 w-full sticky top-0 border-b border-slate-100">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase">
            Register New Store
          </h2>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>

        <div className="overflow-y-auto flex-1 w-full"><form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 mb-6">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Store Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Lagos Mainland Branch" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
               </div>
               
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location Address</label>
                  <input required type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Physical address" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Manager Name</label>
                     <input required type="text" value={formData.manager} onChange={(e) => setFormData({...formData, manager: e.target.value})} placeholder="Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Phone</label>
                     <input required type="tel" value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} placeholder="Phone number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
                  </div>
               </div>
            </div>
          </div>

          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3">
            <button type="submit" className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-colors shadow-lg shadow-slate-900/20">
              Save Store
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

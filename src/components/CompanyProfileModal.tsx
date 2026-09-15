import React, { useState } from 'react';
import { X, Building2, UploadCloud, Save } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyProfileModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('Eromarth Retail');
  const [phone, setPhone] = useState('+234 801 234 5678');
  const [email, setEmail] = useState('hello@eromarth.com');
  const [address, setAddress] = useState('123 Retail Way, Business District');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-lg shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-[20px] flex items-center justify-center border border-slate-200">
                <Building2 size={24} />
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">COMPANY PROFILE</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">BUSINESS INFORMATION</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="overflow-y-auto">
          <div className="p-6 space-y-5">
             <div className="w-full flex justify-center mb-6">
                <div className="relative group cursor-pointer">
                   <div className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden transition-all group-hover:border-[#10B981] group-hover:bg-emerald-50">
                      <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-[#10B981]">
                         <UploadCloud size={24} />
                         <span className="text-[9px] font-bold uppercase tracking-widest mt-2">Upload Logo</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Business Name</label>
                   <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Phone Number</label>
                      <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Email Address</label>
                      <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Address</label>
                   <textarea required value={address} onChange={e => setAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all resize-none h-24" />
                </div>
             </div>
          </div>
          
          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3 sticky bottom-0 bg-white">
            <button type="submit" className="flex-1 bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

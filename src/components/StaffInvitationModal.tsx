import React, { useState } from 'react';
import { X, Send, Mail, Users2, Shield, Calendar, AlertTriangle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function StaffInvitationModal({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Cashier');
  const [branch, setBranch] = useState('Main Store');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-lg shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-[#10B981] text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-[#10B981]/30">
                <Send size={24} className="-ml-1" />
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">INVITE STAFF</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">SEND EMAIL INVITATION</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="overflow-y-auto">
          <div className="p-6 space-y-5">
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Full Name</label>
                   <input required value={name} onChange={e => setName(e.target.value)} type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Email Address</label>
                   <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="staff@company.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Role Assignment</label>
                   <select value={role} onChange={e => setRole(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all">
                     <option>Cashier</option>
                     <option>Manager</option>
                     <option>Admin</option>
                     <option>Inventory Clerk</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Branch Location</label>
                   <select value={branch} onChange={e => setBranch(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all">
                     <option>Main Store</option>
                     <option>Warehouse A</option>
                   </select>
                </div>
             </div>

             <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 text-amber-700">
                <AlertTriangle size={20} className="shrink-0" />
                <p className="text-[11px] font-medium">This will send an email invitation to the user. They must accept the link via their email and setup an account password to gain access to the chosen branch.</p>
             </div>
          </div>
          
          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3 sticky bottom-0 bg-white">
            <button type="button" onClick={onClose} className="flex-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-colors">
               Cancel
            </button>
            <button type="submit" className="flex-1 bg-[#10B981] hover:bg-[#0ea5e9] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
              <Send size={16} /> Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

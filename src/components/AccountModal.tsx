import React, { useState } from 'react';
import { X, User, Shield, Lock, Activity, Save } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function AccountModal({ isOpen, onClose, user }: Props) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'password' | 'activity'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-2xl shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-slate-900 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-slate-900/20">
                <User size={24} />
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">ACCOUNT</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">PERSONAL SETTINGS & SECURITY</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <div className="flex bg-slate-50 border-b border-slate-100 p-2 gap-2 overflow-x-auto shrink-0">
           <button onClick={() => setActiveTab('profile')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'profile' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              <User size={14} /> Profile
           </button>
           <button onClick={() => setActiveTab('security')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'security' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              <Shield size={14} /> Security
           </button>
           <button onClick={() => setActiveTab('password')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'password' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              <Lock size={14} /> Password
           </button>
           <button onClick={() => setActiveTab('activity')} className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'activity' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              <Activity size={14} /> Activity
           </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="overflow-y-auto w-full flex-1 p-6">
           {activeTab === 'profile' && (
              <div className="space-y-4">
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Full Name</label>
                    <input required defaultValue={user?.name || ''} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Email Address</label>
                    <input required defaultValue={user?.email || ''} type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all opacity-50" readOnly />
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest mt-2 ml-1">CONTACT SUPPORT TO CHANGE EMAIL.</p>
                 </div>
                 <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0  mt-auto">
                    <button type="submit" className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2">
                       <Save size={16} /> Save Profile
                    </button>
                 </div>
              </div>
           )}

           {activeTab === 'security' && (
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                       <h4 className="text-sm font-bold text-slate-800">Two-Factor Authentication</h4>
                       <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">Extra layer of security for your account.</p>
                    </div>
                    <button type="button" className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors shadow-sm">
                       Enable 2FA
                    </button>
                 </div>
                 <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between mt-4">
                    <div>
                       <h4 className="text-sm font-bold text-rose-800">Delete Account</h4>
                       <p className="text-[10px] font-bold tracking-widest text-rose-500 uppercase mt-1">Permanently remove your data.</p>
                    </div>
                    <button type="button" className="bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-colors shadow-sm">
                       Delete
                    </button>
                 </div>
              </div>
           )}

           {activeTab === 'password' && (
              <div className="space-y-4">
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Current Password</label>
                    <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">New Password</label>
                    <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1.5">Confirm New Password</label>
                    <input required type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" />
                 </div>
                 <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0  mt-auto">
                    <button type="submit" className="w-full bg-[#10B981] hover:bg-[#0ea5e9] text-white font-bold py-3.5 rounded-xl text-[11px] uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2">
                       <Lock size={16} /> Update Password
                    </button>
                 </div>
              </div>
           )}

           {activeTab === 'activity' && (
              <div className="space-y-0">
                 <div className="border-l-2 border-slate-100 ml-3 pl-4 py-2 relative">
                    <div className="absolute w-2 h-2 bg-[#10B981] rounded-full -left-[5px] top-4 ring-4 ring-white"></div>
                    <p className="text-xs font-bold text-slate-800">Password Changed</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Oct 12, 2024 - 14:02 PM • IP: 192.168.1.1</p>
                 </div>
                 <div className="border-l-2 border-slate-100 ml-3 pl-4 py-2 relative">
                    <div className="absolute w-2 h-2 bg-slate-300 rounded-full -left-[5px] top-4 ring-4 ring-white"></div>
                    <p className="text-xs font-bold text-slate-800">Login Successful</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Oct 10, 2024 - 08:30 AM • IP: 192.168.1.1</p>
                 </div>
              </div>
           )}
        </form>
      </div>
    </div>
  );
}

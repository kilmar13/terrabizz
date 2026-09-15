import React, { useState } from 'react';
import { 
  Shield, 
  Smartphone, 
  Laptop, 
  Key, 
  History, 
  LogOut, 
  Mail,
  CheckCircle2,
  Users,
  Settings2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SecuritySettings() {
  const [is2faEnabled, setIs2faEnabled] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = () => {
    alert("Password change request initiated. Please check your email for reset instructions.");
  };

  const handleLogoutAll = () => {
    if(window.confirm("Are you sure you want to log out of all other devices?")) {
      alert("Successfully logged out of all other sessions.");
    }
  };

  const handleLogoutDevice = (device: string) => {
    if(window.confirm(`Log out from ${device}?`)) {
      alert(`Logged out of ${device}.`);
    }
  };

  const handleViewHistory = () => {
    alert("Displaying full audit logs (To be integrated with real backend).");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
          <Shield size={20} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Security & Access Control</h1>
          <p className="text-sm font-medium text-slate-500">Manage your credentials, active sessions, team roles, and multi-factor security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Roles & Permissions */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col items-start shadow-sm col-span-1 md:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
            <Users size={20} className="text-purple-500" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Roles & Permissions</h3>
          <p className="text-[13px] text-slate-500 mb-6 flex-1">Configure staff access limits, view audit trails, and manage team security policies.</p>
          <button 
            onClick={() => navigate('/team')}
            className="w-full px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Settings2 size={16} /> Manage Roles
          </button>
        </div>

        {/* Password */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col items-start shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
            <Key size={20} className="text-orange-500" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Password</h3>
          <p className="text-[13px] text-slate-500 mb-6 flex-1">It's a good idea to use a strong password that you don't use elsewhere.</p>
          <button onClick={handlePasswordChange} className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors">
            Change Password
          </button>
        </div>

        {/* 2FA */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-col items-start shadow-sm">
          <div className="flex w-full justify-between items-start mb-4">
             <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
               <Smartphone size={20} className="text-indigo-500" strokeWidth={2} />
             </div>
             <div className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${is2faEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                {is2faEnabled ? 'Enabled' : 'Disabled'}
             </div>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Two-Factor Auth</h3>
          <p className="text-[13px] text-slate-500 mb-6 flex-1">Add an extra layer of security to your account. We'll ask for a code when you log in.</p>
          <button 
             onClick={() => setIs2faEnabled(!is2faEnabled)}
             className={`px-5 py-2.5 border text-xs font-bold rounded-xl transition-colors ${
               is2faEnabled 
                 ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100' 
                 : 'bg-[#10B981] border-[#10B981] text-white hover:bg-emerald-600'
             }`}
          >
            {is2faEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-slate-200 overflow-hidden shadow-sm">
        {/* Email Verification */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
               <Mail size={20} className="text-blue-500" strokeWidth={2} />
             </div>
             <div>
                <h3 className="text-[15px] font-bold text-slate-800 mb-0.5">Email Verification</h3>
                <p className="text-xs text-slate-500 font-medium">Verified on admin@terrabiz.com</p>
             </div>
          </div>
          <div className="flex items-center gap-1.5 text-[#10B981] bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
             <CheckCircle2 size={16} strokeWidth={2.5} />
             <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Verified</span>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
             <div>
                <h3 className="text-[15px] font-bold text-slate-800 mb-1">Active Sessions</h3>
                <p className="text-xs text-slate-500 font-medium">Currently logged in devices and browsers.</p>
             </div>
             <button onClick={handleLogoutAll} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 text-xs font-bold rounded-xl transition-colors">
               <LogOut size={14} strokeWidth={2.5} />
               Logout All Other Devices
             </button>
          </div>

          <div className="space-y-4">
             {/* Current Session */}
             <div className="border border-[#10B981]/30 bg-emerald-50/10 rounded-2xl p-5 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981]"></div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                     <Laptop size={20} strokeWidth={1.5} />
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-0.5">
                         <h4 className="font-bold text-slate-800 text-sm">MacBook Pro • Chrome</h4>
                         <span className="text-[9px] px-2 py-0.5 bg-[#10B981] text-white font-bold rounded uppercase tracking-widest">This Device</span>
                      </div>
                      <p className="text-xs font-medium text-slate-500">Lagos, Nigeria • IP: 102.164.21.99</p>
                   </div>
                </div>
                <div className="text-right">
                   <span className="block text-[11px] font-bold text-emerald-600">Active Now</span>
                </div>
             </div>

             {/* Phone Session */}
             <div className="border border-slate-100 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                     <Smartphone size={20} strokeWidth={1.5} />
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-0.5">
                         <h4 className="font-bold text-slate-800 text-sm">iPhone 14 Pro • Safari</h4>
                         <span className="text-[9px] px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold rounded uppercase tracking-widest">Trusted</span>
                      </div>
                      <p className="text-xs font-medium text-slate-500">Abuja, Nigeria • IP: 197.210.64.12</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="text-right">
                      <span className="block text-[11px] font-medium text-slate-400">Last active: 2 hours ago</span>
                   </div>
                   <button onClick={() => handleLogoutDevice('iPhone 14 Pro')} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                     <LogOut size={16} strokeWidth={2} />
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* Login History */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-slate-600">
                 <History size={18} />
                 <span className="text-sm font-bold">Review recent login activity and system audits</span>
              </div>
              <button onClick={handleViewHistory} className="text-[11px] font-black uppercase tracking-widest text-[#10B981] hover:text-emerald-700">
                 View Full History
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

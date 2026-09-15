import React, { useState } from 'react';
import GenericDataPage from './GenericDataPage';
import CompanyProfileModal from '../components/CompanyProfileModal';
import SubscriptionManagementModal from '../components/SubscriptionManagementModal';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'branding' | 'preferences'>('profile');
  const [isCompanyProfileOpen, setIsCompanyProfileOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  const getEmptyState = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="flex flex-col max-w-lg w-full space-y-4 text-left">
            <h3 className="text-[13px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-2">Business Profile</h3>
            <div className="space-y-4 p-4 border border-slate-200 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 bg-slate-50 border-2 border-slate-100 rounded-full mb-2"></div>
               <h4 className="text-sm font-bold text-slate-800">Terrabiz Company Ltd</h4>
               <p className="text-xs text-slate-500 font-medium mb-4">RC-123456</p>
               <button 
                 onClick={() => setIsCompanyProfileOpen(true)}
                 className="bg-slate-900 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg shadow-sm hover:bg-slate-800 transition-colors w-full"
               >
                 Company Settings
               </button>
               <button 
                 onClick={() => setIsSubscriptionOpen(true)}
                 className="bg-[#10B981] text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg shadow-sm hover:bg-emerald-600 transition-colors w-full mt-2"
               >
                 Subscription
               </button>
            </div>
          </div>
        );
      case 'branding':

        return (
          <div className="flex flex-col max-w-lg w-full space-y-4 text-left">
            <h3 className="text-[13px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-2">Logo & Colors</h3>
            <div className="border-2 border-dashed border-slate-200 p-8 rounded-xl text-center bg-white">
              <div className="w-16 h-16 bg-slate-100 rounded-xl mx-auto mb-3"></div>
              <p className="text-xs font-bold text-slate-500">Upload Company Logo</p>
            </div>
          </div>
        );
      case 'preferences':
      default:
        return (
          <div className="flex flex-col max-w-lg w-full space-y-4 text-left">
            <h3 className="text-[13px] font-black text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-2">System Preferences</h3>
            <div className="space-y-3">
               <label className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
                 <input type="checkbox" defaultChecked className="w-4 h-4 rounded appearance-none checked:bg-[#10B981] border border-slate-300" />
                 <span className="text-sm font-bold text-slate-700">Enable Email Receipts</span>
               </label>
               <label className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
                 <input type="checkbox" defaultChecked className="w-4 h-4 rounded appearance-none checked:bg-[#10B981] border border-slate-300" />
                 <span className="text-sm font-bold text-slate-700">Low Stock Notifications</span>
               </label>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <GenericDataPage
        title="Business Settings"
        subtitle="Configure your business profile, branding, and preferences..."
        actions={
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-white shadow-sm border border-slate-200 text-[#10B981]' : 'bg-transparent text-slate-500 hover:bg-slate-100'}`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveTab('branding')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'branding' ? 'bg-white shadow-sm border border-slate-200 text-[#10B981]' : 'bg-transparent text-slate-500 hover:bg-slate-100'}`}
            >
              Branding
            </button>
            <button 
              onClick={() => setActiveTab('preferences')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'preferences' ? 'bg-white shadow-sm border border-slate-200 text-[#10B981]' : 'bg-transparent text-slate-500 hover:bg-slate-100'}`}
            >
              Preferences
            </button>
          </div>
        }
        emptyState={getEmptyState()}
      />
      
      <CompanyProfileModal 
        isOpen={isCompanyProfileOpen}
        onClose={() => setIsCompanyProfileOpen(false)}
      />

      <SubscriptionManagementModal 
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />
    </>
  );
}

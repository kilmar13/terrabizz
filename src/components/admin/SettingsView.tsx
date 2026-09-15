import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Save, Settings, Globe, Mail, Shield } from 'lucide-react';
import { logAdminAction } from '../../lib/admin';

export default function SettingsView() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    websiteName: 'Terrabiz',
    contactEmail: 'support@terrabiz.com',
    phoneNumber: '+1 234 567 8900',
    homepageTagline: 'Welcome to Terrabiz Ecosystem',
    footerText: '© 2026 Terrabiz. All rights reserved.',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    registrationEnabled: true,
    marketplaceEnabled: true,
    servicesEnabled: true,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'system_settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(prev => ({ ...prev, ...docSnap.data() }));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSettings(prev => ({ ...prev, [name]: checked }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'system_settings', 'global'), settings, { merge: true });
      await logAdminAction('UPDATE_SETTINGS', 'Updated system global settings', 'admin');
      alert('Settings saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-500">Loading system configuration...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">System Configuration</h2>
          <p className="text-slate-400 text-sm mt-1">Manage core platform settings and operational parameters.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* General Info */}
        <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
             <Globe className="text-emerald-400" size={24} />
             <h3 className="text-lg font-black uppercase tracking-widest text-white">General Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Website Name</label>
                <input type="text" name="websiteName" value={settings.websiteName} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-emerald-500" />
             </div>
             <div>
                <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Homepage Tagline</label>
                <input type="text" name="homepageTagline" value={settings.homepageTagline} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-emerald-500" />
             </div>
             <div className="md:col-span-2">
                <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Footer Text</label>
                <input type="text" name="footerText" value={settings.footerText} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-emerald-500" />
             </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
             <Mail className="text-amber-400" size={24} />
             <h3 className="text-lg font-black uppercase tracking-widest text-white">Contact & Socials</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Contact Email</label>
                <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-emerald-500" />
             </div>
             <div>
                <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Phone Number</label>
                <input type="text" name="phoneNumber" value={settings.phoneNumber} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-emerald-500" />
             </div>
             <div>
                <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Facebook URL</label>
                <input type="text" name="facebookUrl" value={settings.facebookUrl} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-emerald-500" />
             </div>
             <div>
                <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Twitter URL</label>
                <input type="text" name="twitterUrl" value={settings.twitterUrl} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-emerald-500" />
             </div>
             <div>
                <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Instagram URL</label>
                <input type="text" name="instagramUrl" value={settings.instagramUrl} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-emerald-500" />
             </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
             <Shield className="text-blue-400" size={24} />
             <h3 className="text-lg font-black uppercase tracking-widest text-white">Platform Modules</h3>
          </div>
          <div className="space-y-4">
             <label className="flex items-center gap-4 cursor-pointer p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
               <input type="checkbox" name="registrationEnabled" checked={settings.registrationEnabled} onChange={handleChange} className="w-5 h-5 accent-emerald-500" />
               <div>
                  <p className="font-bold text-white uppercase text-sm tracking-wide">Enable User Registration</p>
                  <p className="text-xs text-slate-400 mt-1">Allow new users to sign up for accounts.</p>
               </div>
             </label>
             <label className="flex items-center gap-4 cursor-pointer p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
               <input type="checkbox" name="marketplaceEnabled" checked={settings.marketplaceEnabled} onChange={handleChange} className="w-5 h-5 accent-emerald-500" />
               <div>
                  <p className="font-bold text-white uppercase text-sm tracking-wide">Enable Marketplace</p>
                  <p className="text-xs text-slate-400 mt-1">Allow browsing and creating products.</p>
               </div>
             </label>
             <label className="flex items-center gap-4 cursor-pointer p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
               <input type="checkbox" name="servicesEnabled" checked={settings.servicesEnabled} onChange={handleChange} className="w-5 h-5 accent-emerald-500" />
               <div>
                  <p className="font-bold text-white uppercase text-sm tracking-wide">Enable Services</p>
                  <p className="text-xs text-slate-400 mt-1">Allow browsing and creating services.</p>
               </div>
             </label>
          </div>
        </div>

        <div className="flex justify-end">
           <button 
             disabled={saving}
             type="submit" 
             className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-colors disabled:opacity-50"
           >
             <Save size={20} /> {saving ? 'Saving...' : 'Save Configuration'}
           </button>
        </div>
      </form>
    </div>
  );
}

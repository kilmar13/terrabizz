import React, { useEffect, useState } from 'react';
import { Users, ShoppingBag, Briefcase, MessageSquare, AlertTriangle, Activity, Settings as SettingsIcon, BarChart3, Database, Ban } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

import DashboardView from '../components/admin/DashboardView';
import UsersView from '../components/admin/UsersView';
import MarketplaceView from '../components/admin/MarketplaceView';
import ServicesView from '../components/admin/ServicesView';
import ContentView from '../components/admin/ContentView';
import SupportView from '../components/admin/SupportView';
import AnalyticsView from '../components/admin/AnalyticsView';
import SettingsView from '../components/admin/SettingsView';
import SecurityView from '../components/admin/SecurityView';
import BlacklistView from '../components/admin/BlacklistView';

export default function Admin() {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    services: 0,
    reports: 0
  });

  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.role !== 'admin') return;

    // Listen to top-level collections for counts
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snap) => {
      setStats(s => ({ ...s, users: snap.size }));
      const users: any[] = [];
      snap.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      // Just sort in memory for now
      users.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setRecentUsers(users.slice(0, 5));
    });

    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snap) => {
      setStats(s => ({ ...s, products: snap.size }));
    });
    
    const unsubscribeServices = onSnapshot(collection(db, 'services'), (snap) => {
      setStats(s => ({ ...s, services: snap.size }));
    });

    const unsubscribeReports = onSnapshot(collection(db, 'reports'), (snap) => {
      setStats(s => ({ ...s, reports: snap.size }));
    });

    return () => {
      unsubscribeUsers();
      unsubscribeProducts();
      unsubscribeServices();
      unsubscribeReports();
    };
  }, [session]);

  if (session?.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="bg-[#0A0E17]/80 backdrop-blur-md border border-red-500/10 rounded-3xl p-8 max-w-sm w-full mx-auto relative z-10 shadow-2xl text-center">
          <Logo className="w-12 h-12 mx-auto mb-4 grayscale" />
          <h1 className="text-2xl font-black tracking-widest text-red-500 mb-2 uppercase">Access Denied</h1>
          <p className="text-slate-400 font-medium tracking-wide text-sm mb-6">Administrators Only.</p>
          <p className="text-slate-500 text-xs">Your account does not have sufficient permissions to view this secure area.</p>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView stats={stats} recentUsers={recentUsers} onNavigate={setActiveTab} />;
      case 'users':
        return <UsersView />;
      case 'blacklisted':
        return <BlacklistView />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'services':
        return <ServicesView />;
      case 'content':
        return <ContentView />;
      case 'support':
        return <SupportView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      case 'security':
        return <SecurityView />;
      default:
        return <DashboardView stats={stats} recentUsers={recentUsers} onNavigate={setActiveTab} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, category: 'main' },
    { id: 'users', label: 'Users', icon: Users, category: 'management' },
    { id: 'blacklisted', label: 'Blacklisted Users', icon: Ban, category: 'management' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, category: 'management' },
    { id: 'services', label: 'Services', icon: Briefcase, category: 'management' },
    { id: 'content', label: 'Content', icon: Database, category: 'management' },
    { id: 'support', label: 'Support', icon: MessageSquare, category: 'system' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, category: 'system' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, category: 'system' },
    { id: 'security', label: 'Security', icon: AlertTriangle, category: 'system' },
  ];

  return (
    <div className="min-h-screen bg-[#030509] text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#0A0E17] border-r border-white/5 flex flex-col z-20 shrink-0">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-black tracking-widest uppercase text-sm">Command Center</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.filter(item => item.category === 'main').map(item => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors mb-4 ${
                 activeTab === item.id 
                   ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                   : 'hover:bg-white/5 text-slate-300'
               }`}
             >
               <item.icon size={16} /> {item.label}
             </button>
          ))}
          
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 mt-6 px-4">Management</div>
          {navItems.filter(item => item.category === 'management').map(item => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors ${
                 activeTab === item.id 
                   ? item.id === 'blacklisted' 
                     ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                     : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                   : item.id === 'blacklisted'
                     ? 'hover:bg-white/5 text-red-400'
                     : 'hover:bg-white/5 text-slate-300'
               }`}
             >
               <item.icon size={16} /> {item.label}
             </button>
          ))}

          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 mt-6 px-4">System</div>
          {navItems.filter(item => item.category === 'system').map(item => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors ${
                 activeTab === item.id 
                   ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                   : item.id === 'security'
                     ? 'hover:bg-white/5 text-red-400'
                     : 'hover:bg-white/5 text-slate-300'
               } ${item.id === 'security' ? 'mt-auto' : ''}`}
             >
               <item.icon size={16} /> {item.label}
             </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#030509] relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="p-8 lg:p-12 relative z-10 max-w-7xl mx-auto">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
}

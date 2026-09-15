import React from 'react';
import { Users, ShoppingBag, Briefcase, AlertTriangle, Settings as SettingsIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'Mon', active: 4000, new: 2400 },
  { name: 'Tue', active: 3000, new: 1398 },
  { name: 'Wed', active: 2000, new: 9800 },
  { name: 'Thu', active: 2780, new: 3908 },
  { name: 'Fri', active: 1890, new: 4800 },
  { name: 'Sat', active: 2390, new: 3800 },
  { name: 'Sun', active: 3490, new: 4300 },
];

export default function DashboardView({ stats, recentUsers, onNavigate }: any) {
  return (
    <>
      <header className="flex justify-between items-end mb-12">
        <div>
          <p className="text-emerald-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-2">Live System Status: Optimal</p>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">Platform Overview</h1>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#0A0E17]/80 backdrop-blur-md border border-emerald-500/10 hover:border-emerald-500/30 transition-colors rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:cursor-pointer" onClick={() => onNavigate('users')}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Users size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Total Users</h3>
          </div>
          <p className="text-4xl font-black text-white">{stats.users}</p>
        </div>

        <div className="bg-[#0A0E17]/80 backdrop-blur-md border border-white/5 hover:border-white/20 transition-colors rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:cursor-pointer" onClick={() => onNavigate('marketplace')}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/10 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ShoppingBag size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Active Listings</h3>
          </div>
          <p className="text-4xl font-black text-white">{stats.products}</p>
        </div>

        <div className="bg-[#0A0E17]/80 backdrop-blur-md border border-white/5 hover:border-white/20 transition-colors rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:cursor-pointer" onClick={() => onNavigate('services')}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Briefcase size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Services</h3>
          </div>
          <p className="text-4xl font-black text-white">{stats.services}</p>
        </div>

        <div className="bg-[#0A0E17]/80 backdrop-blur-md border border-white/5 hover:border-white/20 transition-colors rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:cursor-pointer" onClick={() => onNavigate('security')}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Pending Reports</h3>
          </div>
          <p className="text-4xl font-black text-white">{stats.reports}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Chart */}
         <div className="lg:col-span-2 bg-[#0A0E17] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
           <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6">Activity Trends</h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', color: '#F8FAFC' }} />
                  <Area type="monotone" dataKey="active" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
         </div>

         {/* System Health */}
        <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6">System Health</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Database Latency</span>
                   <span className="text-xs font-bold text-emerald-400">12ms</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[15%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">API Uptime</span>
                   <span className="text-xs font-bold text-emerald-400">99.99%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[100%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Storage Capacity</span>
                   <span className="text-xs font-bold text-emerald-400">2% Used</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[2%]" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
             <button onClick={() => onNavigate('settings')} className="text-xs uppercase tracking-widest font-bold text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-2">
               <SettingsIcon size={14} /> Configure System
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
           <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6">Recent Registrations</h3>
           <div className="space-y-4">
             {recentUsers.length === 0 ? (
               <div className="p-8 text-center bg-white/5 rounded-2xl border border-white/5">
                 <p className="text-sm text-slate-500 font-medium">No real-time user registrations found.</p>
               </div>
             ) : (
               recentUsers.map((u: any, i: number) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => onNavigate('users')}>
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-sm text-emerald-400">
                       {u.email?.[0]?.toUpperCase()}
                     </div>
                     <div>
                       <p className="text-sm font-bold text-white tracking-wide">{u.email}</p>
                       <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Role: {u.role}</p>
                     </div>
                   </div>
                   <div className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                     {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'New'}
                   </div>
                 </div>
               ))
             )}
           </div>
        </div>
        
        {/* Live Activity Feed */}
        <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
           <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6 flex justify-between items-center">
             Live Activity Feed <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
           </h3>
           <div className="space-y-6">
             <div className="flex items-start gap-4">
               <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500 shrink-0" />
               <div>
                 <p className="text-sm text-slate-300 font-medium">Command Center components initialized successfully.</p>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Just now</p>
               </div>
             </div>
             <div className="flex items-start gap-4">
               <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0" />
               <div>
                 <p className="text-sm text-slate-300 font-medium">Real-time database sync established.</p>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">1 min ago</p>
               </div>
             </div>
           </div>
        </div>

      </div>
    </>
  );
}

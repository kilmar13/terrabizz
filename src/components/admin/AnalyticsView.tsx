import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';

const userGrowthData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 250 },
  { name: 'Mar', value: 380 },
  { name: 'Apr', value: 500 },
  { name: 'May', value: 720 },
  { name: 'Jun', value: 950 },
];

const transactionData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 19 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 25 },
  { name: 'Fri', count: 32 },
  { name: 'Sat', count: 45 },
  { name: 'Sun', count: 30 },
];

export default function AnalyticsView() {
  const [stats, setStats] = useState({ users: 0, products: 0, services: 0 });

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, 'users'), (snap) => setStats(s => ({ ...s, users: snap.size })));
    const unsubProducts = onSnapshot(collection(db, 'products'), (snap) => setStats(s => ({ ...s, products: snap.size })));
    const unsubServices = onSnapshot(collection(db, 'services'), (snap) => setStats(s => ({ ...s, services: snap.size })));
    return () => { unsubUsers(); unsubProducts(); unsubServices(); };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">Analytics Dashboard</h2>
          <p className="text-slate-400 text-sm mt-1">Real-time platform metrics and performance indicators.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6 shadow-2xl">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Registered Users</h3>
           <p className="text-4xl font-black text-emerald-400">{stats.users}</p>
        </div>
        <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6 shadow-2xl">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Active Listings</h3>
           <p className="text-4xl font-black text-amber-400">{stats.products}</p>
        </div>
        <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-6 shadow-2xl">
           <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Services</h3>
           <p className="text-4xl font-black text-blue-400">{stats.services}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-8 shadow-2xl">
           <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6">User Growth (YTD)</h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', color: '#F8FAFC' }} />
                  <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
         </div>

         <div className="bg-[#0A0E17] border border-white/5 rounded-3xl p-8 shadow-2xl">
           <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6">Weekly Transactions</h3>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#334155" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', color: '#F8FAFC' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
         </div>
      </div>
    </div>
  );
}

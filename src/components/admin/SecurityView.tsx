import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Activity, ShieldAlert, Monitor, Terminal } from 'lucide-react';

export default function SecurityView() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We try to query order by timestamp desc
    const q = query(collection(db, 'activity_logs'), orderBy('timestamp', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setLogs(list);
      setLoading(false);
    }, (error) => {
      console.error(error);
      // Fallback if index not ready
      if (error.message.includes('index')) {
        const fallbackUnsub = onSnapshot(collection(db, 'activity_logs'), (snap) => {
          const l: any[] = [];
          snap.forEach(doc => l.push({ id: doc.id, ...doc.data() }));
          l.sort((a,b) => (b.timestamp?.toMillis?.() || 0) - (a.timestamp?.toMillis?.() || 0));
          setLogs(l.slice(0, 50));
          setLoading(false);
        });
        return fallbackUnsub;
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">Security & Logs</h2>
          <p className="text-slate-400 text-sm mt-1">Audit administrative actions and monitor security events.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0A0E17] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
               <ShieldAlert size={20} />
             </div>
             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Status</h3>
           </div>
           <p className="text-2xl font-black text-emerald-400 uppercase mt-4">Protected</p>
        </div>
        <div className="bg-[#0A0E17] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
               <Monitor size={20} />
             </div>
             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Sessions</h3>
           </div>
           <p className="text-2xl font-black text-white uppercase mt-4">1</p>
        </div>
        <div className="bg-[#0A0E17] border border-white/5 rounded-2xl p-6 shadow-xl">
           <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
               <Terminal size={20} />
             </div>
             <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Logged Actions (50)</h3>
           </div>
           <p className="text-2xl font-black text-white uppercase mt-4">{logs.length}</p>
        </div>
      </div>

      <div className="bg-[#0A0E17] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
           <Activity className="text-emerald-400" size={20} />
           <h3 className="text-sm font-black uppercase tracking-widest text-white">System Activity Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Time</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Description</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-sans font-medium">Loading logs...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-sans font-medium">No activity logged.</td></tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-emerald-400/70">
                      {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-white/5 text-slate-300 px-2 py-1 rounded font-sans">
                        {log.actionType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {log.description}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {log.adminEmail}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

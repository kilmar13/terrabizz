import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import { logAdminAction } from '../../lib/admin';

export default function SupportView() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reports'), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setReports(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'reports', id), { status: newStatus });
      await logAdminAction('UPDATE_REPORT_STATUS', `Changed report ${id} status to ${newStatus}`, 'admin');
    } catch (error) {
      console.error(error);
      alert('Failed to update report status');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(`Are you sure you want to delete this report?`)) {
      try {
        await deleteDoc(doc(db, 'reports', id));
        await logAdminAction('DELETE_REPORT', `Deleted report ${id}`, 'admin');
      } catch (error) {
        console.error(error);
        alert('Failed to delete report.');
      }
    }
  };

  const filtered = reports.filter(r => 
    (r.reason || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (r.reporterEmail || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">Support & Reports</h2>
          <p className="text-slate-400 text-sm mt-1">Manage user reports and support tickets.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search reports..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0A0E17] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-[#0A0E17] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Report Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Target</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-medium">Loading reports...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-medium">No reports found.</td></tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{item.reason || 'No Reason Provided'}</span>
                        <span className="text-xs text-slate-400 mt-1 line-clamp-1">{item.description}</span>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-2">By: {item.reporterEmail || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{item.targetType}</span>
                        <span className="text-[10px] text-slate-500 break-all">{item.targetId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.status === 'RESOLVED' ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                          <CheckCircle size={12} /> Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">
                          <AlertTriangle size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-400">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       {item.status !== 'RESOLVED' && (
                         <button 
                           onClick={() => handleStatusChange(item.id, 'RESOLVED')}
                           className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors border border-transparent hover:border-emerald-500/20"
                           title="Mark as Resolved"
                         >
                           <CheckCircle size={16} />
                         </button>
                       )}
                       <button 
                         onClick={() => handleDelete(item.id)}
                         className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                         title="Delete Report"
                       >
                         <Trash2 size={16} />
                       </button>
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

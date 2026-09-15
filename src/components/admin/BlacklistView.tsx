import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, ShieldAlert, Trash2, Ban } from 'lucide-react';
import { logAdminAction } from '../../lib/admin';

export default function BlacklistView() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const userList: any[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.status === 'BLACKLISTED') {
          userList.push({ id: doc.id, ...data });
        }
      });
      setUsers(userList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (userId: string, newStatus: string, email: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
      await logAdminAction('REMOVE_BLACKLIST', `Restored user ${email} to ${newStatus}`, 'admin');
      alert(`User restored to ${newStatus}`);
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (userId: string, email: string) => {
    if (confirm(`Are you sure you want to permanently delete blacklisted user ${email}?`)) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        await logAdminAction('DELETE_USER', `Deleted blacklisted user ${email}`, 'admin');
        alert('User deleted.');
      } catch (error) {
        console.error(error);
        alert('Failed to delete user.');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">Blacklisted Users</h2>
          <p className="text-slate-400 text-sm mt-1">Review and manage restricted accounts.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0A0E17] border border-white/5 rounded-xl text-sm focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-[#0A0E17] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">User</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Blacklisted Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Reason</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-medium">Loading blacklisted users...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-medium">No blacklisted users found.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center font-bold text-sm text-red-400 shrink-0">
                          <Ban size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{user.name || 'Unknown Name'}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400">
                      {user.blacklistDate ? new Date(user.blacklistDate).toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">
                        {user.blacklistReason || 'Violations of terms of service.'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                         <button 
                           onClick={() => handleStatusChange(user.id, 'ACTIVE', user.email)}
                           className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors border border-transparent hover:border-emerald-500/20"
                           title="Remove Blacklist"
                         >
                           <ShieldAlert size={16} />
                         </button>
                       <button 
                         onClick={() => handleDelete(user.id, user.email)}
                         className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                         title="Delete User"
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

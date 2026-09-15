import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, ShieldAlert, CheckCircle, Ban, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { logAdminAction } from '../../lib/admin';

export default function UsersView() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const userList: any[] = [];
      snapshot.forEach(doc => {
        userList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(userList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (userId: string, newStatus: string, email: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
      await logAdminAction('UPDATE_USER_STATUS', `Changed user ${email} status to ${newStatus}`, 'admin');
      alert(`User status updated to ${newStatus}`);
    } catch (error) {
      console.error(error);
      alert('Failed to update status');
    }
  };

  const handleBlacklist = async (userId: string, email: string) => {
    const reason = prompt("Enter reason for blacklisting:");
    if (reason) {
      try {
        await updateDoc(doc(db, 'users', userId), { 
          status: 'BLACKLISTED',
          blacklistReason: reason,
          blacklistDate: Date.now()
        });
        await logAdminAction('BLACKLIST_USER', `Blacklisted user ${email}. Reason: ${reason}`, 'admin');
        alert('User has been blacklisted.');
      } catch (error) {
        console.error(error);
        alert('Failed to blacklist user.');
      }
    }
  };

  const handleDelete = async (userId: string, email: string) => {
    if (confirm(`Are you sure you want to delete user ${email}? This action cannot be undone.`)) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        await logAdminAction('DELETE_USER', `Deleted user ${email}`, 'admin');
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
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">User Management</h2>
          <p className="text-slate-400 text-sm mt-1">Manage platform users, roles, and access.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
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
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">User</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Joined</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Role</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-medium">Loading users...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-medium">No users found.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-sm text-emerald-400 shrink-0">
                          {user.email?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{user.name || 'Unknown Name'}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-400">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-white/5 text-slate-300 px-3 py-1 rounded-full border border-white/5">
                        {user.role || 'USER'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.status === 'BLACKLISTED' ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
                          <Ban size={12} /> Blacklisted
                        </span>
                      ) : user.status === 'SUSPENDED' ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">
                          <AlertCircle size={12} /> Suspended
                        </span>
                      ) : user.status === 'VERIFIED' ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
                          <CheckCircle size={12} /> Verified
                        </span>
                      ) : user.status === 'PENDING' ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-slate-500/10 text-slate-400 px-3 py-1 rounded-full border border-slate-500/20">
                          <AlertCircle size={12} /> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                          <CheckCircle size={12} /> Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       {user.status !== 'BLACKLISTED' ? (
                         <button 
                           onClick={() => handleBlacklist(user.id, user.email)}
                           className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                           title="Blacklist User"
                         >
                           <Ban size={16} />
                         </button>
                       ) : (
                         <button 
                           onClick={() => handleStatusChange(user.id, 'ACTIVE', user.email)}
                           className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors border border-transparent hover:border-emerald-500/20"
                           title="Remove Blacklist"
                         >
                           <ShieldAlert size={16} />
                         </button>
                       )}
                       {user.status !== 'SUSPENDED' && user.status !== 'BLACKLISTED' && (
                         <button 
                           onClick={() => handleStatusChange(user.id, 'SUSPENDED', user.email)}
                           className="p-2 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors border border-transparent hover:border-amber-500/20"
                           title="Suspend User"
                         >
                           <AlertCircle size={16} />
                         </button>
                       )}
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

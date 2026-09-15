import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, CheckCircle, Ban, Eye, Edit, Trash2, Package, AlertCircle } from 'lucide-react';
import { logAdminAction } from '../../lib/admin';

export default function MarketplaceView() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setProducts(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string, title: string) => {
    try {
      await updateDoc(doc(db, 'products', id), { status: newStatus });
      await logAdminAction('UPDATE_PRODUCT_STATUS', `Changed product "${title}" status to ${newStatus}`, 'admin');
    } catch (error) {
      console.error(error);
      alert('Failed to update product status');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete product "${title}"?`)) {
      try {
        await deleteDoc(doc(db, 'products', id));
        await logAdminAction('DELETE_PRODUCT', `Deleted product "${title}"`, 'admin');
      } catch (error) {
        console.error(error);
        alert('Failed to delete product.');
      }
    }
  };

  const filtered = products.filter(p => 
    (p.title || p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">Marketplace Management</h2>
          <p className="text-slate-400 text-sm mt-1">Review, approve, and manage product listings.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products..." 
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
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Product</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-medium">Loading marketplace...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-medium">No products found.</td></tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Package size={20} className="text-slate-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white max-w-[200px] truncate">{item.title || item.name || 'Untitled'}</p>
                          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">{item.vendorName || 'Unknown Vendor'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-300">
                        {item.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-emerald-400">
                        ₦{(item.price || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.status === 'REJECTED' ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
                          <Ban size={12} /> Rejected
                        </span>
                      ) : item.status === 'PENDING' ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">
                          <AlertCircle size={12} /> Pending Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                          <CheckCircle size={12} /> Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       {item.status !== 'ACTIVE' && (
                         <button 
                           onClick={() => handleStatusChange(item.id, 'ACTIVE', item.title || item.name)}
                           className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors border border-transparent hover:border-emerald-500/20"
                           title="Approve Listing"
                         >
                           <CheckCircle size={16} />
                         </button>
                       )}
                       {item.status !== 'REJECTED' && (
                         <button 
                           onClick={() => handleStatusChange(item.id, 'REJECTED', item.title || item.name)}
                           className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                           title="Reject Listing"
                         >
                           <Ban size={16} />
                         </button>
                       )}
                       <button 
                         className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/20"
                         title="View Details"
                       >
                         <Eye size={16} />
                       </button>
                       <button 
                         onClick={() => handleDelete(item.id, item.title || item.name)}
                         className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                         title="Delete Listing"
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

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, Plus, Edit, Trash2, Save } from 'lucide-react';
import { logAdminAction } from '../../lib/admin';

export default function ContentView() {
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', identifier: '' });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'content_blocks'), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setContentBlocks(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.identifier) return alert("Identifier is required");

    try {
      if (editingId && editingId !== 'new') {
        await setDoc(doc(db, 'content_blocks', editingId), editForm, { merge: true });
        await logAdminAction('UPDATE_CONTENT', `Updated content block ${editForm.identifier}`, 'admin');
      } else {
        await setDoc(doc(db, 'content_blocks', editForm.identifier), editForm);
        await logAdminAction('CREATE_CONTENT', `Created content block ${editForm.identifier}`, 'admin');
      }
      setEditingId(null);
      setEditForm({ title: '', content: '', identifier: '' });
      alert("Content saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save content.");
    }
  };

  const handleDelete = async (id: string, identifier: string) => {
    if (confirm(`Are you sure you want to delete content block ${identifier}?`)) {
      try {
        await deleteDoc(doc(db, 'content_blocks', id));
        await logAdminAction('DELETE_CONTENT', `Deleted content block ${identifier}`, 'admin');
      } catch (error) {
        console.error(error);
        alert('Failed to delete content.');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase">Content Management</h2>
          <p className="text-slate-400 text-sm mt-1">Manage dynamic platform content.</p>
        </div>
        <button 
          onClick={() => { setEditingId('new'); setEditForm({ title: '', content: '', identifier: '' }); }}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
        >
          <Plus size={16} /> New Block
        </button>
      </div>

      {editingId && (
        <div className="bg-[#0A0E17] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <h3 className="text-lg font-black text-white uppercase tracking-widest mb-4">
            {editingId === 'new' ? 'Create Content Block' : 'Edit Content Block'}
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Identifier (e.g. homepage_hero)</label>
                  <input required disabled={editingId !== 'new'} type="text" value={editForm.identifier} onChange={e => setEditForm({...editForm, identifier: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 disabled:opacity-50" />
               </div>
               <div>
                  <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Title</label>
                  <input required type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500" />
               </div>
            </div>
            <div>
               <label className="block text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">Content HTML/Text</label>
               <textarea required rows={5} value={editForm.content} onChange={e => setEditForm({...editForm, content: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500" />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingId(null)} className="px-6 py-3 border border-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"><Save size={16} /> Save Content</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           <p className="text-slate-500">Loading content...</p>
        ) : contentBlocks.length === 0 ? (
           <p className="text-slate-500">No content blocks found.</p>
        ) : contentBlocks.map(block => (
           <div key={block.id} className="bg-[#0A0E17] border border-white/5 rounded-2xl p-6 shadow-xl relative group">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2 py-1 rounded">{block.identifier}</span>
                    <h4 className="text-white font-bold mt-3">{block.title}</h4>
                 </div>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingId(block.id); setEditForm(block); }} className="text-slate-400 hover:text-white transition-colors"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(block.id, block.identifier)} className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                 </div>
              </div>
              <p className="text-sm text-slate-400 line-clamp-3">{block.content}</p>
           </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import GenericDataPage from './GenericDataPage';
import RegisterStoreModal from '../components/RegisterStoreModal';

export default function StoresLocations() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [stores, setStores] = useState<any[]>([]);

  return (
    <>
      <GenericDataPage
        title="STORE LOCATIONS"
        subtitle="Manage your physical and virtual business outlets."
        searchPlaceholder="Search stores..."
        actions={
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-sm hover:bg-slate-800 transition-colors"
          >
            + ADD STORE
          </button>
        }
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">STORE NAME</th>
              <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">LOCATION</th>
              <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">MANAGER</th>
              <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">CONTACT</th>
              <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">ESTABLISHED</th>
              <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {stores.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-24 text-center">
                  <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    NO STORES REGISTERED
                  </h3>
                </td>
              </tr>
            ) : (
              stores.map((store, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-bold text-slate-800">{store.name}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">{store.location}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">{store.manager}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">{store.contact}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">{store.established}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700">EDIT</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </GenericDataPage>
      <RegisterStoreModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={(store: any) => setStores([...stores, store])} />
    </>
  );
}

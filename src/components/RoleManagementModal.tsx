import React, { useState, useEffect } from 'react';
import { X, Shield, Save, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  staff: any;
}

export default function RoleManagementModal({ isOpen, onClose, staff }: Props) {
  const [permissions, setPermissions] = useState({
    dashboard: false,
    products: false,
    inventory: false,
    sales: false,
    customers: false,
    reports: false,
    settings: false,
  });

  useEffect(() => {
    if (staff) {
      // Default fake bindings based on role
      setPermissions({
        dashboard: true,
        products: staff.role === 'Manager' || staff.role === 'Admin',
        inventory: staff.role === 'Manager' || staff.role === 'Admin' || staff.role === 'Inventory Clerk',
        sales: true,
        customers: staff.role === 'Manager' || staff.role === 'Admin',
        reports: staff.role === 'Manager' || staff.role === 'Admin',
        settings: staff.role === 'Admin',
      });
    }
  }, [staff]);

  if (!isOpen || !staff) return null;

  const handleToggle = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const modules = [
    { key: 'dashboard', label: 'Dashboard Access', desc: 'Allows viewing of top level metrics.' },
    { key: 'products', label: 'Product Management', desc: 'Add, update, or remove products.' },
    { key: 'inventory', label: 'Inventory Management', desc: 'Stock adjustments and transfers.' },
    { key: 'sales', label: 'Sales Management', desc: 'Access to POS and order history.' },
    { key: 'customers', label: 'Customer Management', desc: 'Manage customer data.' },
    { key: 'reports', label: 'Reports Access', desc: 'Export reports and deep analytics.' },
    { key: 'settings', label: 'Settings Access', desc: 'Manage system settings.' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-lg shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-[#0F172A] text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-slate-900/30">
                <Shield size={24} />
             </div>
             <div>
               <h2 className="text-xl font-black text-[#0F172A] italic uppercase tracking-tight">ROLE MANAGEMENT</h2>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{staff.name || 'Staff'}</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <form onSubmit={handleSave} className="overflow-y-auto w-full">
          <div className="p-6 space-y-4">
             {modules.map(({ key, label, desc }) => (
               <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => handleToggle(key as any)}>
                 <div>
                    <h3 className="text-sm font-bold text-slate-800">{label}</h3>
                    <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase mt-0.5">{desc}</p>
                 </div>
                 <div className={`w-10 h-6 rounded-full p-1 transition-colors ${permissions[key as keyof typeof permissions] ? 'bg-[#10B981]' : 'bg-slate-300'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${permissions[key as keyof typeof permissions] ? 'translate-x-4' : 'translate-x-0'}`}></div>
                 </div>
               </div>
             ))}
          </div>

          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3 sticky bottom-0 bg-white">
            <button type="submit" className="flex-1 bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2">
              <Save size={16} /> Save Allocations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import GenericDataPage from './GenericDataPage';
import RegisterCustomerModal from '../components/RegisterCustomerModal';
import CustomerProfileModal from '../components/CustomerProfileModal';
import { Eye, Mail, Phone } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CustomerManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [customers, setCustomers] = useState<any[]>([]);

  const viewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsProfileModalOpen(true);
  };

  return (
    <>
      <GenericDataPage
        title="CUSTOMER MANAGEMENT"
        subtitle="Manage your customer relationships and tracking history."
        searchPlaceholder="Search by name, phone or email..."
        actions={
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-slate-900 border border-slate-900 text-white text-xs font-bold rounded-lg shadow-sm"
          >
            + NEW CUSTOMER
          </button>
        }
        emptyState={
          <div className="flex flex-col items-center flex-1 justify-center h-full min-h-[400px]">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
               <span className="text-2xl font-black">?</span>
            </div>
            <h3 className="text-[14px] text-slate-800 mb-2">No customers found.</h3>
          </div>
        }
      >
        {customers.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto w-full">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Contact</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Type</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, idx) => (
                  <tr key={c.id} className={cn("hover:bg-slate-50 transition-colors", idx !== customers.length - 1 && "border-b border-slate-100")}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs uppercase shadow-inner">
                           {c.name.substring(0, 2)}
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-800">{c.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-0.5">{c.address}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Phone size={12} className="text-slate-400" /> {c.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Mail size={12} className="text-slate-400" /> {c.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                         c.type === 'Retail' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 border' :
                         'bg-purple-50 text-purple-600 border-purple-100 border'
                      }`}>
                         {c.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => viewCustomer(c)} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors ml-auto shadow-sm">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GenericDataPage>
      
      <RegisterCustomerModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <CustomerProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} customer={selectedCustomer} />
    </>
  );
}

import React, { useState } from 'react';
import { Plus, Search, Filter, Truck, Eye } from 'lucide-react';
import { cn } from '../lib/utils';
import NewSupplierRegistrationModal from '../components/NewSupplierRegistrationModal';
import SupplierDetailsModal from '../components/SupplierDetailsModal';

export default function Suppliers() {
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('ALL STATUS');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [suppliers, setSuppliers] = useState<any[]>([]);

  const viewSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsDetailsModalOpen(true);
  };

  const handleAddSupplier = (supplier: any) => {
    setSuppliers(prev => [...prev, supplier]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">SUPPLIERS & DEBT MANAGEMENT</h1>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">TRACK PROCUREMENT, PAYMENTS, AND UPCOMING VENDOR LIABILITIES.</p>
        </div>
        
        <button 
           onClick={() => setIsAddModalOpen(true)}
           className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          NEW SUPPLIER
        </button>
      </div>

      <NewSupplierRegistrationModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddSupplier} />
      <SupplierDetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} supplier={selectedSupplier} />

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Total Outstanding Debt Card */}
        <div className="bg-[#0f172a] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-lg shadow-slate-900/10 min-h-[160px]">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">TOTAL OUTSTANDING DEBT</span>
          <div className="mt-4 mb-6">
            <span className="text-5xl font-black text-[#10B981] tracking-tight shrink-0">#0</span>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <div className="w-2 h-2 rounded-full bg-amber-600"></div>
            <span className="text-xs text-slate-400 font-medium tracking-wide">Liabilities across 0 vendors</span>
          </div>
        </div>

        {/* Upcoming Payments Card */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm min-h-[160px]">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">UPCOMING PAYMENTS</span>
          <div className="mt-4 mb-4 flex items-baseline gap-3">
            <span className="text-5xl font-black text-slate-900 tracking-tight">0</span>
            <span className="text-xs text-slate-500 font-medium">Due within 7 days</span>
          </div>
          <div className="mt-auto"></div>
        </div>

        {/* Procurement Categories Card */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-6 sm:p-8 flex flex-col justify-center items-center shadow-sm min-h-[160px]">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center">PROCUREMENT CATEGORIES</span>
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col pt-2">
        {/* Filter Row */}
        <div className="p-4 sm:p-5 flex flex-col xl:flex-row items-center gap-4">
          <div className="relative w-full xl:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by company name or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto mt-2 xl:mt-0 xl:ml-auto relative">
            <div className="relative">
              <button 
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center justify-between gap-3 w-full sm:w-auto px-4 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black tracking-widest whitespace-nowrap hover:bg-slate-50 transition-colors uppercase text-slate-700"
              >
                <span className="flex items-center gap-2"><Filter size={14} className="text-slate-400"/> {statusFilter}</span>
                <span className="text-slate-400 text-[10px]">▼</span>
              </button>
              
              {showStatusDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full sm:w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-2">
                  {['ALL STATUS', 'HAS PENDING', 'HAS PARTIAL'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowStatusDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[10px] font-black tracking-widest uppercase text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="w-full sm:w-auto px-5 py-3 bg-white border border-slate-200 rounded-full text-[10px] font-black tracking-widest whitespace-nowrap hover:bg-slate-50 transition-colors uppercase text-slate-700">
              SHOW DEBTORS ONLY
            </button>
            <div className="w-full sm:w-auto pl-2 text-right sm:text-left hidden lg:block">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 inline-block align-middle pb-0.5">SORTED BY NEXT DUE DATE</span>
            </div>
          </div>
        </div>

        {/* Table Head */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr>
                <th className="px-6 pb-4 pt-2 font-black text-[10px] uppercase tracking-widest text-slate-500 w-[25%]">SUPPLIER</th>
                <th className="px-6 pb-4 pt-2 font-black text-[10px] uppercase tracking-widest text-slate-500 text-center w-[20%]">TOTAL DEBT</th>
                <th className="px-6 pb-4 pt-2 font-black text-[10px] uppercase tracking-widest text-slate-500 w-[20%]">NEXT DUE DATE</th>
                <th className="px-6 pb-4 pt-2 font-black text-[10px] uppercase tracking-widest text-slate-500 w-[20%] text-center">TRANSACTIONS</th>
                <th className="px-6 pb-4 pt-2 font-black text-[10px] uppercase tracking-widest text-slate-500 text-right w-[15%]">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="border-t border-slate-100">
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Truck size={48} strokeWidth={1.5} className="text-slate-200" />
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">NO MATCHING SUPPLIERS FOUND</span>
                    </div>
                  </td>
                </tr>
              ) : (
                suppliers.map((s, idx) => (
                  <tr key={s.id} className={cn("hover:bg-slate-50 transition-colors", idx !== suppliers.length - 1 && "border-b border-slate-100")}>
                    <td className="px-6 py-4">
                      <p className="font-black text-slate-800 text-sm">{s.name}</p>
                      <p className="font-bold text-slate-400 text-[10px]">{s.email}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-black tracking-tighter ${s.debt !== '₦0' ? 'text-rose-500' : 'text-slate-600'}`}>{s.debt}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-600 text-xs">
                      {s.nextDue}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-bold text-slate-500">12</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => viewSupplier(s)} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors ml-auto shadow-sm">
                        <Eye size={14} />
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

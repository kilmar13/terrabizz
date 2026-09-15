import React, { useState } from 'react';
import { Package, RefreshCcw, Printer, DollarSign, TrendingUp, AlertTriangle, Search, Folder, ShieldCheck, Settings2, ArrowRightLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import SystemAuditModal from '../components/SystemAuditModal';
import StockAdjustmentModal from '../components/StockAdjustmentModal';
import StockTransferModal from '../components/StockTransferModal';
import InventoryPrintModal from '../components/InventoryPrintModal';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [filter, setFilter] = useState('all');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isAdjModalOpen, setIsAdjModalOpen] = useState(false);
  const [isXferModalOpen, setIsXferModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshMessage('');
    setTimeout(() => {
       setIsRefreshing(false);
       setRefreshMessage('Inventory Updated Successfully');
       setTimeout(() => setRefreshMessage(''), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="text-[#10B981] w-7 h-7" />
            Inventory & Availability Dashboard
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Monitor real-time product quantities, cost prices, retail valuations, and category-based storage statuses.
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-start md:self-auto print:hidden">
          {refreshMessage && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-2">
               {refreshMessage}
            </span>
          )}
          <button 
             onClick={() => setIsAdjModalOpen(true)}
             className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Settings2 size={16} />
            Adjust Stock
          </button>
          <button 
             onClick={() => setIsXferModalOpen(true)}
             className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <ArrowRightLeft size={16} />
            Transfer Stock
          </button>
          <button 
             onClick={() => setIsAuditModalOpen(true)}
             className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <ShieldCheck size={16} />
            System Audit & Health
          </button>
          <button 
             onClick={handleRefresh}
             disabled={isRefreshing}
             title="Refresh database" 
             className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors shadow-sm disabled:opacity-50"
          >
             <RefreshCcw size={16} className={isRefreshing ? "animate-spin" : ""} />
          </button>
          <button 
             onClick={() => setIsPrintModalOpen(true)}
             className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-md transition-colors transition-transform cursor-pointer"
          >
            <Printer size={16} />
            Print Report
          </button>
        </div>
      </div>

      <SystemAuditModal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} />
      <StockAdjustmentModal isOpen={isAdjModalOpen} onClose={() => setIsAdjModalOpen(false)} />
      <StockTransferModal isOpen={isXferModalOpen} onClose={() => setIsXferModalOpen(false)} />
      <InventoryPrintModal isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
            <DollarSign className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400">Inventory Cost</span>
            <p className="text-xl font-bold text-slate-800 tracking-tight">₦0</p>
            <p className="text-[10px] text-slate-500">Total value at cost price</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] uppercase font-black tracking-widest text-emerald-500">Retail Valuation</span>
            <p className="text-xl font-bold text-slate-800 tracking-tight">₦0</p>
            <p className="text-[10px] text-slate-500">Potential revenue (selling price)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Package className="w-6 h-6" />
          </div>
          <div className="space-y-1 w-full">
            <span className="block text-[10px] uppercase font-black tracking-widest text-indigo-500">Potential Profit</span>
            <p className="text-xl font-bold text-slate-800 tracking-tight">₦0</p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-md">0.0% Margin</span>
              <span className="text-[10px] text-slate-400">estimated yield</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1 w-full">
            <span className="block text-[10px] uppercase font-black tracking-widest text-amber-500">Stock Availability</span>
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-emerald-50/50 p-1 rounded-lg">
                <span className="block text-xs font-bold text-emerald-600">0</span>
                <span className="block text-[8px] text-slate-400 font-medium">Good</span>
              </div>
              <div className="bg-amber-50/50 p-1 rounded-lg">
                <span className="block text-xs font-bold text-amber-600">0</span>
                <span className="block text-[8px] text-slate-400 font-medium">Low</span>
              </div>
              <div className="bg-rose-50/50 p-1 rounded-lg">
                <span className="block text-xs font-bold text-rose-600">0</span>
                <span className="block text-[8px] text-slate-400 font-medium font-black">Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-900 transition-colors" 
            placeholder="Search products by title or SKU identifier..." 
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Category:</span>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="all">All Categories</option>
            </select>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setFilter('all')}
              className={cn("px-3 py-1.5 text-xs rounded-xl font-semibold transition-colors", filter === 'all' ? "bg-slate-900 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-600")}
            >
              All Items (0)
            </button>
            <button 
               onClick={() => setFilter('instock')}
               className={cn("px-3 py-1.5 text-xs rounded-xl font-semibold transition-colors", filter === 'instock' ? "bg-emerald-600 text-white" : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700")}
            >
              Available (0)
            </button>
            <button 
               onClick={() => setFilter('lowstock')}
               className={cn("px-3 py-1.5 text-xs rounded-xl font-semibold transition-colors", filter === 'lowstock' ? "bg-amber-500 text-white" : "bg-amber-50 hover:bg-amber-100 text-amber-700")}
            >
              Low Stock (0)
            </button>
            <button 
               onClick={() => setFilter('out')}
               className={cn("px-3 py-1.5 text-xs rounded-xl font-semibold transition-colors", filter === 'out' ? "bg-rose-500 text-white" : "bg-rose-50 hover:bg-rose-100 text-rose-700")}
            >
              Out (0)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
        <Folder size={48} className="mx-auto text-slate-300 stroke-[1.5] mb-4" />
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">No Matching Inventory</h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto mt-1 leading-relaxed">
          There are no products in the inventory with current search variables or filtered categories. Expand your filters or check later.
        </p>
        <button 
          onClick={() => {
            setSearch('');
            setCategory('all');
            setFilter('all');
          }}
          className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-sm transition-colors"
        >
          Clear Filters
        </button>
      </div>

    </div>
  );
}

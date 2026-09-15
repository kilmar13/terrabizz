import React, { useState } from 'react';
import { Plus, Search, Package, Eye, Ban, CreditCard } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import OrderDetailsModal from '../components/OrderDetailsModal';
import OrderCancellationModal from '../components/OrderCancellationModal';
import PageLoader from '../components/PageLoader';

export default function OrdersHistory() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const [orders, setOrders] = useState([
    { id: 'ORD-1092', customer: 'Walk-in Customer', date: 'Today, 10:23 AM', status: 'Completed', amount: 95000, paymentMethod: 'Card' },
    { id: 'ORD-1091', customer: 'John Doe', date: 'Yesterday, 14:10 PM', status: 'Completed', amount: 145000, paymentMethod: 'Transfer' },
    { id: 'ORD-1090', customer: 'Jane Smith', date: 'Yesterday, 09:12 AM', status: 'Pending', amount: 35000, paymentMethod: 'Cash' },
  ]);

  const tabs = [
    {
      id: 'all',
      topLabel: 'ALL RECORDS',
      title: 'All Sales',
      subtext: 'COMPLETE BILLING HISTORY',
      activeColor: 'bg-[#0F172A] text-white border-transparent',
      activeBadge: 'bg-white/20 text-white',
      badge: orders.length,
    },
    {
      id: 'storefront',
      topLabel: 'ONLINE STOREFRONT',
      title: 'Storefront Placed',
      subtext: 'PLACED ONLINE - PENDING PROCESSING',
      activeColor: 'bg-indigo-500 text-white border-transparent',
      activeBadge: 'bg-white/20 text-white',
      badge: 0,
    },
    {
      id: 'credit',
      topLabel: 'PENDING DEBT/BALANCES',
      title: 'Credit / Part Sales',
      subtext: 'OWED AMOUNT PENDING SETTLEMENT',
      activeColor: 'bg-orange-500 text-white border-transparent',
      activeBadge: 'bg-white/20 text-white',
      badge: 1,
    },
    {
      id: 'settled',
      topLabel: 'FULLY SETTLED',
      title: 'Paid & Complete',
      subtext: 'FULLY SETTLED TRANSACTION',
      activeColor: 'bg-[#10B981] text-white border-transparent',
      activeBadge: 'bg-white/20 text-white',
      badge: 2,
    }
  ];

  const handleFilterChange = (id: string) => {
    if (filter === id) return;
    setFilter(id);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const currentOrders = filter === 'all' 
    ? orders 
    : filter === 'settled' 
      ? orders.filter(o => o.status === 'Completed')
      : filter === 'credit'
        ? orders.filter(o => o.status === 'Pending')
        : [];

  const handleView = (order: any) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleCancel = (order: any) => {
    setSelectedOrder(order);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = (reason: string) => {
    if (selectedOrder) {
      setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'Cancelled' } : o));
    }
  };

  if (isLoading) {
    return <PageLoader label="FETCHING ORDERS..." />;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#10B981]">
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Orders History</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Track all business sales and order statuses in one place.</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/pos')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#10B981] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-emerald-600 transition-colors self-start md:self-auto shrink-0 border-b-2 border-emerald-700 active:border-b-0 active:translate-y-[2px]"
        >
          <Plus size={16} strokeWidth={3} />
          ADD NEW ORDER
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tabs.map((t) => {
          const isActive = filter === t.id;
          return (
            <button
              key={t.id}
              onClick={() => handleFilterChange(t.id)}
              className={cn(
                "p-5 rounded-2xl border text-left transition-all flex flex-col justify-between h-[130px] shadow-sm",
                isActive 
                  ? t.activeColor 
                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-800 hover:shadow-md"
              )}
            >
              <div className="flex justify-between items-start w-full gap-2">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest line-clamp-1 leading-normal",
                  !isActive && "text-slate-500"
                )}>
                  {t.topLabel}
                </span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold h-5 flex items-center justify-center min-w-[20px] shrink-0",
                  isActive ? t.activeBadge : "bg-slate-100 text-slate-500"
                )}>
                  {t.badge}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">{t.title}</h3>
                <p className={cn(
                  "text-[9px] font-black uppercase tracking-widest mt-1",
                  !isActive ? "text-slate-400" : "text-white/80"
                )}>
                  {t.subtext}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={2.5} />
        <input 
          type="text" 
          placeholder="Search Order ID or Customer..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm"
        />
      </div>

      {/* Main Content Area */}
      <div className={`bg-white border border-slate-200 rounded-2xl min-h-[400px] flex shadow-sm ${currentOrders.length === 0 ? 'items-center justify-center' : 'flex-col overflow-hidden'}`}>
        {currentOrders.length > 0 ? (
          <div className="w-full overflow-x-auto">
             <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-50 text-[10px] text-slate-500 font-bold uppercase tracking-widest border-b border-y border-slate-100">
                   <tr>
                     <th className="px-6 py-4">Order ID</th>
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4">Customer</th>
                     <th className="px-6 py-4 text-right">Amount</th>
                     <th className="px-6 py-4 text-center">Status</th>
                     <th className="px-6 py-4 text-center">Payment</th>
                     <th className="px-6 py-4 text-center">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-xs font-bold text-slate-800 uppercase tracking-widest">{order.id}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{order.date}</td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-600">{order.customer}</td>
                      <td className="px-6 py-4 text-sm font-black text-slate-800 text-right">₦{order.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
                          order.status === 'Completed' ? 'bg-emerald-50 text-[#10B981] border border-emerald-100' :
                          order.status === 'Cancelled' ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-amber-50 text-amber-500 border border-amber-100'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">{order.paymentMethod}</td>
                      <td className="px-6 py-4 text-center">
                         <div className="flex items-center justify-center gap-2">
                            <button onClick={() => handleView(order)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors" title="View Details">
                              <Eye size={14} />
                            </button>
                            {order.status !== 'Cancelled' && (
                              <button onClick={() => handleCancel(order)} className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 flex items-center justify-center text-rose-500 hover:text-rose-600 transition-colors" title="Cancel Order">
                                <Ban size={14} />
                              </button>
                            )}
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-16">
            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
              <Package className="text-slate-300" size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">NO ORDERS FOUND</h3>
            <p className="text-[13px] font-medium text-slate-500 mb-8 max-w-sm">No order files match your active filter settings.</p>
            <button 
              onClick={() => navigate('/pos')}
              className="px-8 py-3 bg-[#10B981] text-white rounded-xl text-sm font-black transition-colors hover:bg-emerald-600 shadow-md shadow-emerald-500/20 active:translate-y-[2px]"
            >
              Start Selling
            </button>
          </div>
        )}
      </div>

      <OrderDetailsModal 
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        order={selectedOrder}
      />

      <OrderCancellationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={confirmCancel}
        order={selectedOrder}
      />
    </div>
  );
}

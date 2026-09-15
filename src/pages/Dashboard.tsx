import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  RefreshCw, MapPin, ChevronDown, Lock, Printer, Plus, User, Activity, AlertTriangle 
} from 'lucide-react';
import { cn } from '../lib/utils';
import EndOfDayReconciliationModal from '../components/EndOfDayReconciliationModal';
import SystemAuditModal from '../components/SystemAuditModal';
import BranchSelectorModal from '../components/BranchSelectorModal';
import DetailedAnalyticsModal from '../components/DetailedAnalyticsModal';
import PageLoader from '../components/PageLoader';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { products, orders, isDriveSyncing, syncToDrive } = useApp();
  const { googleAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isEodModalOpen, setIsEodModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({ title: '', value: '', type: 'number' });
  const [activeTab, setActiveTab] = useState<'overview' | 'staff'>('overview');

  React.useEffect(() => {
    // Simulate loading to match the video
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const openAnalytics = (title: string, value: string, type: 'currency' | 'number' = 'number') => {
    setAnalyticsData({ title, value, type });
    setIsAnalyticsModalOpen(true);
  };

  const totalProducts = products.length;
  const stockValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const salesValue = products.reduce((sum, p) => sum + (p.price * p.stock * 1.5), 0);
  const lowStockCount = products.filter(p => p.stock < 10).length;

  if (isLoading) {
    return <PageLoader label="LOADING DASHBOARD..." />;
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
        <div className="space-y-3">
           <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Eromarth</h1>
              <button 
                onClick={() => googleAccessToken ? syncToDrive() : null}
                className={cn(
                  "flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider transition-colors",
                  googleAccessToken 
                    ? isDriveSyncing ? "text-amber-600 bg-amber-100" : "text-[#10B981] bg-emerald-100 cursor-pointer hover:bg-emerald-200"
                    : "text-slate-500 bg-slate-200/50"
                )}>
                 <RefreshCw size={12} strokeWidth={3} className={isDriveSyncing ? "animate-spin" : ""} /> 
                 {googleAccessToken ? (isDriveSyncing ? 'SYNCING TO DRIVE' : 'DRIVE SYNC ON') : 'LAST SYNCED: JUST NOW'}
              </button>
           </div>
           
           <button onClick={() => setIsBranchModalOpen(true)} className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-50 text-slate-700">
             <MapPin size={14} className="text-slate-400" />
             ALL LOCATIONS
             <ChevronDown size={14} className="text-slate-400" />
           </button>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
           <div className="flex bg-slate-200/60 p-1 rounded-lg self-start lg:self-end">
             <button 
              onClick={() => setActiveTab('overview')}
              className={cn("px-4 py-1.5 text-xs font-bold rounded-md transition-colors", activeTab === 'overview' ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700")}
             >
              OVERVIEW
             </button>
             <button 
              onClick={() => setActiveTab('staff')}
              className={cn("px-4 py-1.5 text-xs font-bold rounded-md transition-colors", activeTab === 'staff' ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700")}
             >
              STAFF ACTIVITY
             </button>
           </div>
           <div className="flex gap-2 w-full sm:w-auto">
             <button 
                onClick={() => setIsEodModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex-1 sm:flex-none"
             >
               <Lock size={16} /> Close Business
             </button>
             <button 
                onClick={() => navigate('/orders-history')}
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm text-slate-700 flex-1 sm:flex-none">
               <Printer size={16} /> Terminal
             </button>
             <button 
               onClick={() => navigate('/orders-history')}
               className="flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2 rounded-lg text-sm font-bold uppercase transition-colors shadow-sm flex-1 sm:flex-none"
             >
               <Plus size={18} strokeWidth={3} /> ORDER
             </button>
           </div>
        </div>
      </div>

      {/* Greeting Card */}
      <div className="bg-white rounded-[14px] border border-slate-200 p-3 shadow-sm flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-[#F1F5F9] flex items-center justify-center border border-slate-200 text-slate-400 shrink-0">
          <User size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-slate-800 tracking-tight">Good Evening, Eromosele David <span role="img" aria-label="wave">👋🏽</span></h2>
          <p className="text-slate-500 text-xs font-semibold mt-0.5">Progress is great! You're up by ₦0.</p>
        </div>
      </div>

      <EndOfDayReconciliationModal isOpen={isEodModalOpen} onClose={() => setIsEodModalOpen(false)} />
      <SystemAuditModal isOpen={isAuditModalOpen} onClose={() => setIsAuditModalOpen(false)} />
      <BranchSelectorModal isOpen={isBranchModalOpen} onClose={() => setIsBranchModalOpen(false)} />
      <DetailedAnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        title={analyticsData.title}
        value={analyticsData.value}
        type={analyticsData.type}
      />

      {activeTab === 'overview' ? (
        <>
          {/* LIQUIDITY OVERVIEW */}
          <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm overflow-hidden text-slate-800">
            <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2 font-bold text-slate-700 text-xs tracking-wider uppercase">
                 <Activity size={16} className="text-[#10B981]" strokeWidth={2.5} /> LIQUIDITY OVERVIEW
              </div>
              <div className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest hidden sm:block">
                NET POSITION: ₦0
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="p-6 pb-8 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => openAnalytics('TOTAL RECEIVABLES', '₦0', 'currency')}>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">TOTAL RECEIVABLES</h3>
                <div className="text-4xl font-black text-[#10B981] mb-2 tracking-tighter">₦0</div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">OWED BY CUSTOMERS</p>
              </div>
              <div className="p-6 pb-8 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => openAnalytics('TOTAL PAYABLES', '₦0', 'currency')}>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">TOTAL PAYABLES</h3>
                <div className="text-4xl font-black text-rose-500 mb-2 tracking-tighter">₦0</div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">OWED TO SUPPLIERS</p>
              </div>
              <div className="p-6 pb-8">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">NET POSITION INDICATOR</h3>
                <div className="flex items-center gap-2 text-xl font-black text-[#10B981] mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span> HEALTHY BALANCE
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4">RECEIVABLES VS PAYABLES</p>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[ 
              { title: "TODAY'S SALES", value: '₦0', sub: 'Gross Daily Volume', valColor: 'text-[#10B981]', type: 'currency' },
              { title: "INVENTORY ITEMS", value: totalProducts.toString(), sub: 'across categories', valColor: 'text-slate-800', type: 'number' },
              { title: "STOCK VALUE", value: `₦${stockValue.toLocaleString()}`, sub: 'total cost basis', valColor: 'text-slate-800', type: 'currency' },
              { title: "SALES VALUE", value: `₦${salesValue.toLocaleString()}`, sub: 'potential revenue', valColor: 'text-slate-800', type: 'currency' },
              { title: "SUPPLIER DEBT", value: '₦0', sub: 'Payables to Vendors', valColor: 'text-slate-800', type: 'currency' },
            ].map(m => (
               <div key={m.title} onClick={() => openAnalytics(m.title, m.value, m.type as 'currency' | 'number')} className="bg-white px-4 py-5 rounded-[14px] border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#10B981] transition-colors">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{m.title}</h3>
                  <div className={`text-[28px] font-black mb-1.5 tracking-tight ${m.valColor}`}>{m.value}</div>
                  <p className="text-[10px] text-slate-400 font-bold">{m.sub}</p>
               </div>
            ))}
          </div>

          {/* Two Column Layout for the rest */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
            
            <div className="lg:col-span-2 space-y-6">
              {/* Low Stock Alerts */}
              <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-6 border-l-[6px] border-l-amber-500 flex flex-col items-start gap-4">
                 <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                   <AlertTriangle size={14} className="text-amber-500" />
                   LOW STOCK ALERTS
                 </h3>
                 <div className="text-5xl font-black text-amber-500 tracking-tighter">{lowStockCount}</div>
                 <button onClick={() => navigate('/products')} className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3.5 py-2 rounded-md border border-amber-200 uppercase tracking-widest hover:bg-amber-100 transition-colors">
                   VIEW RESTOCK LIST
                 </button>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white">
                  <h3 className="text-sm font-bold text-slate-800">Recent Orders</h3>
                  <button onClick={() => navigate('/orders-history')} className="text-xs font-bold text-[#10B981] hover:underline">See All Orders</button>
                </div>
                <div className="overflow-x-auto min-h-[300px] flex flex-col">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-slate-50/50 text-[10px] text-slate-500 font-bold uppercase tracking-widest border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">ORDER ID</th>
                        <th className="px-6 py-4">CUSTOMER</th>
                        <th className="px-6 py-4">DATE</th>
                        <th className="px-6 py-4 text-right">AMOUNT</th>
                        <th className="px-6 py-4">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm font-semibold">
                            No activity yet
                          </td>
                        </tr>
                      ) : (
                        orders.slice(0, 5).map(o => (
                          <tr key={o.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                            <td className="px-6 py-4 text-sm font-bold">{o.id.substring(0,8)}</td>
                            <td className="px-6 py-4 text-sm">{o.customer || 'Walk-in'}</td>
                            <td className="px-6 py-4 text-sm text-slate-500">{new Date(o.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-sm font-bold text-right text-emerald-600">₦{o.total.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-bold uppercase tracking-wider">{o.status}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm overflow-hidden">
                 <div className="px-6 py-5 border-b border-slate-200 bg-white">
                   <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest">INVENTORY DISTRIBUTION</h3>
                 </div>
                 <div className="p-6 space-y-5">
                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-700 tracking-wider">
                       <span>HIGH DEMAND</span>
                       <span className="text-slate-400">0%</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-700 tracking-wider">
                       <span>REGULAR</span>
                       <span className="text-slate-400">0%</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-700 tracking-wider">
                       <span>STAGNANT</span>
                       <span className="text-slate-400">0%</span>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-900 rounded-[14px] border border-slate-800 shadow-xl p-5 flex items-center justify-between text-white relative overflow-hidden">
                 <div className="absolute right-0 top-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                 <div className="flex gap-4 items-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                    <div>
                       <div className="text-[11px] font-bold uppercase tracking-widest mb-0.5 shadow-sm">SYSTEM LIVE & SYNCED</div>
                       <div className="text-[9px] text-slate-400 font-semibold tracking-wider">LAST SYNC: JUST NOW</div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-6">
                   <div className="flex justify-between items-start mb-6">
                     <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PLAN STATUS</h3>
                     <span className="text-[9px] font-black text-[#10B981] bg-emerald-50 px-2.5 py-1 rounded-sm uppercase tracking-wider border border-emerald-100">ACTIVE</span>
                   </div>
                   <div className="text-3xl font-black text-slate-800 tracking-tight mb-1">OWNER</div>
                   <div className="text-[11px] font-bold text-slate-400 mb-8 tracking-wide">Enterprise Business Control</div>
                   <button onClick={() => navigate('/subscription')} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-lg shadow-slate-900/20">
                     MANAGE ACCESS
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 min-h-[400px]">
          <div className="flex items-center gap-2 mb-6 text-slate-600">
            <RefreshCw size={18} />
            <h3 className="text-sm font-bold uppercase tracking-widest">RECENT STAFF OPERATIONS</h3>
            <button onClick={() => setIsAuditModalOpen(true)} className="ml-auto text-[10px] font-black text-[#10B981] uppercase tracking-widest">FULL AUDIT LOG</button>
          </div>
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <RefreshCw size={40} className="text-slate-200 mb-4" />
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">NO STAFF ACTIVITY RECORDED</p>
          </div>
        </div>
      )}
    </div>
  );
}

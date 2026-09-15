import React from 'react';
import { X, Bell, Package, AlertCircle, Calendar } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenterModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-sm shadow">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-50 text-slate-700 rounded-[14px] flex items-center justify-center border border-slate-200">
                <Bell size={20} />
             </div>
             <div>
               <h2 className="text-sm font-black text-[#0F172A] uppercase tracking-tight">NOTIFICATIONS</h2>
               <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">3 UNREAD MESSAGES</p>
             </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <div className="flex bg-slate-50 border-b border-slate-100 py-2 px-3 gap-2">
           <button className="flex-1 bg-white text-slate-800 border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-widest py-2 shadow-sm">All</button>
           <button className="flex-1 text-slate-500 hover:text-slate-800 rounded-lg text-[9px] font-black uppercase tracking-widest py-2">Sales</button>
           <button className="flex-1 text-slate-500 hover:text-slate-800 rounded-lg text-[9px] font-black uppercase tracking-widest py-2">System</button>
        </div>

        <div className="overflow-y-auto w-full flex-1 p-3 space-y-2">
           {/* Notif 1 */}
           <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 flex gap-4 cursor-pointer hover:bg-emerald-50 transition-colors">
              <div className="w-8 h-8 bg-emerald-100 text-[#10B981] rounded-lg border border-emerald-200 flex items-center justify-center shrink-0">
                 <Package size={16} />
              </div>
              <div className="flex-1">
                 <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">New Order Received</h4>
                 <p className="text-[11px] font-medium text-slate-500 leading-snug">Order #TRX-9982 requires fulfillment via Storefront.</p>
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2 block">2 min ago</span>
              </div>
           </div>

           {/* Notif 2 */}
           <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100/50 flex gap-4 cursor-pointer hover:bg-rose-50 transition-colors">
              <div className="w-8 h-8 bg-rose-100 text-rose-500 rounded-lg border border-rose-200 flex items-center justify-center shrink-0">
                 <AlertCircle size={16} />
              </div>
              <div className="flex-1">
                 <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Low Stock Alert</h4>
                 <p className="text-[11px] font-medium text-slate-500 leading-snug">Logitech Master 3s has dropped below minimum threshold.</p>
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2 block">1 hr ago</span>
              </div>
           </div>

           {/* Notif 3 */}
           <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50 flex gap-4 cursor-pointer hover:bg-indigo-50 transition-colors">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-500 rounded-lg border border-indigo-200 flex items-center justify-center shrink-0">
                 <Calendar size={16} />
              </div>
              <div className="flex-1">
                 <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Subscription Renewal</h4>
                 <p className="text-[11px] font-medium text-slate-500 leading-snug">Your Pro Business plan will automatically renew on Dec 12.</p>
                 <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2 block">1 day ago</span>
              </div>
           </div>
        </div>

        <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 bg-white mt-auto">
           <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-[10px] uppercase font-black tracking-widest transition-colors block text-center">
              Mark all as read
           </button>
        </div>
      </div>
    </div>
  );
}

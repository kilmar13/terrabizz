import React, { useState } from 'react';
import { Package, Search, ShoppingBag, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import Logo from '../components/Logo';

import PageLoader from '../components/PageLoader';

export default function Storefront() {
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader label="OPENING STOREFRONT..." />;
  }

  return (
    <div className="flex flex-col h-screen bg-white relative overflow-hidden">
      {/* Top Banner */}
      <div className="bg-[#10B981] text-white px-6 py-2.5 flex items-center justify-between shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-4 overflow-hidden w-full">
          <span className="text-[11px] font-black tracking-widest shrink-0 uppercase">FRONT IS LIVE:</span>
          <span className="text-[11px] font-medium truncate opacity-90 underline decoration-white/30 underline-offset-4 cursor-pointer hover:opacity-100 transition-opacity">https://terrabiz.com/store/biz_yqqpt04o5</span>
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="shrink-0 ml-4 px-4 py-1.5 bg-[#042F2E] text-[#10B981] hover:bg-[#064E3B] hover:text-white transition-colors text-[10px] font-black rounded-lg uppercase tracking-widest shadow-sm">
          BACK TO APP
        </button>
      </div>

      {/* Main Container simulating browser view */}
      <div className="flex-1 bg-white relative flex flex-col">
        {/* Store Header */}
        <div className="bg-[#0F172A] px-6 lg:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shrink-0 z-10 w-full relative">
          <div className="text-white">
            <h1 className="text-4xl lg:text-[40px] font-bold tracking-tight mb-4">Eromarth</h1>
            <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
              <div className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                <MapPin size={16} strokeWidth={2} />
                <span>Online Store</span>
              </div>
              <div className="flex items-center gap-2 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
                <Phone size={16} strokeWidth={2} />
                <span>07039942882</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-right">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">ITEMS IN CART</span>
              <span className="block text-4xl font-black text-white leading-none">0</span>
            </div>
            <button 
              onClick={() => setShowCart(true)}
              className="px-8 py-4 bg-[#10B981] hover:bg-emerald-600 transition-all duration-300 text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:translate-y-[2px]"
            >
              Checkout Now
            </button>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-white border-b border-slate-100 px-6 lg:px-12 py-6 flex items-center gap-4 shrink-0 z-10 w-full">
          <div className="flex-1 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Search for items..." 
              className="w-full pl-14 pr-4 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-[15px] font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400 shadow-sm"
            />
          </div>
          <button className="px-10 py-4 bg-[#0F172A] text-white rounded-2xl text-[15px] font-bold shadow-md hover:bg-slate-800 transition-colors shrink-0">
            All
          </button>
        </div>

        {/* Store Content */}
        <div className="flex-1 bg-slate-50/30 flex flex-col items-center justify-center p-8 text-center relative z-0">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 border border-emerald-100 shadow-sm">
            <Package size={28} className="text-[#10B981]" strokeWidth={2} />
          </div>
          <h2 className="text-[26px] font-bold text-slate-800 mb-3 tracking-tight">Welcome to our store!</h2>
          <p className="text-base font-medium text-slate-500">Products coming soon. Stay tuned!</p>
        </div>

        {/* Cart Overlay */}
        {showCart && (
          <div className="absolute inset-0 z-50 flex justify-end">
            <div 
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] transition-opacity cursor-pointer" 
              onClick={() => setShowCart(false)}
            ></div>
            <div className="relative w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3 text-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <ShoppingBag size={18} strokeWidth={2.5} className="text-[#10B981]" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Your Order</h2>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-50/50">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-5 border border-slate-100 shadow-sm">
                  <ShoppingBag size={28} className="text-slate-300" strokeWidth={1.5} />
                </div>
                <p className="text-[15px] font-medium text-slate-400">Your cart is empty.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

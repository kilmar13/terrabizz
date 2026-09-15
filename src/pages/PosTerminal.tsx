import React, { useState } from 'react';
import { 
  Mic, Sparkles, Camera, Search, Barcode, 
  Package, ShoppingCart, User, CreditCard, ChevronRight, History,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal';
import RecentActivityModal from '../components/RecentActivityModal';
import VoicePosModal from '../components/VoicePosModal';
import VisualNotepadScannerModal from '../components/VisualNotepadScannerModal';
import AIBunchProductScannerModal from '../components/AIBunchProductScannerModal';
import BarcodeScannerModal from '../components/BarcodeScannerModal';

export default function PosTerminal() {
  const navigate = useNavigate();
  // Remove Fake Data
  const [ticketItems, setTicketItems] = useState<any[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  
  const [isVoicePosOpen, setIsVoicePosOpen] = useState(false);
  const [isNotepadScannerOpen, setIsNotepadScannerOpen] = useState(false);
  const [isBunchScannerOpen, setIsBunchScannerOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notFound, setNotFound] = useState(false);

  const subTotal = ticketItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subTotal * 0.075;
  const total = subTotal + tax;

  const handleCheckout = () => {
    if (ticketItems.length > 0 && paymentMethod) {
      setIsPaymentModalOpen(true);
    } else if (!paymentMethod) {
      alert("Please select a building payment method.");
    }
  };

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    setTicketItems([]);
    setPaymentMethod('');
  };

  const handleScan = () => {
     if (searchQuery.trim() !== '') {
       setNotFound(true);
       setTimeout(() => setNotFound(false), 3000);
     } else {
       setIsScannerOpen(true);
     }
  };

  const paymentOptions = [
    { id: 'Cash', color: 'text-emerald-600 bg-emerald-50 border-emerald-500', activeBg: 'bg-emerald-500 text-white' },
    { id: 'Bank Transfer', color: 'text-blue-600 bg-blue-50 border-blue-500', activeBg: 'bg-blue-500 text-white' },
    { id: 'POS/Card', color: 'text-purple-600 bg-purple-50 border-purple-500', activeBg: 'bg-purple-500 text-white' },
    { id: 'Mobile Wallet', color: 'text-orange-600 bg-orange-50 border-orange-500', activeBg: 'bg-orange-500 text-white' },
    { id: 'Credit Sale', color: 'text-rose-600 bg-rose-50 border-rose-500', activeBg: 'bg-rose-500 text-white' },
  ];

  return (
    <div className="h-full flex flex-col gap-4 max-w-[1600px] mx-auto min-h-[700px]">
      {/* Incomplete Catalog Banner */}
      <div className="bg-white border border-slate-200 rounded-[14px] shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-400 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-800 mb-0.5">Incomplete Catalog State</h3>
            <p className="text-[10px] font-bold text-slate-500">This store has no active products in inventory. Please add products to your stock catalog.</p>
          </div>
        </div>
        <button onClick={() => navigate('/inventory')} className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors shadow-sm shrink-0">
          Add Stock
        </button>
      </div>

      {/* Top Bar Card */}
      <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm p-3 flex flex-col xl:flex-row items-center gap-4 shrink-0">
        <div className="flex items-center gap-3 shrink-0 px-2 lg:w-64">
           <div className="w-10 h-10 bg-[#E2F7EB] rounded-lg flex items-center justify-center border border-emerald-100">
              <div className="w-5 h-5 text-[#10B981] font-black text-center leading-none text-xl">U</div>
           </div>
           <div>
             <h2 className="text-[17px] font-black text-slate-800 tracking-tight uppercase leading-none">Eromarth</h2>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">High-Speed Checkout</p>
           </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
           <button onClick={() => setIsVoicePosOpen(true)} title="Voice POS" className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full text-purple-600 text-[10px] items-center justify-center font-black uppercase tracking-widest hover:bg-purple-100 transition-colors shadow-sm">
             <Mic size={14} strokeWidth={2.5} /> Voice POS
           </button>
           <button onClick={() => setIsNotepadScannerOpen(true)} title="Scan Notepad" className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-600 text-[10px] items-center justify-center font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors shadow-sm">
             <Sparkles size={14} strokeWidth={2.5} /> Scan Notepad
           </button>
           <button onClick={() => setIsBunchScannerOpen(true)} title="Camera Scanner" className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-600 text-[10px] items-center justify-center font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors shadow-sm">
             <Camera size={14} strokeWidth={2.5} /> Scan
           </button>
        </div>

        <div className="flex-1 w-full xl:w-auto relative group flex">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <Search size={18} className="text-slate-400 group-focus-within:text-[#10B981] transition-colors" strokeWidth={2.5} />
           </div>
           <input 
             type="text" 
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
             onKeyDown={(e) => { if(e.key === 'Enter') handleScan(); }}
             placeholder="Search products (SKU or Name)... [Ctrl+F]" 
             className="block w-full pl-11 pr-12 py-3 border border-slate-200 rounded-full bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] text-sm font-semibold transition-colors shadow-sm"
           />
           <button onClick={() => setIsScannerOpen(true)} className="absolute inset-y-0 right-1.5 top-1.5 bottom-1.5 px-3 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
             <Barcode size={18} strokeWidth={2.5} />
           </button>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 h-full min-h-0 overflow-hidden">
        
        {/* Pick Items Section */}
        <div className="flex-1 bg-white rounded-[14px] border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full">
           <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-800 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
                 <Package size={14} className="text-[#10B981]" strokeWidth={2.5} />
                 Pick Items
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 0 Items Available
              </div>
           </div>
           <div className="flex-1 overflow-y-auto bg-white p-4 custom-scrollbar relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="mb-4">
                  <div className="relative">
                     <Search size={64} className="text-slate-300" strokeWidth={2} />
                  </div>
                </div>
                {notFound ? (
                   <>
                      <h3 className="text-[13px] font-black text-rose-500 uppercase tracking-widest mb-2">Product Not Found</h3>
                      <p className="text-[11px] font-bold text-slate-400 tracking-wide">
                        Check the barcode or adjust your search query.
                      </p>
                   </>
                ) : (
                   <>
                      <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-widest mb-2">No Products Found</h3>
                      <p className="text-[11px] font-bold text-slate-400 tracking-wide">
                        Adjust your search query or check your inventory<br/>status.
                      </p>
                   </>
                )}
              </div>
           </div>
        </div>

        {/* Active Cart Section */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col shrink-0 lg:overflow-visible h-full">
           <div className="bg-white rounded-[14px] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full relative z-10">
             
             {/* Header */}
             <div className="bg-[#0B1020] px-6 py-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2 text-[11px] font-bold text-white uppercase tracking-widest border border-slate-700 bg-slate-800/50 px-3 py-1.5 rounded-md">
                   <ShoppingCart size={14} className="text-[#10B981]" strokeWidth={2.5} />
                   Active Cart
                </div>
                <button 
                   onClick={() => setTicketItems([])}
                   className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
                >
                   Clear
                </button>
             </div>

             <div className="p-6 flex-1 flex flex-col">
               
               {/* Spacer that will shrink/grow based on items */}
               <div className="flex-1 min-h-[50px]">
                  {ticketItems.length === 0 && (
                     <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                        <ShoppingCart size={48} strokeWidth={1} className="mb-2 opacity-50" />
                        <p className="text-xs font-bold uppercase tracking-widest">Cart is empty</p>
                     </div>
                  )}
               </div>

               {/* Cart Content (Lower Area) */}
               <div className="space-y-6 shrink-0 mt-auto">
                 
                 {/* Linked Customer */}
                 <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <User size={12} strokeWidth={2.5} />
                       Linked Customer
                    </label>
                    <div className="relative">
                       <select className="appearance-none block w-full pl-4 pr-10 py-3.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] text-[13px] font-bold text-slate-800 transition-colors shadow-sm cursor-pointer hover:border-slate-300">
                         <option>Walk-in Customer</option>
                       </select>
                       <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                       </div>
                    </div>
                 </div>

                 {/* Payment Method */}
                 <div className="space-y-3">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <CreditCard size={12} strokeWidth={2.5} />
                       Payment Method
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {paymentOptions.map((method) => {
                         const isActive = paymentMethod === method.id;
                         return (
                           <button 
                             key={method.id} 
                             onClick={() => setPaymentMethod(method.id)}
                             className={`min-w-[55px] px-3 py-3 rounded-full text-[10px] font-black uppercase tracking-wider transition-all shadow-sm border flex items-center gap-1.5 justify-center ${
                               isActive
                                 ? `${method.activeBg} border-transparent scale-105` 
                                 : `bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-800`
                             }`}
                           >
                              {isActive && <CheckCircle2 size={12} strokeWidth={3} />}
                             {method.id}
                           </button>
                         );
                      })}
                    </div>
                 </div>

                 {/* Action Button */}
                 <button 
                   onClick={handleCheckout}
                   disabled={ticketItems.length === 0 || !paymentMethod}
                   className="w-full bg-[#0B1020] hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-5 px-6 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-xl shadow-slate-900/10 flex items-center justify-between group mt-2"
                 >
                    <span>Finalize Store Sale</span>
                    <ChevronRight size={16} className="text-slate-400 group-hover:text-white transition-colors" strokeWidth={2.5} />
                 </button>
                 
               </div>

               {/* Footer link */}
               <div className="mt-8 pt-5 border-t border-slate-100 flex justify-center shrink-0">
                  <button onClick={() => setIsActivityModalOpen(true)} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">
                    <History size={12} strokeWidth={2.5} />
                    Recent Terminal Activity
                  </button>
               </div>

             </div>
           </div>
        </div>

      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
        itemsCount={ticketItems.reduce((acc, i) => acc + i.qty, 0)}
        onComplete={handlePaymentComplete}
        paymentMethod={paymentMethod}
      />
      
      <RecentActivityModal 
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />

      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      <VoicePosModal
        isOpen={isVoicePosOpen}
        onClose={() => setIsVoicePosOpen(false)}
      />

      <VisualNotepadScannerModal
        isOpen={isNotepadScannerOpen}
        onClose={() => setIsNotepadScannerOpen(false)}
      />

      <AIBunchProductScannerModal
        isOpen={isBunchScannerOpen}
        onClose={() => setIsBunchScannerOpen(false)}
      />
    </div>
  );
}

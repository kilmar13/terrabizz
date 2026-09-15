import React, { useState, useEffect, useRef } from 'react';
import { X, Image as ImageIcon, Barcode, Loader2, Camera } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: Props) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [sku, setSku] = useState('');
  const [classification, setClassification] = useState<'physical' | 'service'>('physical');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    if (isScannerOpen) {
      startCamera();
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScannerOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] w-full  md:max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-2xl shadow">
        
        {/* Header */}
        <div className="shrink-0 p-4 sm:p-6 flex items-center justify-between bg-white z-10 w-full sticky top-0 border-b border-slate-100">
          <h2 className="text-[13px] font-black tracking-widest text-slate-800 uppercase">
            New Inventory Item
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Classification (Optional)</label>
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setClassification('physical')}
                className={`flex-1 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-lg transition-colors ${classification === 'physical' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Physical Product
              </button>
              <button
                onClick={() => setClassification('service')}
                className={`flex-1 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-lg transition-colors ${classification === 'service' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Service
              </button>
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mb-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer group">
             <ImageIcon size={24} className="mb-3 text-slate-300 group-hover:text-slate-700 transition-colors" />
             <span className="text-xs font-bold uppercase tracking-widest group-hover:text-slate-800 transition-colors text-slate-400">
               {classification === 'physical' ? 'CLICK TO UPLOAD PRODUCT IMAGE' : 'CLICK TO UPLOAD SERVICE IMAGE'}
             </span>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                {classification === 'physical' ? 'Item Name' : 'Service Name'}
              </label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  SKU / Barcode (Optional)
                </label>
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. PRD-12345" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" 
                  />
                  <button 
                    onClick={() => setIsScannerOpen(true)}
                    className="absolute right-3 text-slate-400 hover:text-[#10B981] transition-colors p-1 bg-white border border-slate-200 rounded-md shadow-sm"
                  >
                    <Barcode size={16} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Store Location</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all text-slate-700 appearance-none cursor-pointer">
                  <option value="">Select Store</option>
                  <option value="main">Lagos Mainland</option>
                  <option value="island">Lagos Island</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                {classification === 'physical' ? 'Item Description (Optional)' : 'Service Description (Optional)'}
              </label>
              <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all resize-none"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  {classification === 'physical' ? 'Price (₦)' : 'Selling Price / Charge (₦)'}
                </label>
                <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  {classification === 'physical' ? 'Cost (₦)' : 'Cost Price (Optional) (₦)'}
                </label>
                <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
              </div>

              {classification === 'physical' && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Initial Stock</label>
                    <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Low Stock Alert</label>
                    <input type="number" defaultValue="5" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all text-slate-700 appearance-none cursor-pointer">
                <option value="">Select Category</option>
                <option value="uncategorized">Uncategorized</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex">
          <button className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white px-6 py-4 rounded-xl text-[11px] font-black tracking-widest uppercase transition-colors shadow-lg shadow-[#10B981]/20">
            Save Item
          </button>
        </div>
      </div>

      {/* Barcode Scanner Nested Modal */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
          <div className="bg-white rounded-[24px] w-full  md:max-w-[320px] shadow-2xl p-0 animate-in zoom-in-95 duration-200 flex flex-col overflow-hidden max-h-[90vh] w-full max-w-[90vw] md:max-w-[320px] shadow">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] tracking-widest uppercase">
                  <Camera size={14} /> BARCODE SCANNER
               </div>
               <button onClick={() => setIsScannerOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={18} />
               </button>
            </div>
            
            <div className="p-0 border-b border-slate-100">
               <div className="text-center py-4 bg-white">
                 <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">SCAN PRODUCT BARCODE</h3>
               </div>
               
               <div className="aspect-square relative bg-slate-900 flex flex-col items-center justify-center text-slate-400 overflow-hidden">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-8 border-2 border-emerald-500/50 rounded-xl z-20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-emerald-500/80 animate-[scan_2s_ease-in-out_infinite]" style={{ boxShadow: '0 0 10px 2px rgba(16, 185, 129, 0.5)' }}></div>
                  </div>
                  <Loader2 size={32} className="animate-spin mb-4 text-emerald-500 z-10" />
                  <p className="text-[10px] font-bold tracking-widest uppercase z-10 text-emerald-400">STARTING REAR CAMERA...</p>
               </div>
            </div>
            
            <div className="p-6 bg-slate-50 space-y-4">
              <p className="text-xs text-center text-slate-500 font-semibold leading-relaxed px-2">
                Position the barcode within the central frame to scan automatically. 
                <br /><span className="text-slate-400 text-[10px] mt-2 block font-bold uppercase tracking-widest">Support for QR, EAN, UPC, & Code 128</span>
              </p>
              <button 
                onClick={() => setIsScannerOpen(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-colors text-xs tracking-widest uppercase shadow-lg shadow-slate-900/20"
              >
                CANCEL SCANNING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

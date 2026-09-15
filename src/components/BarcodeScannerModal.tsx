import React, { useState, useEffect } from 'react';
import { X, Camera, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BarcodeScannerModal({ isOpen, onClose }: Props) {
  const [isStarting, setIsStarting] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsStarting(true);
      const timer = setTimeout(() => setIsStarting(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-md border border-slate-100">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 text-emerald-500 p-2.5 rounded-xl">
              <Camera size={20} />
            </div>
            <div>
              <h2 className="text-[13px] font-black tracking-widest uppercase text-slate-800">Barcode Scanner</h2>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-1">Scan Product Barcode</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50 transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 aspect-video text-center mb-6 relative overflow-hidden">
            {isStarting ? (
              <>
                <Loader2 size={32} className="animate-spin text-slate-400 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Starting rear camera...</p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-5 shadow-sm">
                  <AlertCircle size={24} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-800 mb-6 leading-relaxed">
                  No available camera devices detected<br/>on this system.
                </p>
                <button className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-6 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors border border-rose-200 shadow-sm">
                  Grant Permission & Retry
                </button>
              </>
            )}
          </div>
          
          <div className="flex flex-col items-center">
            <p className="text-[10px] text-slate-500 font-bold text-center mb-5 leading-relaxed">
              Position the barcode within the central frame to scan automatically.<br/>Support for QR, EAN, UPC, and Code 128.
            </p>
            <button onClick={onClose} className="w-full bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors shadow-xl shadow-slate-900/10">
              Cancel Scanning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

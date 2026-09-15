import React, { useRef, useState } from 'react';
import { X, Camera } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIBunchProductScannerModal({ isOpen, onClose }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file drop
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-[#1e2235] rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-lg border border-slate-700 text-white">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-700 flex items-center justify-between z-10 w-full sticky top-0 bg-[#1e2235]">
          <div className="flex items-center gap-3">
            <div className="bg-[#292e44] p-2.5 rounded-full text-emerald-400">
              <Camera size={20} />
            </div>
            <div>
              <h2 className="text-[13px] font-black tracking-widest uppercase">AI Bunch Product Scanner</h2>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-1">Snap-And-Checkout Group Photo Detector</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#181b2a]">
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center text-center transition-colors ${
              dragActive ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-600 bg-[#1e2235]'
            }`}
          >
            <Camera size={48} className="text-emerald-400 mb-6" />
            <h3 className="text-sm font-black tracking-widest uppercase mb-3">Upload Snap of Gathered Products</h3>
            <p className="text-xs text-slate-400 mb-8 leading-relaxed font-bold max-w-sm">
              Place the products together on the counter, snap a single picture, and upload it. The AI will detect and match them all instantly.
            </p>
            <label className="bg-[#292e44] hover:bg-[#323954] border border-slate-600 px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors text-slate-300 cursor-pointer shadow-sm">
              SNAP JPG, PNG OR WEBP
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // Handle file selection
                    onClose();
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

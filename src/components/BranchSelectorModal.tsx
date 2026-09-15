import React from 'react';
import { X, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function BranchSelectorModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-sm">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 z-10 w-full sticky top-0">
           <div className="flex items-center gap-2 text-slate-800 font-bold text-[10px] tracking-widest uppercase">
              <MapPin size={14} /> SELECT LOCATION
           </div>
           <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <button 
            onClick={onClose}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors text-left"
          >
             <div>
               <div className="text-sm font-bold text-slate-800">All Locations</div>
               <div className="text-[11px] text-slate-500 font-medium">Aggregated data</div>
             </div>
             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          </button>
          
          <button 
            onClick={onClose}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors text-left"
          >
             <div>
               <div className="text-sm font-bold text-slate-800">Lagos Mainland Branch</div>
               <div className="text-[11px] text-slate-500 font-medium">HQ</div>
             </div>
          </button>
        </div>

        <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 z-10 w-full sticky bottom-0 bg-slate-50 mt-auto">
          <button 
            onClick={() => { onClose(); navigate('/stores'); }}
            className="w-full py-3.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors text-xs tracking-widest uppercase shadow-sm"
          >
            MANAGE STORES
          </button>
        </div>
      </div>
    </div>
  );
}

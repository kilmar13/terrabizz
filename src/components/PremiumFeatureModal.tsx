import React from 'react';
import { Crown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onClose: () => void;
}

export default function PremiumFeatureModal({ onClose }: Props) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-[#0B1020] rounded-3xl w-full  md:max-w-sm shadow-2xl p-0 animate-in zoom-in-95 duration-200 flex flex-col overflow-hidden border border-slate-800 max-h-[90vh] w-full max-w-[90vw] md:max-w-sm shadow">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
           <div className="flex items-center gap-2 text-amber-500 font-bold text-[10px] tracking-widest uppercase">
              <Crown size={14} /> PREMIUM FEATURE LOCKED
           </div>
           <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>
        
        <div className="p-8 text-center flex flex-col items-center border-b border-slate-800">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-6">
            <Crown size={32} />
          </div>
          <p className="text-xs text-slate-400 font-medium leading-relaxed  md:max-w-[240px] max-h-[90vh] flex flex-col overflow-hidden w-full max-w-[90vw] md:max-w-[240px]">
            Uploads using Excel sheets are only available to businesses on the Premium plan. Want to upgrade and save hours of manual data entry?
          </p>
        </div>
        
        <div className="p-6 bg-slate-900/30 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-transparent hover:bg-slate-800/50 text-slate-400 font-bold py-3.5 rounded-xl transition-colors text-xs tracking-widest uppercase border border-slate-800 hover:text-white"
          >
            CANCEL
          </button>
          <button 
            onClick={() => { onClose(); navigate('/subscription'); }}
            className="flex-[1.5] bg-amber-500 hover:bg-amber-600 text-stone-900 font-black py-3.5 rounded-xl transition-colors text-xs tracking-widest uppercase shadow-lg shadow-amber-500/20"
          >
            SUBSCRIBE PLAN
          </button>
        </div>
      </div>
    </div>
  );
}

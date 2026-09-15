import React, { useState } from 'react';
import { X, Mic, Volume2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function VoicePosModal({ isOpen, onClose }: Props) {
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-[#1e2235] rounded-[24px] w-full max-w-[90vw] md:max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden text-white border border-slate-700">
        <div className="shrink-0 p-4 sm:p-6 border-b border-slate-700 flex items-center justify-between bg-[#1e2235] z-10 w-full sticky top-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#292e44] p-2.5 rounded-full text-purple-400">
              <Mic size={20} />
            </div>
            <div>
              <h2 className="text-[13px] font-black tracking-widest uppercase">Voice POS Terminal</h2>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mt-1">Real-Time AI Controller</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition-colors">
              <Volume2 size={20} />
            </button>
            <button className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition-colors" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 border border-purple-500/30 rounded-full animate-ping"></div>
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40">
                <Mic size={32} className="text-white" />
              </div>
            </div>
            <h3 className="text-sm font-black tracking-widest uppercase mb-3 text-purple-400">Listening Mode Active</h3>
            <p className="text-xs text-slate-400 font-bold text-center">Try: "Add 5 charging cables and set client to John"</p>
          </div>
          
          <div className="p-4 sm:p-6 space-y-6 bg-[#181b2a] shrink-0 border-t border-slate-700 z-10 w-full sticky bottom-0 mt-auto">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest mb-1">Hands-Free Auto-Dispatch</h4>
                <p className="text-[10px] text-slate-500 font-bold">Processes visual command instantly upon speech pause</p>
              </div>
              <button 
                onClick={() => setAutoDispatch(!autoDispatch)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${autoDispatch ? 'bg-purple-600' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute transition-all ${autoDispatch ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Manual Query or Edit Transcript</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-[#1e2235] border border-slate-700 rounded-xl px-4 py-3.5 text-[13px] font-medium focus:outline-none focus:border-purple-500 text-white placeholder-slate-600 transition-colors shadow-inner" 
                  placeholder="Enter what you want to add/modify..." 
                />
                <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-purple-600/20">
                  Send
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors">
                + Diagnostics & Live Monitor (4)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

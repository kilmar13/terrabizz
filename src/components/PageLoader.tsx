import React from 'react';

interface PageLoaderProps {
  label?: string;
}

export default function PageLoader({ label = "LOADING..." }: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-6 w-full">
      <div className="flex flex-col items-center justify-center">
         <div className="flex items-center gap-2 mb-8">
           <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-white font-black text-xl tracking-tighter">T</div>
           <span className="text-2xl font-black tracking-tighter text-slate-800 uppercase">TERRABIZ</span>
         </div>
         
         <div className="flex items-center gap-2">
           <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
           <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
           <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
         </div>
      </div>
      <div className="text-sm font-black text-[#10B981] uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

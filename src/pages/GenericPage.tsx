import React from 'react';

export default function GenericPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-6 flex flex-col h-full min-h-[60vh] justify-center items-center">
      <div className="text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 bg-brand-primary-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
           <div className="w-8 h-8 rounded bg-brand-primary opacity-80 animate-pulse"></div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-slate-500 text-lg leading-relaxed">{description}</p>
        <button className="mt-6 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          Configure Module
        </button>
      </div>
    </div>
  );
}

import React from "react";
import {
  ShieldCheck,
  CloudOff,
  Github,
  ExternalLink,
  Blocks,
  Heart,
} from "lucide-react";

export default function About() {
  return (
    <div className="max-w-[1200px] mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center pt-10 pb-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50/50 text-[#10B981] text-[10px] font-black uppercase rounded-full border border-emerald-100 tracking-widest mb-6 shadow-sm">
          <Blocks size={12} className="text-[#10B981]" />
          TERRABIZ V2.0
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#1F2937] tracking-tight uppercase leading-[1.1] mb-6">
          Crafting the Future of <br className="hidden md:block" />
          <span className="text-[#10B981]">Business Management</span>
        </h1>

        <p className="text-slate-500 font-medium text-lg max-w-2xl px-4 leading-relaxed">
          Terrabiz is a comprehensive inventory suite designed to empower
          entrepreneurs with enterprise-grade tools, simplified for every scale.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8 px-4">
        {/* Enterprise Security */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 border border-indigo-100">
            <ShieldCheck
              size={24}
              strokeWidth={1.5}
              className="text-indigo-500"
            />
          </div>
          <h3 className="text-lg font-black text-slate-800 tracking-widest uppercase mb-4">
            Enterprise Security
          </h3>
          <p className="text-[14px] text-slate-500/90 font-medium leading-relaxed">
            Your data is secured with Supabase's robust infrastructure. We
            implement strict Row-Level Security (RLS) to ensure data isolation.
            No business can access another's sensitive records—enforced directly
            at the database layer.
          </p>
        </div>

        {/* Offline First Sync */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 border border-emerald-100">
            <CloudOff size={24} strokeWidth={1.5} className="text-[#10B981]" />
          </div>
          <h3 className="text-lg font-black text-slate-800 tracking-widest uppercase mb-4">
            Offline-First Sync
          </h3>
          <p className="text-[14px] text-slate-500/90 font-medium leading-relaxed">
            Designed for rural areas with unstable network. Terrabiz works 100%
            offline. You can record sales, add products, and manage stock even
            without internet. The system automatically syncs every change to the
            cloud as soon as a connection is restored.
          </p>
        </div>
      </div>

      {/* Tech Stack Divider */}
      <div className="mt-20 mb-12">
        <div className="flex items-center justify-center mb-8">
          <div className="h-[1px] bg-slate-200 w-16"></div>
          <span className="px-6 text-[10px] font-black tracking-[0.2em] text-slate-400">
            ENGINEERED WITH PRECISION
          </span>
          <div className="h-[1px] bg-slate-200 w-16"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-8 text-xs font-black tracking-widest text-slate-400 px-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
              ⚛
            </div>
            REACT 19
          </div>
          <div className="flex items-center gap-2 px-4 border-l border-r border-slate-200">
            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
              ⚡
            </div>
            VITE
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
              ☁
            </div>
            SUPABASE
          </div>
          <div className="flex items-center gap-2 px-4 border-l border-slate-200">
            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
              ⛵
            </div>
            TAILWIND V4
          </div>
        </div>
      </div>

      {/* Engineer Profile */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 lg:p-10 shadow-sm relative overflow-hidden flex flex-col items-start min-h-[220px]">
          <div className="flex items-center gap-6 mb-8 w-full z-10">
            <div className="w-20 h-20 bg-[#0F172A] rounded-3xl flex items-center justify-center text-white shrink-0 shadow-lg border border-slate-800">
              <span className="text-[22px] font-black tracking-tighter">
                EDO
              </span>
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-[#10B981] tracking-[0.2em] uppercase mb-1">
                Engineer Behind Terrabiz
              </div>
              <h2 className="text-2xl md:text-[28px] font-black text-slate-800 tracking-tight uppercase mb-2">
                Eromosele David Osezua
              </h2>
              <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-xs">
                  📍
                </span>
                Abeokuta, Ogun State • Nigeria
              </div>
            </div>
          </div>

          <div className="w-full bg-slate-50/80 rounded-2xl p-6 border border-slate-100 relative z-10 mt-auto">
            <p className="text-[14px] text-slate-600 font-medium italic leading-relaxed">
              "Terrabiz is a vision brought to life to solve localized business
              problems with world-class technology. Developed with the Nigerian
              entrepreneur in mind, ensuring ease, speed, and absolute
              reliability."
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 mt-8">
        <div className="bg-[#0F172A] rounded-3xl p-10 lg:p-14 text-center shadow-xl relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-slate-800/40 to-transparent"></div>

          <div className="bg-[#0F172A] p-2 rounded-full mb-6 border border-slate-700 shadow-sm z-10">
            <Heart size={20} className="fill-red-500 text-red-500" />
          </div>

          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4 z-10">
            Built For The Ambitious
          </h2>
          <p className="text-slate-400 font-medium max-w-lg mb-10 z-10">
            Terrabiz was created to solve the complexities of inventory
            management, allowing you to focus on what matters most—growth.
          </p>

          <div className="flex items-center gap-4 z-10 flex-wrap justify-center">
            <button className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2">
              <Github size={16} strokeWidth={2.5} />
              Source
            </button>
            <button className="px-8 py-3.5 bg-[#10B981] hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20">
              Support <ExternalLink size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

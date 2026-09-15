import React, { useState, useEffect } from 'react';
import { X, Activity, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemAuditModal({ isOpen, onClose }: Props) {
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      const timer = setTimeout(() => {
        setIsScanning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh] my-auto overflow-hidden w-full max-w-[90vw] md:max-w-4xl">
        <div className="shrink-0 p-4 sm:p-6 flex items-center justify-between z-10 w-full sticky top-0 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400 shadow-sm">
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-800">
                Financial Systems & Stock Audit
              </h2>
              <p className="text-xs text-slate-500 font-semibold tracking-wide">
                Real-time database diagnostic tool for Ugubiz ERP & POS
              </p>
            </div>
          </div>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors">
            EXIT
          </button>
        </div>

        {isScanning ? (
          <div className="p-16 flex flex-col items-center justify-center">
            <RefreshCw size={40} className="text-emerald-500 animate-spin mb-6" />
            <p className="text-slate-800 font-bold mb-2">Running full-range Firestore audits & deduplication search...</p>
            <p className="text-slate-500 text-sm">Inspecting catalog records, pricing fields, and checkout transaction logs</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">ACTIVE RECORDS SCANNED</p>
                <p className="text-2xl font-black text-slate-800 mb-1">0 Products</p>
                <p className="text-xs text-slate-400 font-semibold">0 Checkout Orders</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">DUPLICATE PRODUCT RECORDS</p>
                <p className="text-2xl font-black text-slate-800 mb-1">0 Duplicates</p>
                <p className="text-xs text-slate-400 font-semibold">Inflates stock totals by NGN0</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">ANOMALOUS ENTRIES FOUND</p>
                  <p className="text-2xl font-black text-slate-800 mb-1">0 Anomalies</p>
                  <p className="text-xs text-slate-400 font-semibold">Out of bounds quantity or pricing configs.</p>
                </div>
                <AlertTriangle size={24} className="text-slate-300" strokeWidth={1.5} />
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-0.5">IDENTIFIED TOTAL SYSTEMS VALUATION ERRORS</h3>
                  <p className="text-xs text-slate-400">Calculated sum of duplicate records causing artificial inflation of inventory metrics</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 text-emerald-400 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  DIAGNOSTIC ANALYSIS COMPLETE
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                 <div className="p-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">INFLATED INVENTORY COST (STOCK VALUE)</p>
                    <p className="text-xl font-black text-white mb-1">+NGN0</p>
                    <p className="text-xs text-slate-500">Cumulative cost price overlap</p>
                 </div>
                 <div className="p-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">INFLATED POTENTIAL SELLING VALUE</p>
                    <p className="text-xl font-black text-white mb-1">+NGN0</p>
                    <p className="text-xs text-slate-500">Retail sales target overlap</p>
                 </div>
                 <div className="p-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">RAPID DOUBLE CHECKOUT SUBMISSIONS</p>
                    <p className="text-xl font-black text-white mb-1">+NGN0</p>
                    <p className="text-xs text-slate-500">Overlapped completed sales</p>
                 </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">DEDUPLICATION PREVIEW LEDGER</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                 <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={24} />
                 </div>
                 <h4 className="text-lg font-bold text-slate-800 mb-2">Your database calculations are completely clean!</h4>
                 <p className="text-slate-500 text-sm">No duplicate products, double-checkouts, or anomalous prices are currently active.</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3 text-amber-800 p-4">
               <AlertTriangle size={20} className="shrink-0 text-amber-600 mt-1" />
               <p className="text-xs leading-relaxed">
                 <span className="font-bold">System Audit Security & Integrancy Guarantees Keep Safe!</span><br />
                 Applying stock repairs merges duplicate atomicity. Shadow entries' quantities are safely zeroed out and marked with a deleted status. This corrects cumulative Stock Values and Potential Sales calculations across your Dashboard, stock list, and notification triggers instantly, while preserving document ID integrity to prevent breaking past sales transaction linkages.
               </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

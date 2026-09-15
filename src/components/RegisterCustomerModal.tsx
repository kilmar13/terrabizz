import React from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterCustomerModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-3xl w-full flex flex-col my-auto  md:max-w-2xl shadow-xl animate-in zoom-in-95 duration-200 relative overflow-hidden max-h-[90vh] w-full max-w-[90vw] md:max-w-2xl shadow">
        <div className="shrink-0 p-4 sm:p-6 flex items-center justify-between bg-white z-10 w-full sticky top-0 border-b border-slate-100">
          <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase">
            New Customer
          </h2>
          <button onClick={onClose} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors shadow-sm">
            EXIT
          </button>
        </div>

        <div className="overflow-y-auto flex-1 w-full"><form  onSubmit={(e) => { e.preventDefault(); onClose(); }}  className="flex flex-col">
          <div className="p-6">
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 mb-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer group">
               <div className="w-10 h-10 mb-2 rounded-full border-2 border-slate-300 flex items-center justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
               </div>
               <span className="text-xs font-bold uppercase tracking-wider group-hover:text-slate-800 transition-colors">Profile Image</span>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Customer Name</label>
                  <input required type="text" placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number (Optional)</label>
                <input type="tel" placeholder="e.g. 08012345678" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address (Optional)</label>
                <input type="email" placeholder="e.g. john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="mb-6">
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Address</label>
               <textarea rows={3} placeholder="Customer location or landmark..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all resize-none"></textarea>
            </div>

          </div>

          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 w-full sticky bottom-0 mt-auto flex gap-3">
            <button type="submit" className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-4 rounded-xl text-sm font-bold tracking-wide uppercase transition-colors shadow-lg shadow-slate-900/20">
              Save Customer
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

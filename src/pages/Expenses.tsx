import React, { useState } from 'react';
import { Plus, ArrowDownRight, X, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export default function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState<any[]>([]);
  
  // Form State
  const [category, setCategory] = useState('Rent');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(format(new Date(), 'dd-MMM-yyyy'));
  const [method, setMethod] = useState('Cash');
  const [description, setDescription] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      setShowError(true);
      return;
    }
    setExpenses([...expenses, {
      id: Date.now(),
      category,
      amount,
      date,
      method,
      description
    }]);
    setShowModal(false);
    setAmount('');
    setDescription('');
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">EXPENSE TRACKER</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Monitor and categorize your business expenditures.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-800 transition-colors self-start md:self-auto shrink-0"
        >
          <Plus size={16} strokeWidth={3} />
          RECORD EXPENSE
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden h-[140px]">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">TOTAL EXPENDITURE</span>
          <div className="mt-2 pl-2">
            <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">₦0</h3>
          </div>
          <div className="mt-auto pl-2 flex items-center gap-1.5 text-rose-500 text-[10px] font-black uppercase tracking-wider">
            <ArrowDownRight size={14} strokeWidth={3} />
            OUTFLOW IDENTIFIED
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col shadow-sm h-[140px]">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">MOST ACTIVE CATEGORY</span>
          <div className="mt-2">
            <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">N/A</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col shadow-sm h-[140px]">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">LAST RECORDED</span>
          <div className="mt-2">
            <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tighter">--</h3>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border-t-0 p-6 mt-8">
        <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-6">EXPENSE LOGS</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-slate-400 w-[20%]">CATEGORY</th>
                <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-slate-400 w-[30%]">DESCRIPTION</th>
                <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-slate-400 w-[15%]">METHOD</th>
                <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-slate-400 w-[20%]">DATE</th>
                <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-slate-400 w-[15%]">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">NO EXPENSES RECORDED</span>
                  </td>
                </tr>
              ) : (
                expenses.map((exp) => (
                  <tr key={exp.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-4 text-sm font-bold text-slate-800">{exp.category}</td>
                    <td className="py-4 text-sm font-medium text-slate-500">{exp.description || '-'}</td>
                    <td className="py-4 text-sm font-bold text-slate-800">{exp.method}</td>
                    <td className="py-4 text-sm font-medium text-slate-500">{exp.date}</td>
                    <td className="py-4 text-sm font-black text-rose-500">₦{Number(exp.amount).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2 text-rose-500">
                <ArrowDownRight size={20} strokeWidth={2.5} />
                <h2 className="text-sm font-black uppercase tracking-widest">LOG BUSINESS EXPENSE</h2>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">EXPENSE CATEGORY</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Salaries">Salaries</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Tax">Tax</option>
                  <option value="Repairs">Repairs</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">AMOUNT (₦)</label>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (e.target.value) setShowError(false);
                  }}
                  className={cn(
                    "w-full px-4 py-3 bg-white border rounded-xl text-sm font-bold text-slate-800 placeholder-slate-300 focus:outline-none transition-all",
                    showError ? "border-amber-500 focus:ring-1 focus:ring-amber-500" : "border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  )}
                />
                {showError && (
                  <div className="absolute right-0 top-[28px] bg-white border border-amber-500 text-amber-600 text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm z-20">
                    <span className="shrink-0 text-amber-500">!</span>
                    Please fill in this field.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 relative">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">DATE</label>
                  <input 
                    type="text" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all font-mono"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">PAYMENT METHOD</label>
                  <select 
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Card / Bank Transfer">Card / Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">DESCRIPTION / MEMO</label>
                <input 
                  type="text" 
                  placeholder="What was this for?" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-2 bg-rose-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-700 transition-colors shadow-md shadow-rose-500/20 active:translate-y-[2px]"
              >
                FINALIZE EXPENSE RECORD
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

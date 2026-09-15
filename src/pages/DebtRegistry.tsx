import React, { useState } from 'react';
import GenericDataPage from './GenericDataPage';
import ManualDebtEntryModal from '../components/ManualDebtEntryModal';
import { CheckCircle2 } from 'lucide-react';

export default function DebtRegistry() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleExportPDF = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Debtors_Statement_2026-06-28.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCSV = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Debtors_List.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <GenericDataPage
        title="DEBT REGISTRY"
        subtitle="Monitor and recover outstanding balances from customers."
        searchPlaceholder="Search debtors by name or phone..."
        actions={
          <>
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs font-bold border border-red-100 flex items-center gap-2">
              <span>TOTAL RECEIVABLES</span>
              <span className="text-base text-red-600">₦0</span>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-slate-900 border border-slate-900 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              + ADD DEBT RECORD
            </button>
            <button onClick={handleExportPDF} className="px-4 py-2 bg-white text-red-600 border border-red-200 text-xs font-bold rounded-lg shadow-sm hover:bg-red-50 transition-colors">
              EXPORT PDF
            </button>
            <button onClick={handleExportCSV} className="px-4 py-2 bg-white text-emerald-600 border border-emerald-200 text-xs font-bold rounded-lg shadow-sm hover:bg-emerald-50 transition-colors">
              EXPORT CSV
            </button>
          </>
        }
        emptyState={
          <div className="flex flex-col items-center flex-1 justify-center h-full min-h-[400px]">
             <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
            <h3 className="text-xl font-bold text-emerald-600 mb-2">ALL CLEAR!</h3>
            <p className="text-sm text-emerald-600/80">You have no outstanding debts to collect.</p>
          </div>
        }
      />
      <ManualDebtEntryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  );
}

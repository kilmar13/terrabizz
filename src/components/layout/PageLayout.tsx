import React from 'react';
import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function PageLayout() {
  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth h-full">
          <Outlet />
        </main>
        
        {/* Floating Support Button matching the recording */}
        <button className="fixed bottom-6 right-6 w-[60px] h-[60px] bg-[#10B981] hover:bg-[#059669] text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105 z-50">
          <MessageCircle size={28} className="fill-current text-white" strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}

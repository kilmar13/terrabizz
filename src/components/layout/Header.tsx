import React, { useState, useEffect } from 'react';
import { Menu, Search, Home, LayoutDashboard, Store, ClipboardList, MessageCircle, User, Settings, LogOut, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';
import QuickGlobalFinder from '../QuickGlobalFinder';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import { useAuth } from '../../context/AuthContext';
import NotificationCenterModal from '../NotificationCenterModal';
import AccountModal from '../AccountModal';

export default function Header() {
  const [showFinder, setShowFinder] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { session, logout } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowFinder(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (location.pathname === '/storefront') {
    return null;
  }

  const handleHomeClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Home', path: '/', icon: Home },
    { name: 'Marketplace', path: '/marketplace', icon: Store },
    { name: 'My Listings', path: '/inventory', icon: ClipboardList },
    { name: 'Messages', path: '/messages', icon: MessageCircle },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      <header className="h-20 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowMobileMenu(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          
            <div className="flex items-center gap-2.5">
              <Logo className="w-9 h-9" />
              <div className="flex flex-col justify-center translate-y-[-1px]">
                <span className="text-xl font-black tracking-tight text-slate-800 leading-none">Terrabiz</span>
                <span className="text-[9px] font-bold text-slate-500 tracking-[0.15em] leading-tight mt-0.5">INVENTORY & STOCK</span>
              </div>
            </div>

          <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden lg:block"></div>

          <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1 border border-slate-200 rounded-full shadow-sm">
             <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full"></div>
          </div>

          <span className="hidden sm:inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-100 tracking-wider ml-1">
             OWNER Access
          </span>
        </div>
        
        {/* Search Bar matching video */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <div 
            onClick={() => setShowFinder(true)}
            className="w-full h-11 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full flex items-center px-4 cursor-pointer transition-colors relative"
          >
            <Search size={18} className="text-slate-400" />
            <span className="text-[13px] font-medium text-slate-400 ml-3">Search products, customers, orders...</span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="px-2 py-1 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-sm">⌘K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={handleHomeClick}
            className="hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 font-medium text-sm"
          >
            <Home size={18} />
            <span>Home</span>
          </button>

          <button onClick={() => setShowNotifications(true)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors relative">
            <Bell size={20} />
            <div className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></div>
          </button>

          <div 
            className="hidden lg:flex items-center gap-3 ml-2 border-l border-slate-200 pl-6 cursor-pointer group"
            onClick={() => setShowAccount(true)}
          >
            <div className="text-right group-hover:opacity-80 transition-opacity">
              <p className="text-sm font-black text-slate-800 tracking-tight leading-none">{session?.user?.name || 'Eromosele David'}</p>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider mt-0.5 uppercase">{session?.user?.email || 'EROMOSELEDAVIDSON68@GMAIL.COM'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black shadow-sm overflow-hidden border-2 border-slate-100 uppercase group-hover:scale-105 transition-transform">
              {session?.user?.name?.substring(0, 2) || 'ER'}
            </div>
          </div>
        </div>
      </header>

      <NotificationCenterModal 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      <AccountModal 
        isOpen={showAccount} 
        onClose={() => setShowAccount(false)} 
        user={session?.user}
      />

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
          <div className="relative flex flex-col w-64 h-full bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Logo className="w-8 h-8 text-emerald-600" />
                <span className="text-lg font-black tracking-tight text-slate-800">Terrabiz</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setShowMobileMenu(false);
                    if (item.path === '/') {
                      handleHomeClick();
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-colors",
                    location.pathname === item.path 
                      ? "bg-emerald-50 text-emerald-600" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon size={18} />
                  {item.name}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100">
              <button
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                  navigate('/login');
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {showFinder && <QuickGlobalFinder onClose={() => setShowFinder(false)} />}
    </>
  );
}

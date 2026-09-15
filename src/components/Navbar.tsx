import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, User, LogOut, ChevronDown, Package, MessageCircle, Settings, Menu, X, Store } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      footer.classList.add('bg-white/5');
      setTimeout(() => footer.classList.remove('bg-white/5'), 1000);
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  const handleAboutClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDashboardClick = () => {
    if (session) {
      navigate('/dashboard');
    } else {
      navigate('/login', { state: { mode: 'login', message: 'Please log in to access your dashboard.' } });
    }
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#070B14]/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-6'} text-white`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleHomeClick}>
          <Logo className="w-10 h-10" />
        </div>

        <div className="hidden lg:flex items-center justify-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-300">
          <button onClick={handleHomeClick} className="hover:text-emerald-400 transition-colors uppercase tracking-[0.2em]">Home</button>
          <button onClick={() => navigate('/marketplace')} className="hover:text-emerald-400 transition-colors uppercase tracking-[0.2em]">Marketplace</button>
          <button onClick={() => navigate('/ecosystem')} className="hover:text-emerald-400 transition-colors uppercase tracking-[0.2em]">Services</button>
          <button onClick={handleAboutClick} className="hover:text-emerald-400 transition-colors uppercase tracking-[0.2em]">About Us</button>
          <button onClick={scrollToFooter} className="hover:text-emerald-400 transition-colors uppercase tracking-[0.2em]">Contact Us</button>
          <button onClick={handleDashboardClick} className="hover:text-emerald-400 transition-colors uppercase tracking-[0.2em]">Dashboard</button>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4 relative">
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 pr-4 rounded-full hover:bg-white/10 transition-all"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-[#070B14] font-black uppercase shadow-inner">
                      {session.user.name ? session.user.name.substring(0, 2) : 'US'}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#070B14] rounded-full"></div>
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white tracking-wide">{session.user.name || 'User'}</span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest leading-none">Online</span>
                    </div>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                      <p className="text-xs font-bold text-white truncate">{session.user.name || 'User'}</p>
                      <p className="text-[10px] font-medium text-slate-400 truncate">{session.user.email}</p>
                    </div>
                    <button onClick={() => { setShowUserMenu(false); navigate('/dashboard'); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button onClick={() => { setShowUserMenu(false); navigate('/profile'); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      <User size={16} /> My Profile
                    </button>
                    <button onClick={() => { setShowUserMenu(false); navigate('/inventory'); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      <Package size={16} /> My Listings
                    </button>
                    <button onClick={() => { setShowUserMenu(false); navigate('/messages'); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      <MessageCircle size={16} /> Messages
                    </button>
                    <button onClick={() => { setShowUserMenu(false); navigate('/settings'); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                      <Settings size={16} /> Settings
                    </button>
                    <div className="h-px bg-white/5 my-2" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login', { state: { mode: 'login' } })}
                className="text-xs font-bold text-slate-300 hover:text-white px-5 py-2.5 rounded-full hover:bg-white/5 transition-all"
              >
                LOGIN
              </button>
              <button 
                onClick={() => navigate('/login', { state: { mode: 'signup' } })}
                className="bg-gradient-to-r from-emerald-500 to-amber-400 text-[#070B14] px-7 py-3 rounded-full text-xs font-black tracking-widest uppercase hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all transform hover:scale-105"
              >
                SIGN UP
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#0A0E17] border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <button onClick={() => { setShowMobileMenu(false); handleHomeClick(); }} className="text-left text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest">Home</button>
              <button onClick={() => { setShowMobileMenu(false); navigate('/marketplace'); }} className="text-left text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest">Marketplace</button>
              <button onClick={() => { setShowMobileMenu(false); navigate('/ecosystem'); }} className="text-left text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest">Services</button>
              
              <div className="h-px bg-white/5 my-2" />
              
              {session ? (
                <>
                  <div className="flex items-center gap-3 py-2">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-[#070B14] font-black uppercase shadow-inner">
                        {session.user.name ? session.user.name.substring(0, 2) : 'US'}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0A0E17] rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide">{session.user.name || 'User'}</p>
                      <p className="text-xs font-medium text-slate-400">{session.user.email}</p>
                    </div>
                  </div>
                  <button onClick={() => { setShowMobileMenu(false); navigate('/dashboard'); }} className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest"><LayoutDashboard size={16} /> Dashboard</button>
                  <button onClick={() => { setShowMobileMenu(false); navigate('/profile'); }} className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest"><User size={16} /> Profile</button>
                  <button onClick={() => { setShowMobileMenu(false); navigate('/inventory'); }} className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest"><Package size={16} /> My Listings</button>
                  <button onClick={() => { setShowMobileMenu(false); navigate('/messages'); }} className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest"><MessageCircle size={16} /> Messages</button>
                  <button onClick={() => { setShowMobileMenu(false); navigate('/settings'); }} className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-white uppercase tracking-widest"><Settings size={16} /> Settings</button>
                  <button onClick={handleLogout} className="flex items-center gap-3 text-sm font-bold text-red-500 hover:text-red-400 uppercase tracking-widest mt-2"><LogOut size={16} /> Logout</button>
                </>
              ) : (
                <div className="flex flex-col gap-3 py-2">
                  <button onClick={() => { setShowMobileMenu(false); navigate('/login', { state: { mode: 'login' } }); }} className="w-full bg-white/5 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest">Login</button>
                  <button onClick={() => { setShowMobileMenu(false); navigate('/login', { state: { mode: 'signup' } }); }} className="w-full bg-gradient-to-r from-emerald-500 to-amber-400 text-[#070B14] py-3 rounded-xl text-xs font-bold uppercase tracking-widest">Sign Up</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

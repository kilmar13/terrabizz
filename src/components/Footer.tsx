import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <footer id="footer" className="border-t border-white/5 bg-[#030509] text-white pt-24 pb-12 transition-colors duration-1000">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div>
            <Logo className="w-12 h-12 mb-6" />
            <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">
              The digital backbone of African commerce. Empowering businesses, unlocking real estate, and elevating entrepreneurship.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6">Contact Us</h4>
            <p className="text-slate-400 text-sm mb-4">Need help or want to reach us?</p>
            <ul className="space-y-4 text-slate-300 text-sm font-medium">
              <li className="flex items-center gap-3">
                <span className="text-xl">📞</span> 07039942882
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">✉️</span> <a href="mailto:skyvanta88@gmail.com" className="hover:text-emerald-400 transition-colors">skyvanta88@gmail.com</a>
              </li>
              <li>
                <a href="https://wa.link/3fr3z7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                  <span className="text-xl">💬</span> Chat With Us On WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm flex flex-col items-start">
              <li><button onClick={handleHomeClick} className="hover:text-emerald-400 transition-colors">Home</button></li>
              <li><button onClick={() => navigate('/marketplace')} className="hover:text-emerald-400 transition-colors">Marketplace</button></li>
              <li><button onClick={() => navigate('/ecosystem')} className="hover:text-emerald-400 transition-colors">Services</button></li>
              <li><button onClick={handleAboutClick} className="hover:text-emerald-400 transition-colors">About Us</button></li>
              <li><button onClick={scrollToFooter} className="hover:text-emerald-400 transition-colors">Contact Us</button></li>
              <li><button onClick={() => navigate('/login', { state: { mode: 'login' } })} className="hover:text-emerald-400 transition-colors">Login</button></li>
              <li><button onClick={() => navigate('/login', { state: { mode: 'signup' } })} className="hover:text-emerald-400 transition-colors">Sign Up</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Terrabiz Ecosystem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ShoppingBag, Users, Briefcase, Globe2, ShieldCheck, 
  ArrowRight, Store, ChevronRight, Phone, Mail, MapPin, Search,
  TrendingUp, BarChart3, LockKeyhole, FileCheck, CheckCircle2, BookOpen,
  WifiOff, Database, Zap, Code, PenTool
} from 'lucide-react';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ecosystemFeatures = [
    { title: "MARKETPLACE", desc: "Buy and sell products across multiple categories globally.", icon: ShoppingBag, color: "from-blue-500 to-cyan-400", path: "/marketplace" },
    { title: "BUSINESS DIRECTORY", desc: "Discover trusted businesses and companies across Africa.", icon: BookOpen, color: "from-emerald-500 to-green-400", path: "/business-directory" },
    { title: "SERVICES", desc: "Hire top-tier professionals instantly for any project.", icon: Briefcase, color: "from-purple-500 to-pink-400", path: "/services" },
    { title: "VENDOR STORES", desc: "Launch and manage your online store with powerful tools.", icon: Store, color: "from-teal-500 to-emerald-400", path: "/vendor-stores" }
  ];

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      footer.classList.add('bg-white/5');
      setTimeout(() => footer.classList.remove('bg-white/5'), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
        
        {/* Animated Light Pathways */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Navigation Bar */}
      <Navbar />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex items-center justify-center pt-20 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm">
                <Globe2 size={14} />
                <span>The Gateway to African Commerce</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tight leading-[1.05] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500"
            >
              Buy, Sell, and Grow <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Your Business in One Place.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-12"
            >
              Terrabiz helps you discover products, connect with businesses, promote your services, and find new opportunities—all from one easy-to-use platform.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              <button 
                onClick={() => navigate('/login', { state: { mode: 'signup' } })}
                className="w-full sm:w-auto bg-white text-[#070B14] px-8 py-5 rounded-full text-sm font-black tracking-wider uppercase hover:bg-slate-200 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
              >
                Get Started <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => navigate('/marketplace')}
                className="w-full sm:w-auto px-8 py-5 rounded-full border border-white/20 text-white text-sm font-black tracking-wider uppercase hover:bg-white/5 transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                Explore Marketplace
              </button>
            </motion.div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 text-center divide-x divide-white/5">
              {[
                { label: "Verified Businesses", value: "50,000+" },
                { label: "Active Vendors", value: "12,500+" },
                { label: "Properties Listed", value: "$2.4B" },
                { label: "Services Available", value: "8,400+" },
                { label: "Monthly Growth", value: "314%" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex flex-col items-center justify-center"
                >
                  <span className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Services Showcase */}
        <section className="py-32 relative">
          <div className="max-w-[1400px] mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">Our Services</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">Four powerful experiences integrated into one seamless platform.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ecosystemFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-10 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <feature.icon size={120} />
                  </div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Emotional Story Section */}
        <section className="py-32 relative bg-black/50 border-y border-white/5">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 border border-orange-500/20">
                  Real Success
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-8 leading-[1.1]">
                  Every Great Success Starts With One Opportunity.
                </h2>
                <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
                  We built Terrabiz to be the catalyst. Whether you're scaling a local enterprise across borders, sourcing materials for your next development, or investing in prime real estate — your breakthrough happens here.
                </p>
                <ul className="space-y-6">
                  {['More Connections.', 'More Visibility.', 'More Growth.'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white font-bold text-lg">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 size={16} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10 group"
              >
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Entrepreneur" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-10">
                  <div className="text-emerald-400 font-bold text-sm tracking-widest uppercase mb-2">Success Story</div>
                  <h3 className="text-2xl font-black text-white">"We scaled from a local supplier to national distribution in 4 months using Terrabiz."</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Security & Trust */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-[3rem] p-12 md:p-20 border border-slate-800 relative overflow-hidden text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-500/20 blur-[100px] rounded-full" />
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <ShieldCheck size={64} className="text-indigo-400 mx-auto mb-8" />
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Enterprise-Grade Security</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16">
                  Protected transactions, verified business identities, and multi-factor authentication. Run your enterprise with absolute confidence.
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {[
                    { title: "Identity Verification", desc: "Every business tier undergoes strict KYC compliance." },
                    { title: "Fraud Prevention", desc: "AI-driven monitoring of marketplace transactions." },
                    { title: "Secure Authentication", desc: "Advanced OTP and behavioral security protocols." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                      <LockKeyhole size={24} className="text-emerald-400 mb-6" />
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Foundation & Architecture (from video) */}
        <section id="about-section" className="py-32 relative overflow-hidden bg-white/[0.01] border-t border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
          </div>

          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="text-center mb-20 md:mb-32">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">Crafting The Future Of <br className="hidden md:block"/> Business Management</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-400 mx-auto mt-8 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 cursor-default">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors" />
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-10 group-hover:bg-emerald-500/10 transition-colors">
                  <ShieldCheck size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">Enterprise Security</h3>
                <p className="text-slate-400 text-lg leading-relaxed group-hover:text-slate-300 transition-colors">
                  Your data is secured with Supabase's robust infrastructure. We implement strict Row-Level Security (RLS) to ensure data isolation. No business can access another's sensitive records—enforced directly at the database layer.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#0a0f1c]/80 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors" />
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-10 group-hover:bg-emerald-500/10 transition-colors">
                  <WifiOff size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">Offline-First Sync</h3>
                <p className="text-slate-400 text-lg leading-relaxed group-hover:text-slate-300 transition-colors">
                  Designed for rural areas with unstable network. Terrabiz works 100% offline. You can record sales, add products, and manage stock even without internet. The system automatically syncs every change to the cloud as soon as a connection is restored.
                </p>
              </motion.div>
            </div>

            {/* Tech Stack Banner */}
            <div className="flex flex-col items-center justify-center mb-32 relative">
              <span className="text-[11px] font-bold tracking-[0.3em] text-slate-500 uppercase mb-10 relative z-10 bg-[#070B14] px-6">Engineered With Precision</span>
              <div className="absolute top-[9px] w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-3 px-8 py-3.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                  <Code size={18} className="text-emerald-400" /> React 19
                </div>
                <div className="flex items-center gap-3 px-8 py-3.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                  <Zap size={18} className="text-amber-400" /> Vite
                </div>
                <div className="flex items-center gap-3 px-8 py-3.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                  <Database size={18} className="text-emerald-500" /> Supabase
                </div>
                <div className="flex items-center gap-3 px-8 py-3.5 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                  <PenTool size={18} className="text-teal-400" /> Tailwind V4
                </div>
              </div>
            </div>

            {/* Engineer Identity Card */}
            <div className="max-w-4xl mx-auto">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-br from-[#0a0f1c] to-[#0d1424] border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                
                <div className="flex flex-col md:flex-row gap-8 items-start mb-10 relative z-10">
                  <div className="w-24 h-24 bg-[#030509] border border-emerald-500/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] shrink-0 overflow-hidden group-hover:border-emerald-500/40 transition-colors">
                    <span className="text-emerald-400 font-black text-2xl tracking-wider">EDO</span>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase mb-4">
                      Engineer Behind Terrabiz
                    </span>
                    <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase mb-4">Eromosele David Osezua</h4>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                      <MapPin size={16} className="text-amber-400"/> Abeokuta, Ogun State • Nigeria
                    </div>
                  </div>
                </div>
                
                <div className="pt-10 border-t border-white/10 relative z-10">
                  <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
                    "Terrabiz is a vision brought to life to solve localized business problems with world-class technology. <span className="text-white font-bold">Developed with the Nigerian entrepreneur in mind</span>, ensuring ease, speed, and absolute reliability."
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-emerald-950/20 to-transparent" />
          <div className="max-w-[4xl] mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">The Opportunity You've Been Waiting For Is Here.</h2>
              <p className="text-xl text-slate-400 mb-12 font-medium">Join the platform where businesses grow, opportunities multiply, and ambitions become achievements.</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button 
                  onClick={() => navigate('/login', { state: { mode: 'signup' } })}
                  className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-10 py-5 rounded-full text-sm font-black tracking-widest uppercase transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]"
                >
                  Create Free Account
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ShoppingBag, Users, Briefcase, Store, CheckCircle2, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Ecosystem() {
  const navigate = useNavigate();

  const ecosystemFeatures = [
    { title: "MARKETPLACE", desc: "Buy and sell products across multiple categories globally.", icon: ShoppingBag, color: "from-blue-500 to-cyan-400", path: "/marketplace" },
    { title: "BUSINESS DIRECTORY", desc: "Discover trusted businesses and companies across Africa.", icon: Building2, color: "from-emerald-500 to-green-400", path: "/business-directory" },
    { title: "SERVICES", desc: "Hire top-tier professionals instantly for any project.", icon: Briefcase, color: "from-purple-500 to-pink-400", path: "/ecosystem" },
    { title: "VENDOR STORES", desc: "Launch and manage your online store with powerful tools.", icon: Store, color: "from-teal-500 to-emerald-400", path: "/vendor-stores" }
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-white selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      <Navbar />

      <section className="pt-40 pb-20 relative">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
            Services
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
            One powerful, interconnected platform that provides everything your business needs to launch, scale, and dominate the digital landscape.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {ecosystemFeatures.map((feature, i) => (
              <div
                key={i}
                onClick={() => navigate(feature.path)}
                className="group relative cursor-pointer bg-white/[0.02] border border-white/5 rounded-3xl p-10 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                  <feature.icon size={120} />
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

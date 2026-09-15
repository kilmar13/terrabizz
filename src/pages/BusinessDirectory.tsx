import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Star, Building2, Store, HeartPulse, GraduationCap, Utensils, Construction, CheckCircle2, Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BusinessDirectory() {
  const navigate = useNavigate();

  const categories = [
    { name: "Restaurants", icon: Utensils },
    { name: "Hotels", icon: Building2 },
    { name: "Schools", icon: GraduationCap },
    { name: "Hospitals", icon: HeartPulse },
    { name: "Retail", icon: Store },
    { name: "Construction", icon: Construction },
  ];

  const businesses = [
    { id: 1, name: "Zenith Tech Solutions", category: "Technology", location: "Lagos, NG", rating: 4.9, verified: true, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", logo: "https://ui-avatars.com/api/?name=ZT&background=0F172A&color=fff" },
    { id: 2, name: "Greenwood Healthcare", category: "Hospitals", location: "Abuja, NG", rating: 4.7, verified: true, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", logo: "https://ui-avatars.com/api/?name=GH&background=10B981&color=fff" },
    { id: 3, name: "Prime Builders Contractors", category: "Construction", location: "Port Harcourt, NG", rating: 4.8, verified: false, image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", logo: "https://ui-avatars.com/api/?name=PB&background=F59E0B&color=fff" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <section className="bg-slate-900 text-white pt-40 pb-24 lg:pt-48 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="City" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Find Trusted Businesses Near You</h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Search thousands of businesses across different industries.</p>
          <div className="flex max-w-3xl mx-auto bg-white rounded-full p-2 shadow-xl">
            <div className="flex-1 flex items-center px-4 border-r border-slate-200">
              <Search className="text-slate-400 mr-2" size={20} />
              <input type="text" placeholder="Hardware store, web design..." className="w-full py-3 bg-transparent text-slate-900 focus:outline-none" />
            </div>
            <div className="flex-1 flex items-center px-4 hidden md:flex">
              <MapPin className="text-slate-400 mr-2" size={20} />
              <input type="text" placeholder="Lagos, NG" className="w-full py-3 bg-transparent text-slate-900 focus:outline-none" />
            </div>
            <button className="bg-emerald-500 text-white px-8 rounded-full font-bold hover:bg-emerald-600 transition-colors">Search</button>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat, i) => (
            <button key={i} className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition-all font-bold text-sm text-slate-600">
              <cat.icon size={18} /> {cat.name}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Featured Businesses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((bus) => (
            <div key={bus.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-48 overflow-hidden relative">
                <img src={bus.image} alt={bus.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {bus.verified && (
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                    <CheckCircle2 size={12} /> Verified
                  </div>
                )}
              </div>
              <div className="p-6 relative pt-12">
                <div className="absolute -top-10 left-6 p-1 bg-white rounded-2xl shadow-lg border border-slate-100">
                  <img src={bus.logo} alt="Logo" className="w-16 h-16 rounded-xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{bus.name}</h3>
                <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                  <span>{bus.category}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {bus.location}</span>
                </p>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  <Star size={16} className="fill-current" />
                  <span className="text-sm font-bold text-slate-700">{bus.rating} Rating</span>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-slate-100 text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">View Profile</button>
                  <button className="flex items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-emerald-500 hover:border-emerald-500 transition-colors">
                    <Globe size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

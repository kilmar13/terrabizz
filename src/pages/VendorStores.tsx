import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Store, ShoppingBag, Star, LayoutGrid, Users, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function VendorStores() {
  const navigate = useNavigate();

  const categories = [
    "Fashion Stores", "Electronics Stores", "Beauty Stores", 
    "Agricultural Stores", "Furniture Stores", "Wholesale Stores"
  ];

  const stores = [
    { id: 1, name: "Urban Threads", category: "Fashion", products: 124, followers: "12.4k", rating: 4.8, banner: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", logo: "https://ui-avatars.com/api/?name=UT&background=000&color=fff" },
    { id: 2, name: "ElectroHub NG", category: "Electronics", products: 450, followers: "34.2k", rating: 4.9, banner: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", logo: "https://ui-avatars.com/api/?name=EH&background=2563EB&color=fff" },
    { id: 3, name: "Glow Beauty Depot", category: "Beauty", products: 89, followers: "8.1k", rating: 4.7, banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", logo: "https://ui-avatars.com/api/?name=GB&background=EC4899&color=fff" },
    { id: 4, name: "AgriHome Wholesale", category: "Agriculture", products: 56, followers: "5.5k", rating: 4.6, banner: "https://images.unsplash.com/photo-1595825833444-93c661ffca42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", logo: "https://ui-avatars.com/api/?name=AW&background=10B981&color=fff" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <section className="bg-teal-900 text-white pt-40 pb-24 lg:pt-48 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Stores" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Discover Amazing Vendor Stores</h1>
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">Shop directly from trusted brands and business owners.</p>
          <div className="flex max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
            <div className="flex-1 flex items-center px-4">
              <Search className="text-teal-200 mr-2" size={20} />
              <input type="text" placeholder="Search for stores or brands..." className="w-full py-3 bg-transparent text-white focus:outline-none placeholder:text-teal-200/70" />
            </div>
            <button className="bg-teal-500 text-white px-8 rounded-full font-bold hover:bg-teal-400 transition-colors">Search</button>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat, i) => (
            <button key={i} className="flex-none px-6 py-3 bg-white rounded-full border border-slate-200 font-bold text-sm text-slate-600 hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm">
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-8 mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Featured Stores</h2>
            <p className="text-sm text-slate-500">Discover popular brands and emerging sellers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-32 bg-slate-100 relative">
                <img src={store.banner} alt={store.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="px-6 pb-6 relative pt-10">
                <div className="absolute -top-8 left-6 p-1 bg-white rounded-full shadow-md">
                  <img src={store.logo} alt="Logo" className="w-14 h-14 rounded-full" />
                </div>
                <div className="flex justify-end absolute top-3 right-6">
                  <button className="bg-teal-50 text-teal-600 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-teal-100 transition-colors">Follow</button>
                </div>
                
                <h3 className="font-bold text-slate-900 text-lg mb-1">{store.name}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{store.category}</p>
                
                <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-6">
                  <div className="text-center flex-1">
                    <p className="font-black text-slate-900 flex justify-center"><ShoppingBag size={14} className="mr-1 mt-0.5 text-slate-400" /> {store.products}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Products</p>
                  </div>
                  <div className="text-center flex-1 border-l border-slate-100">
                    <p className="font-black text-slate-900 flex justify-center"><Users size={14} className="mr-1 mt-0.5 text-slate-400" /> {store.followers}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Followers</p>
                  </div>
                  <div className="text-center flex-1 border-l border-slate-100">
                    <p className="font-black text-slate-900 flex justify-center"><Star size={14} className="mr-1 mt-0.5 text-amber-400 fill-current" /> {store.rating}</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Rating</p>
                  </div>
                </div>

                <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex justify-center items-center gap-2 group-hover:bg-teal-600">
                  Visit Store <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ArrowRight, Star, ShoppingCart, Heart, Filter, MessageCircle, MapPin, Loader2, CreditCard
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import AddProductModal from '../components/AddProductModal';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function Marketplace() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'market_products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(prods);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching market products: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSellClick = () => {
    if (!session) {
      navigate('/login', { state: { mode: 'login', message: 'Please login to list a product.' } });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleOrderClick = (paymentLink: string) => {
    if (paymentLink) {
      window.open(paymentLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleMessageSeller = (sellerId: string, productId: string) => {
    if (!session) {
      navigate('/login', { state: { mode: 'login', message: 'Please login to message the seller.' } });
      return;
    }
    navigate('/messages', { state: { sellerId, productId } });
  };

  const filteredProducts = products.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.category?.toLowerCase().includes(searchTerm.toLowerCase()));

  // Expanded categories can just show a generic icon since there's so many, or we just map a few popular ones with icons
  // For now let's just make it a simple list of top categories
  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Fashion", icon: "👕" },
    { name: "Mobile Phones", icon: "📱" },
    { name: "Vehicle Parts", icon: "🚗" },
    { name: "Real Estate", icon: "🏠" },
    { name: "Services", icon: "🛠️" },
    { name: "Agriculture", icon: "🌾" },
    { name: "Food & Beverages", icon: "🍎" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <section className="bg-slate-900 text-white pt-40 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Buy and Sell Almost Anything</h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Discover products from trusted sellers across Nigeria and beyond.</p>
          <div className="flex relative max-w-2xl mx-auto mb-10 border border-white/20 hover:border-emerald-500 rounded-full bg-white/10 transition-colors focus-within:border-emerald-500 focus-within:bg-white/20">
            <input 
              type="text" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="What are you looking for?" 
              className="w-full bg-transparent border-none py-4 px-6 pl-14 text-white placeholder:text-slate-300 focus:outline-none focus:ring-0" 
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-400" size={22} />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-full font-black text-sm tracking-widest uppercase hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">Shop Now</button>
            <button onClick={handleSellClick} className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/20 transition-all">Sell a Product</button>
          </div>
        </div>
      </section>

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat, i) => (
            <button key={i} onClick={() => setSearchTerm(cat.name)} className="flex flex-col items-center gap-3 min-w-[120px] p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors text-2xl">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-slate-700">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Marketplace Products</h2>
            <p className="text-sm text-slate-500">Live feed of available items, directly syncs via Firebase.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 mt-10">
            <div className="w-12 h-12 bg-[#10B981] rounded-lg flex items-center justify-center text-white font-black text-3xl tracking-tighter shadow-lg shadow-emerald-500/20">T</div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
             <div className="text-4xl mb-4">🛒</div>
             <p className="text-lg font-bold text-slate-700">No products found</p>
             <p className="text-sm text-slate-500 mt-2">Try adjusting your search or listing your own product!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col group">
                <div className="relative h-64 overflow-hidden bg-slate-100 shrink-0">
                  {product.image ? (
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-5xl">📦</div>
                  )}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#10B981] text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                    {product.category || 'General'}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-2">{product.name}</h3>
                  </div>
                  <div className="text-2xl font-black text-emerald-600 mb-2">₦{product.price?.toLocaleString()}</div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{product.description}</p>
                  
                  <div className="pt-4 border-t border-slate-100 mb-6 mt-auto">
                    <p className="text-xs font-bold text-slate-900 mb-1">{product.sellerName}</p>
                    <p className="text-xs flex items-center gap-1 text-slate-500"><MapPin size={12} /> {product.location || 'Nationwide'}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleOrderClick(product.paymentLink)}
                      className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard size={16} /> Order Now
                    </button>
                    <button 
                      onClick={() => handleMessageSeller(product.sellerId, product.id)}
                      className="w-full bg-emerald-50 text-emerald-600 py-3 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={16} /> Message Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

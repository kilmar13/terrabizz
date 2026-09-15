import React, { useState, useRef, useEffect } from 'react';
import { X, Save, AlertCircle, Upload, CheckCircle2, ChevronDown, Search, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "Electronics", "Mobile Phones", "Computers", "Accessories", "Home Appliances",
  "Fashion", "Footwear", "Beauty", "Health", "Grocery", "Beverages",
  "Furniture", "Sports", "Books", "Toys", "Automotive", "Building Materials",
  "Agriculture", "Industrial Equipment", "Office Supplies", "Restaurant Supplies",
  "Pharmacy", "Cosmetics"
];

export default function NewProductModal({ isOpen, onClose }: Props) {
  const { addProduct } = useApp();
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    supplier: '',
    price: '',
    costPrice: '',
    stock: '',
    reorderLevel: '',
    status: 'in-stock',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [searchCategory, setSearchCategory] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Required";
    if (!formData.category) newErrors.category = "Required";
    if (!formData.price || isNaN(Number(formData.price))) newErrors.price = "Valid price required";
    if (!formData.stock || isNaN(Number(formData.stock))) newErrors.stock = "Valid quantity required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setHasChanges(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleCategorySelect = (cat: string) => {
    setHasChanges(true);
    setFormData({ ...formData, category: cat });
    setIsCategoryOpen(false);
    if (errors.category) setErrors({ ...errors, category: '' });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const executeSave = async (addAnother: boolean) => {
    if (!validate()) return;
    
    setIsSaving(true);
    
    // Simulate API call for saving
    await new Promise(resolve => setTimeout(resolve, 800));
    
    addProduct({
      name: formData.name,
      sku: formData.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
      category: formData.category,
      price: Number(formData.price),
      costPrice: formData.costPrice ? Number(formData.costPrice) : Number(formData.price) * 0.8,
      stock: Number(formData.stock),
      status: formData.status as any,
    });
    
    setIsSaving(false);
    setShowSuccess(true);
    setHasChanges(false);
    
    setTimeout(() => {
      setShowSuccess(false);
      if (addAnother) {
        setFormData({
          name: '', sku: '', category: '', supplier: '', price: '', costPrice: '', stock: '', reorderLevel: '', status: 'in-stock'
        });
        setImagePreview(null);
      } else {
        onClose();
      }
    }, 1500);
  };

  const handleExitClick = () => {
    if (hasChanges && !showSuccess) {
      setShowExitPrompt(true);
    } else {
      onClose();
    }
  };

  const filteredCategories = CATEGORIES.filter(c => c.toLowerCase().includes(searchCategory.toLowerCase()));

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 overflow-hidden">
        {/* Maximum width 90% and height 90%, properly centered */}
        <div className="bg-white rounded-[24px] w-full max-w-[90vw] md:max-w-5xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden relative flex flex-col max-h-[90vh]">
          
          {/* Header - Sticky */}
          <div className="shrink-0 p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#10B981]">
                <Plus size={20} strokeWidth={3} />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight uppercase">Create New Product</h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleExitClick} className="hidden sm:block px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors">
                EXIT
              </button>
              <button onClick={handleExitClick} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
            {showSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300 min-h-[300px]">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle2 size={40} strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Product Successfully Added</h3>
                <p className="text-slate-500 max-w-sm">The product has been saved and is now available in your inventory.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Left Column (Image & Status) */}
                <div className="space-y-6">
                  {/* Images Section */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 tracking-tight">Product Image</h3>
                    <div 
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-6 transition-all relative
                        ${dragActive ? 'border-[#10B981] bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}
                        ${imagePreview ? 'p-2 border-solid' : 'aspect-square sm:aspect-auto sm:h-56'}
                      `}
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full min-h-[200px] group">
                           <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                           <button 
                             onClick={() => { setImagePreview(null); setHasChanges(true); }}
                             className="absolute top-2 right-2 p-1.5 bg-white/90 text-slate-700 hover:text-rose-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                             <X size={16} />
                           </button>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 mb-3">
                            <Upload size={20} />
                          </div>
                          <p className="text-sm font-bold text-slate-700 mb-1">Drag & Drop Image</p>
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-4">or click to browse</p>
                          <label className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                            Browse Files
                            <input 
                              type="file" 
                              className="hidden" 
                              ref={fileInputRef} 
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
                              }}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 tracking-tight">Status</h3>
                    <div className="space-y-3">
                      <label className={`flex items-center p-3 rounded-xl border cursor-pointer transition-colors ${formData.status === 'in-stock' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                         <input type="radio" name="status" value="in-stock" checked={formData.status === 'in-stock'} onChange={handleChange} className="hidden" />
                         <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${formData.status === 'in-stock' ? 'border-emerald-500' : 'border-slate-300'}`}>
                           {formData.status === 'in-stock' && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
                         </div>
                         <span className="text-sm font-bold text-slate-700">Active / In Stock</span>
                      </label>
                      <label className={`flex items-center p-3 rounded-xl border cursor-pointer transition-colors ${formData.status === 'out-of-stock' ? 'border-rose-500 bg-rose-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                         <input type="radio" name="status" value="out-of-stock" checked={formData.status === 'out-of-stock'} onChange={handleChange} className="hidden" />
                         <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${formData.status === 'out-of-stock' ? 'border-rose-500' : 'border-slate-300'}`}>
                           {formData.status === 'out-of-stock' && <div className="w-2 h-2 bg-rose-500 rounded-full" />}
                         </div>
                         <span className="text-sm font-bold text-slate-700">Draft / Out of Stock</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column (Details) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Product Information Section */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-3">Product Information</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                          <span>Product Name <span className="text-rose-500">*</span></span>
                          {errors.name && <span className="text-rose-500 Normal-case tracking-normal">{errors.name}</span>}
                        </label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange} 
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all ${errors.name ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'}`} 
                          placeholder="e.g. Wireless Noise-Cancelling Headphones" 
                        />
                      </div>

                      <div className="relative" ref={categoryRef}>
                        <label className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                          <span>Category <span className="text-rose-500">*</span></span>
                          {errors.category && <span className="text-rose-500 Normal-case tracking-normal">{errors.category}</span>}
                        </label>
                        <div 
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm flex items-center justify-between cursor-pointer transition-all ${errors.category ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'}`}
                          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        >
                          <span className={formData.category ? 'text-slate-800' : 'text-slate-400'}>
                            {formData.category || 'Select category...'}
                          </span>
                          <ChevronDown size={16} className={`text-slate-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                        </div>
                        
                        {isCategoryOpen && (
                          <div className="absolute top-[100%] left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-20 max-h-60 overflow-hidden flex flex-col">
                            <div className="p-2 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                              <Search size={14} className="text-slate-400" />
                              <input 
                                type="text"
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                                className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-700"
                                placeholder="Search categories..."
                              />
                            </div>
                            <div className="overflow-y-auto flex-1 p-2 space-y-1">
                              {filteredCategories.length > 0 ? (
                                filteredCategories.map(cat => (
                                  <div 
                                    key={cat} 
                                    className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${formData.category === cat ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                                    onClick={() => handleCategorySelect(cat)}
                                  >
                                    {cat}
                                  </div>
                                ))
                              ) : (
                                <div className="p-3 text-center text-sm text-slate-500">No categories found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Barcode / SKU</label>
                        <input 
                          type="text" 
                          name="sku" 
                          value={formData.sku}
                          onChange={handleChange} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" 
                          placeholder="Leave blank to auto-generate" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-3">Pricing</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                          <span>Selling Price (₦) <span className="text-rose-500">*</span></span>
                          {errors.price && <span className="text-rose-500 Normal-case tracking-normal">{errors.price}</span>}
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                          <input 
                            type="number" 
                            name="price" 
                            value={formData.price}
                            onChange={handleChange} 
                            className={`w-full bg-slate-50 border rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all ${errors.price ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'}`} 
                            placeholder="0.00" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Cost Price (₦)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                          <input 
                            type="number" 
                            name="costPrice" 
                            value={formData.costPrice}
                            onChange={handleChange} 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" 
                            placeholder="0.00" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inventory & Supplier Section */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-3">Inventory & Supplier</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div>
                        <label className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                          <span>Stock Qty <span className="text-rose-500">*</span></span>
                          {errors.stock && <span className="text-rose-500 Normal-case tracking-normal">{errors.stock}</span>}
                        </label>
                        <input 
                          type="number" 
                          name="stock" 
                          value={formData.stock}
                          onChange={handleChange} 
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all ${errors.stock ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'}`} 
                          placeholder="0" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Low Stock Alert</label>
                        <input 
                          type="number" 
                          name="reorderLevel" 
                          value={formData.reorderLevel}
                          onChange={handleChange} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" 
                          placeholder="5" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Supplier</label>
                        <input 
                          type="text" 
                          name="supplier" 
                          value={formData.supplier}
                          onChange={handleChange} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all" 
                          placeholder="E.g. Nexus Corp" 
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
          
          {/* Footer - Sticky */}
          <div className="shrink-0 p-4 sm:p-6 border-t border-slate-100 bg-white z-10 flex flex-col sm:flex-row gap-3">
             <div className="flex flex-1 gap-3 order-2 sm:order-1 sm:w-auto w-full">
               <button onClick={handleExitClick} disabled={isSaving || showSuccess} className="flex-1 sm:flex-none px-6 py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">
                 Cancel
               </button>
               <button onClick={handleExitClick} disabled={isSaving || showSuccess} className="sm:hidden flex-1 px-6 py-3.5 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-rose-100 transition-colors">
                 Exit
               </button>
             </div>
             <div className="flex flex-1 sm:justify-end gap-3 order-1 sm:order-2 sm:w-auto w-full">
               <button onClick={() => executeSave(true)} disabled={isSaving || showSuccess} className="flex-1 sm:flex-none px-6 py-3.5 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-100 transition-colors">
                 Save & Add Another
               </button>
               <button onClick={() => executeSave(false)} disabled={isSaving || showSuccess} className="flex-1 sm:flex-none px-8 py-3.5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-colors shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2">
                 {isSaving ? (
                   <>
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     Saving...
                   </>
                 ) : (
                   <>
                     <Save size={16} /> Save Product
                   </>
                 )}
               </button>
             </div>
          </div>
        </div>
      </div>

      {showExitPrompt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
           <div className="bg-white rounded-[24px] w-full max-w-sm p-8 shadow-2xl text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                 <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-3 tracking-tight">Unsaved Changes</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                You have unsaved changes. What would you like to do?
              </p>
              
              <div className="flex flex-col gap-3">
                 <button onClick={() => { setShowExitPrompt(false); executeSave(false); }} className="w-full py-4 bg-[#10B981] hover:bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all">
                   Save & Exit
                 </button>
                 <button onClick={() => { setShowExitPrompt(false); onClose(); }} className="w-full py-4 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors">
                   Exit Without Saving
                 </button>
                 <button onClick={() => setShowExitPrompt(false)} className="w-full py-4 bg-white border-2 border-slate-100 hover:bg-slate-50 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors">
                   Continue Editing
                 </button>
              </div>
           </div>
        </div>
      )}
    </>
  );
}


import React, { useState } from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import GenericDataPage from './GenericDataPage';
import AddProductModal from '../components/AddProductModal';
import PremiumFeatureModal from '../components/PremiumFeatureModal';
import EditProductModal from '../components/EditProductModal';
import ViewProductModal from '../components/ViewProductModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

export default function ProductsInventory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock data
  const [products, setProducts] = useState([
    { id: 1, sku: 'LGT-M3S', name: 'Logitech Master 3s', category: 'Electronics', price: 95000, stock: 12 },
    { id: 2, sku: 'KIN-O1A', name: 'Kinetic Oak Desk', category: 'Furniture', price: 145000, stock: 4 },
  ]);

  const openView = (product: any) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const openEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const openDelete = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
    }
  };

  return (
    <>
      <GenericDataPage
        title="PRODUCTS INVENTORY"
        subtitle="Live Sync: 12:27:25"
        searchPlaceholder="Search products by name, SKU or description..."
        actions={
          <>
            <button className="px-4 py-2 border border-slate-200 bg-white text-slate-600 text-xs font-bold rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
              TEMPLATE
            </button>
            <button 
              onClick={() => setIsPremiumModalOpen(true)}
              className="px-4 py-2 border border-slate-200 bg-white text-slate-600 text-xs font-bold rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
            >
              IMPORT CSV
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              + ADD PRODUCT
            </button>
          </>
        }
        emptyState={
          products.length === 0 ? (
            <div className="flex flex-col items-center flex-1 justify-center h-full min-h-[400px]">
              <div className="text-4xl text-slate-300 mb-2">📦</div>
              <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-widest mb-2">
                NO PRODUCTS FOUND
              </h3>
            </div>
          ) : undefined
        }
      >
        {products.length > 0 && (
          <table className="w-full text-left whitespace-nowrap bg-white">
            <thead className="bg-slate-50 text-[10px] text-slate-500 font-bold uppercase tracking-widest border-b border-y border-slate-100">
              <tr>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Selling Price</th>
                <th className="px-6 py-4 text-right">In Stock</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{product.sku}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{product.name}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-800 text-right">₦{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${product.stock > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openView(product)} className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => openEdit(product)} className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-500 hover:text-blue-600 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => openDelete(product)} className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 flex items-center justify-center text-rose-500 hover:text-rose-600 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </GenericDataPage>
      
      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      
      {isPremiumModalOpen && (
        <PremiumFeatureModal onClose={() => setIsPremiumModalOpen(false)} />
      )}

      <EditProductModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        product={selectedProduct} 
      />
      
      <ViewProductModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        product={selectedProduct} 
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete ${selectedProduct?.name}? This action cannot be undone.`}
      />
    </>
  );
}

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product, User, Order } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { DriveService } from '../lib/drive';

interface AppContextType {
  products: Product[];
  users: User[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id' | 'lastUpdated'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'joinedAt'>) => Promise<void>;
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  isDriveSyncing: boolean;
  syncToDrive: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { googleAccessToken } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isDriveSyncing, setIsDriveSyncing] = useState(false);
  const dataRef = useRef({ products, users, orders });
  dataRef.current = { products, users, orders };

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    });
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)));
    });
    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
    });
    return () => { unsubProducts(); unsubUsers(); unsubOrders(); };
  }, []);

  const addProduct = async (productData: Omit<Product, 'id' | 'lastUpdated'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    await setDoc(doc(db, 'products', id), {
      ...productData,
      lastUpdated: new Date().toISOString(),
    });
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    await updateDoc(doc(db, 'products', id), {
      ...updates,
      lastUpdated: new Date().toISOString()
    });
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  };

  const addUser = async (userData: Omit<User, 'id' | 'joinedAt'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    await setDoc(doc(db, 'users', id), {
      ...userData,
      joinedAt: new Date().toISOString(),
    });
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    await updateDoc(doc(db, 'users', id), updates);
  };

  const deleteUser = async (id: string) => {
    await deleteDoc(doc(db, 'users', id));
  };

  const syncToDrive = async () => {
    if (!googleAccessToken) return;
    setIsDriveSyncing(true);
    try {
      const drive = new DriveService(googleAccessToken);
      await drive.saveAppData('terrabiz_backup.json', dataRef.current);
      console.log('Successfully backed up to Google Drive');
    } catch (e) {
      console.error('Failed to sync to Drive', e);
    } finally {
      setIsDriveSyncing(false);
    }
  };

  useEffect(() => {
    if (!googleAccessToken) return;
    const timeout = setTimeout(() => {
      syncToDrive();
    }, 10000); // 10 second debounce
    return () => clearTimeout(timeout);
  }, [products, users, orders, googleAccessToken]);

  return (
    <AppContext.Provider value={{
      products, users, orders,
      addProduct, updateProduct, deleteProduct,
      addUser, updateUser, deleteUser,
      isDriveSyncing, syncToDrive
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export type UserRole = 'admin' | 'manager' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'active' | 'inactive' | 'invited';
  joinedAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  image?: string;
  lastUpdated: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  manager: string;
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
  items: number;
}

export interface DashboardMetric {
  title: string;
  value: string | number;
  change: number;
  isCurrency?: boolean;
}

import { Product, User, Order } from '../types';

export const mockProducts: Product[] = [
  { id: '1', name: 'Premium Wireless Headphones', sku: 'AUDIO-001', category: 'Electronics', price: 299.99, stock: 45, status: 'in-stock', lastUpdated: '2023-10-15T10:00:00Z' },
  { id: '2', name: 'Ergonomic Office Chair', sku: 'FURN-002', category: 'Furniture', price: 199.50, stock: 12, status: 'low-stock', lastUpdated: '2023-10-14T09:30:00Z' },
  { id: '3', name: 'Smart Fitness Watch', sku: 'WEAR-003', category: 'Electronics', price: 149.00, stock: 0, status: 'out-of-stock', lastUpdated: '2023-10-10T14:20:00Z' },
  { id: '4', name: 'Mechanical Keyboard', sku: 'COMP-004', category: 'Electronics', price: 129.99, stock: 85, status: 'in-stock', lastUpdated: '2023-10-16T11:15:00Z' },
  { id: '5', name: 'Ceramic Coffee Mug', sku: 'HOME-005', category: 'Home Goods', price: 18.00, stock: 120, status: 'in-stock', lastUpdated: '2023-10-12T08:45:00Z' },
];

export const mockUsers: User[] = [];

export const mockOrders: Order[] = [
  { id: 'ORD-1001', customerName: 'Acme Corp', total: 1245.50, status: 'completed', date: '2023-10-24T14:30:00Z', items: 5 },
  { id: 'ORD-1002', customerName: 'TechStart Inc', total: 450.00, status: 'pending', date: '2023-10-24T16:45:00Z', items: 2 },
  { id: 'ORD-1003', customerName: 'Global Retail', total: 3200.75, status: 'completed', date: '2023-10-23T09:15:00Z', items: 12 },
  { id: 'ORD-1004', customerName: 'Individual Buyer', total: 29.99, status: 'cancelled', date: '2023-10-22T11:20:00Z', items: 1 },
];

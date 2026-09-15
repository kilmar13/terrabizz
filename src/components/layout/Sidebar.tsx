import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, MonitorSmartphone, Calculator, Package, ClipboardList,
  Tags, Truck, Store, Users, AlertTriangle, Briefcase, Receipt, History, Activity,
  BarChart, Globe, CreditCard, PlayCircle, Settings, Info, Lock, Home
} from 'lucide-react';
import { cn } from '../../lib/utils';
import Logo from '../Logo';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Home', path: '/', icon: Home },
  { name: 'POS Terminal', path: '/pos', icon: MonitorSmartphone },
  { name: 'Calculator', path: '/calculator', icon: Calculator },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Inventory', path: '/inventory', icon: ClipboardList },
  { name: 'Categories', path: '/categories', icon: Tags },
  { name: 'Suppliers', path: '/suppliers', icon: Truck },
  { name: 'Stores', path: '/stores', icon: Store },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Debtors', path: '/debtors', icon: AlertTriangle },
  { name: 'Team', path: '/team', icon: Briefcase },
  { name: 'Expenses', path: '/expenses', icon: Receipt },
  { name: 'Orders History', path: '/orders-history', icon: History },
  { name: 'History', path: '/history', icon: Activity },
  { name: 'Reports', path: '/reports', icon: BarChart },
  { name: 'Storefront', path: '/storefront', icon: Globe },
  { name: 'Marketplace', path: '/marketplace', icon: Store },
  { name: 'Subscription', path: '/subscription', icon: CreditCard },
  { name: 'Tutorial', path: '/tutorial', icon: PlayCircle },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Security', path: '/settings/security', icon: Lock },
  { name: 'About', path: '/about', icon: Info },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:flex w-64 bg-slate-900 h-full flex-col shrink-0 text-slate-300 overflow-y-auto overflow-x-hidden custom-scrollbar border-r border-slate-800">
      <div className="p-6 shrink-0">
        <div className="flex items-center gap-2.5">
          <Logo className="w-8 h-8" />
          <div className="flex flex-col justify-center translate-y-[-1px]">
            <span className="text-lg lg:text-xl font-black tracking-tight text-white leading-none">Terrabiz</span>
            <span className="text-[8px] font-mono font-bold tracking-widest text-[#10B981] uppercase mt-0.5">Inventory & Stock</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-6 flex flex-col space-y-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={(e) => {
              if (item.path === '/') {
                e.preventDefault();
                navigate(item.path);
                window.scrollTo(0, 0);
              }
            }}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              (isActive && item.path !== '/') 
                ? "bg-[#10B981]/10 text-[#10B981]" 
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </div>
      
      <div className="mt-auto px-5 pb-6">
        <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-800 text-center">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Product by</p>
          <p className="text-[10px] font-bold text-slate-300 uppercase">Terrabiz Enterprise</p>
        </div>
      </div>
    </div>
  );
}

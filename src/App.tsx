import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import AuthGuard from "./components/AuthGuard";
import Login from "./pages/Login";

// Layout
import PageLayout from "./components/layout/PageLayout";

// Core Pages
import Dashboard from "./pages/Dashboard";
import GenericDataPage from "./pages/GenericDataPage";
import PosTerminal from "./pages/PosTerminal";
import Calculator from "./pages/Calculator";
import Inventory from "./pages/Inventory";
import ProductsInventory from "./pages/ProductsInventory";

import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Team from "./pages/Team";

import OrdersHistory from "./pages/OrdersHistory";
import Expenses from "./pages/Expenses";
import History from "./pages/History";

import Reports from "./pages/Reports";
import Storefront from "./pages/Storefront";
import Subscription from "./pages/Subscription";
import Tutorial from "./pages/Tutorial";
import About from "./pages/About";
import SecuritySettings from "./pages/SecuritySettings";
import Welcome from "./pages/Landing";
import Marketplace from "./pages/Marketplace";
import BusinessDirectory from "./pages/BusinessDirectory";
import Ecosystem from "./pages/Ecosystem";
import VendorStores from "./pages/VendorStores";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";

import StoresLocations from "./pages/StoresLocations";
import CustomerManagement from "./pages/CustomerManagement";
import DebtRegistry from "./pages/DebtRegistry";
import Messages from "./pages/Messages";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Navigate to="/" replace />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/business-directory" element={<BusinessDirectory />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/services" element={<Navigate to="/ecosystem" replace />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<AuthGuard />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/vendor-stores" element={<VendorStores />} />
            <Route element={<PageLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/pos" element={<PosTerminal />} />

              <Route path="/calculator" element={<Calculator />} />

              <Route
                path="/products"
                element={<ProductsInventory />}
              />

              <Route path="/inventory" element={<Inventory />} />

              <Route path="/categories" element={<Categories />} />

              <Route path="/suppliers" element={<Suppliers />} />

              <Route path="/stores" element={<StoresLocations />} />

              <Route path="/customers" element={<CustomerManagement />} />

              <Route path="/debtors" element={<DebtRegistry />} />

              <Route path="/team" element={<Team />} />

              <Route path="/expenses" element={<Expenses />} />

              <Route path="/orders-history" element={<OrdersHistory />} />
              
              <Route path="/history" element={<History />} />

              <Route path="/reports" element={<Reports />} />

              <Route path="/subscription" element={<Subscription />} />

              <Route path="/tutorial" element={<Tutorial />} />

              <Route path="/settings" element={<Settings />} />
              
              <Route path="/settings/security" element={<SecuritySettings />} />

              <Route path="/about" element={<About />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
            
            {/* Standalone Views requiring auth (none right now) */}
            <Route path="/messages" element={<Messages />} />
          </Route>
          
          <Route path="/storefront" element={<Storefront />} />
        </Routes>
      </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

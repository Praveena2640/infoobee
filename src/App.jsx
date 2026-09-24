import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import InventoryPage from './pages/InventoryPage';
import AIInsightsPage from './pages/AIInsightsPage';
import SalesPage from './pages/SalesPage';
import PurchasingPage from './pages/PurchasingPage';
import ReportsPage from './pages/ReportsPage';
import SuppliersPage from './pages/SuppliersPage';
import CustomersPage from './pages/CustomersPage';
import SettingsPage from './pages/SettingsPage';
import RestockPage from './pages/RestockPage';
import TasksPage from './pages/TasksPage';

import EmployeeLayout from './layouts/EmployeeLayout';
import EmployeeDashboard from './pages/EmployeeDashboard';
import VendorLayout from './layouts/VendorLayout';
import VendorDashboard from './pages/VendorDashboard';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Manager Routes */}
      <Route path="/manager" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="ai-insights" element={<AIInsightsPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="purchasing" element={<PurchasingPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="restock" element={<RestockPage />} />
      </Route>

      {/* Employee Routes */}
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route index element={<EmployeeDashboard />} />
      </Route>

      {/* Vendor Routes */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashboard />} />
        <Route path="catalog" element={<PlaceholderPage title="Vendor Catalog" />} />
        <Route path="invoices" element={<PlaceholderPage title="Invoices" />} />
      </Route>
    </Routes>
  );
}

export default App;

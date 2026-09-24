import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, PackageSearch, Boxes, 
  Users, Briefcase, FileText, Settings, Bell, Search,
  Activity, UserCircle, LogOut, MessageSquare
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import FloatingAI from '../components/FloatingAI';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { notifications, logoutUser } = useAppContext();
  const unreadCount = notifications.length;

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Activity size={24} color="var(--accent-color)" />
          <span className="sidebar-brand">BizSync</span>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-group">
            <p className="nav-group-title">Main</p>
            <NavLink to="/manager" end className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <LayoutDashboard size={18} /> <span>Dashboard</span>
            </NavLink>
            <NavLink to="/manager/sales" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <ShoppingCart size={18} /> <span>Sales</span>
            </NavLink>
            <NavLink to="/manager/inventory" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Boxes size={18} /> <span>Inventory</span>
            </NavLink>
            <NavLink to="/manager/purchasing" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <PackageSearch size={18} /> <span>Purchasing</span>
            </NavLink>
          </div>

          <div className="nav-group">
            <p className="nav-group-title">Intelligence</p>
            <NavLink to="/manager/ai-insights" className={({isActive}) => isActive ? 'nav-item active ai-nav-item' : 'nav-item ai-nav-item'}>
              <Activity size={18} /> <span>AI Insights</span>
            </NavLink>
            <NavLink to="/manager/reports" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <FileText size={18} /> <span>Reports</span>
            </NavLink>
          </div>

          <div className="nav-group">
            <p className="nav-group-title">Network & Ops</p>
            <NavLink to="/manager/suppliers" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Briefcase size={18} /> <span>Suppliers</span>
            </NavLink>
            <NavLink to="/manager/customers" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Users size={18} /> <span>Customers</span>
            </NavLink>
            <NavLink to="/manager/tasks" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Activity size={18} /> <span>Task Assignment</span>
            </NavLink>
          </div>
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/manager/settings" className="nav-item">
            <Settings size={18} /> <span>Settings</span>
          </NavLink>
          <button className="nav-item text-danger" onClick={handleLogout}>
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-area">
        {/* Top Navbar */}
        <header className="topbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search everywhere..." className="search-input" />
          </div>

          <div className="topbar-actions">
            <div className="notification-bell">
              <Bell size={20} />
              {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
            </div>
            
            <div className="user-profile">
              <UserCircle size={24} />
              <div className="user-info">
                <span className="user-name">Admin User</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content-wrapper">
          <Outlet />
        </div>
      </main>

      {/* Floating AI Assistant */}
      <FloatingAI />
    </div>
  );
};

export default DashboardLayout;

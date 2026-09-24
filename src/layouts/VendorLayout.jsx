import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Package, Search, Bell, UserCircle, LogOut, Activity
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../layouts/DashboardLayout.css';

const VendorLayout = () => {
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
          <span className="sidebar-brand">Vendor Portal</span>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-group">
            <p className="nav-group-title">Portal</p>
            <NavLink to="/vendor" end className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Package size={18} /> <span>Purchase Orders</span>
            </NavLink>
            <NavLink to="/vendor/catalog" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Activity size={18} /> <span>My Catalog</span>
            </NavLink>
          </div>
          <div className="nav-group">
            <p className="nav-group-title">Finance</p>
            <NavLink to="/vendor/invoices" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <Search size={18} /> <span>Invoices</span>
            </NavLink>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item text-danger" onClick={handleLogout}>
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-area">
        <header className="topbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search orders..." className="search-input" />
          </div>

          <div className="topbar-actions">
            <div className="notification-bell">
              <Bell size={20} />
              {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
            </div>
            
            <div className="user-profile">
              <UserCircle size={24} />
              <div className="user-info">
                <span className="user-name">Vendor Partner</span>
                <span className="user-role">External</span>
              </div>
            </div>
          </div>
        </header>

        <div className="page-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendorLayout;

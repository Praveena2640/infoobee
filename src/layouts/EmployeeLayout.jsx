import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Briefcase, Users, LayoutDashboard, Settings, Bell, Search,
  Activity, UserCircle, LogOut
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../layouts/DashboardLayout.css'; // Reuse styles

const EmployeeLayout = () => {
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
          <span className="sidebar-brand">BizSync Workspace</span>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-group">
            <p className="nav-group-title">My Work</p>
            <NavLink to="/employee" end className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
              <LayoutDashboard size={18} /> <span>My Dashboard</span>
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
            <input type="text" placeholder="Search tasks or customers..." className="search-input" />
          </div>

          <div className="topbar-actions">
            <div className="notification-bell">
              <Bell size={20} />
              {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
            </div>
            
            <div className="user-profile">
              <UserCircle size={24} />
              <div className="user-info">
                <span className="user-name">Employee User</span>
                <span className="user-role">Staff</span>
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

export default EmployeeLayout;

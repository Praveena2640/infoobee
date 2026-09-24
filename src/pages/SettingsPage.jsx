import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Bell, Shield, Database, Building2, CreditCard } from 'lucide-react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account settings and ERP preferences.</p>
      </div>

      <div className="settings-container">
        <Card className="settings-sidebar-card">
          <CardContent className="settings-nav">
            <button 
              className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> <span>My Profile</span>
            </button>
            <button 
              className={`settings-nav-item ${activeTab === 'company' ? 'active' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              <Building2 size={18} /> <span>Company Details</span>
            </button>
            <button 
              className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={18} /> <span>Notifications</span>
            </button>
            <button 
              className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} /> <span>Security & Roles</span>
            </button>
            <button 
              className={`settings-nav-item ${activeTab === 'integrations' ? 'active' : ''}`}
              onClick={() => setActiveTab('integrations')}
            >
              <Database size={18} /> <span>Integrations</span>
            </button>
            <button 
              className={`settings-nav-item ${activeTab === 'billing' ? 'active' : ''}`}
              onClick={() => setActiveTab('billing')}
            >
              <CreditCard size={18} /> <span>Billing & Plan</span>
            </button>
          </CardContent>
        </Card>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="settings-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <Input defaultValue="Admin" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <Input defaultValue="User" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <Input type="email" defaultValue="admin@bizsync.com" />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <Input defaultValue="Administrator" disabled />
                </div>
                <div className="settings-actions">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'company' && (
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="settings-form">
                <div className="form-group">
                  <label>Company Name</label>
                  <Input defaultValue="Acme Corporation" />
                </div>
                <div className="form-group">
                  <label>Registration Number</label>
                  <Input defaultValue="GSTIN-0987654321" />
                </div>
                <div className="form-group">
                  <label>Primary Currency</label>
                  <select className="settings-select">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <Input defaultValue="123 Business Park, Tech City" />
                </div>
                <div className="settings-actions">
                  <Button variant="primary">Save Company Info</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="settings-form">
                <div className="toggle-group">
                  <div className="toggle-info">
                    <h4>Low Stock Alerts</h4>
                    <p>Receive notifications when inventory falls below reorder level.</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-group">
                  <div className="toggle-info">
                    <h4>AI Smart Recommendations</h4>
                    <p>Let AI suggest reorder quantities and demand forecasts.</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-group">
                  <div className="toggle-info">
                    <h4>Purchase Approvals</h4>
                    <p>Get alerted when a purchase request requires your approval.</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </CardContent>
            </Card>
          )}

          {['security', 'integrations', 'billing'].includes(activeTab) && (
            <Card>
              <CardHeader>
                <CardTitle>Module Under Construction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary">This section of the settings is locked for the demo version.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

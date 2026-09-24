import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, Users, CheckSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './DashboardOverview.css';

const DashboardOverview = () => {
  const { inventory, sales, purchaseRequests } = useAppContext();

  const totalSalesAmount = sales.reduce((acc, s) => acc + s.amount, 0);
  const lowStockCount = inventory.filter(i => i.status !== 'Healthy').length;
  const pendingApprovalsCount = purchaseRequests.filter(pr => pr.status === 'Pending Approval').length;

  // Generate dynamic chart data from real sales
  const salesByDate = {};
  sales.forEach(sale => {
    if (!salesByDate[sale.date]) {
      salesByDate[sale.date] = 0;
    }
    salesByDate[sale.date] += sale.amount;
  });

  const chartData = Object.keys(salesByDate).sort().map(date => ({
    name: date,
    sales: salesByDate[date]
  }));

  return (
    <div className="dashboard-overview">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="kpi-grid">
        <Card>
          <CardContent className="kpi-card-content">
            <div className="kpi-header">
              <div>
                <p className="kpi-label">Total Sales</p>
                <h3 className="kpi-value">₹{(totalSalesAmount / 100000).toFixed(2)}L</h3>
              </div>
              <div className="kpi-icon bg-accent-light text-accent">
                <ShoppingCart size={24} />
              </div>
            </div>
            <div className="kpi-footer text-success">
              <ArrowUpRight size={16} /> <span>+12.8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="kpi-card-content">
            <div className="kpi-header">
              <div>
                <p className="kpi-label">Inventory Items</p>
                <h3 className="kpi-value">{inventory.length}</h3>
              </div>
              <div className="kpi-icon bg-success-light text-success">
                <Package size={24} />
              </div>
            </div>
            <div className="kpi-footer text-success">
              <ArrowUpRight size={16} /> <span>+4.2% value increase</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="kpi-card-content">
            <div className="kpi-header">
              <div>
                <p className="kpi-label">Low Stock Alerts</p>
                <h3 className="kpi-value">{lowStockCount}</h3>
              </div>
              <div className="kpi-icon bg-danger-light text-danger">
                <Package size={24} />
              </div>
            </div>
            <div className="kpi-footer text-danger">
              <ArrowDownRight size={16} /> <span>Needs attention</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="kpi-card-content">
            <div className="kpi-header">
              <div>
                <p className="kpi-label">Pending Approvals</p>
                <h3 className="kpi-value">{pendingApprovalsCount}</h3>
              </div>
              <div className="kpi-icon bg-warning-light text-warning">
                <CheckSquare size={24} />
              </div>
            </div>
            <div className="kpi-footer text-warning">
              <span>Requires action</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="dashboard-main-grid">
        <Card className="chart-card">
          <CardHeader>
            <CardTitle>Sales & Inventory Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)'}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Area type="monotone" dataKey="sales" stroke="var(--accent-color)" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="recent-activity-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="activity-list">
              {sales.slice(0, 3).map((sale, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon bg-accent-light text-accent">
                    <ShoppingCart size={16} />
                  </div>
                  <div className="activity-details">
                    <p className="activity-text">New order <strong>{sale.id}</strong> completed</p>
                    <p className="activity-time">{sale.date}</p>
                  </div>
                  <div className="activity-amount">
                    +₹{sale.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              {purchaseRequests.map((pr, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon bg-warning-light text-warning">
                    <CheckSquare size={16} />
                  </div>
                  <div className="activity-details">
                    <p className="activity-text">Purchase Request for <strong>{pr.product}</strong></p>
                    <p className="activity-time">Pending Approval</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;

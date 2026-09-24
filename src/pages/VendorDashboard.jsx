import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PackageOpen, CheckCircle, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../pages/DashboardOverview.css';

const VendorDashboard = () => {
  const { purchaseRequests, approveRequest } = useAppContext();

  // For vendor, we show purchase requests as "Orders to fulfill"
  const pendingOrders = purchaseRequests.filter(pr => pr.status === 'Pending Approval');
  const fulfilledOrders = purchaseRequests.filter(pr => pr.status !== 'Pending Approval');
  const totalRevenue = fulfilledOrders.reduce((acc, order) => acc + order.total, 0);

  // Mock monthly revenue data for chart
  const monthlyRevenueData = [
    { name: 'May', revenue: Math.floor(Math.random() * 200000) + 50000 },
    { name: 'Jun', revenue: Math.floor(Math.random() * 200000) + 50000 },
    { name: 'Jul', revenue: Math.floor(Math.random() * 200000) + 50000 },
    { name: 'Aug', revenue: Math.floor(Math.random() * 200000) + 50000 },
    { name: 'Sep', revenue: totalRevenue + 100000 }, // Current month
  ];

  return (
    <div className="dashboard-overview">
      <div className="page-header">
        <h1 className="page-title">Vendor Portal</h1>
        <p className="page-subtitle">Manage your incoming purchase orders, fulfillments, and revenue metrics.</p>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid mb-6">
        <Card>
          <CardContent className="kpi-card-content">
            <div className="kpi-header">
              <div>
                <p className="kpi-label">Total Revenue Earned</p>
                <h3 className="kpi-value">₹{(totalRevenue / 100000).toFixed(2)}L</h3>
              </div>
              <div className="kpi-icon bg-success-light text-success">
                <DollarSign size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="kpi-card-content">
            <div className="kpi-header">
              <div>
                <p className="kpi-label">Pending Fulfillments</p>
                <h3 className="kpi-value">{pendingOrders.length}</h3>
              </div>
              <div className="kpi-icon bg-warning-light text-warning">
                <PackageOpen size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="kpi-card-content">
            <div className="kpi-header">
              <div>
                <p className="kpi-label">Orders Completed</p>
                <h3 className="kpi-value">{fulfilledOrders.length}</h3>
              </div>
              <div className="kpi-icon bg-accent-light text-accent">
                <CheckCircle size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity size={20} className="text-accent"/> Monthly Revenue Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)'}} />
                <Tooltip cursor={{fill: 'var(--bg-secondary)'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="revenue" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="dashboard-main-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        
        {/* Left Column */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <PackageOpen size={20} /> Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
               {pendingOrders.length === 0 ? (
                 <p className="text-secondary p-4 font-medium">No pending orders to fulfill right now.</p>
               ) : (
                 <div className="activity-list mt-4">
                   {pendingOrders.map(pr => (
                     <div key={pr.id} className="p-4 border border-[var(--border-color)] rounded-lg mb-4 flex justify-between items-center">
                       <div>
                         <h4 className="font-semibold">{pr.product}</h4>
                         <p className="text-sm text-[var(--text-secondary)] mt-1">Quantity: {pr.quantity}</p>
                         <p className="text-sm font-semibold text-success mt-1">Total: ₹{pr.total.toLocaleString()}</p>
                       </div>
                       <Button variant="primary" size="sm" onClick={() => approveRequest(pr.id)}>
                         Approve & Ship
                       </Button>
                     </div>
                   ))}
                 </div>
               )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <CheckCircle size={20} /> Fulfilled History
              </CardTitle>
            </CardHeader>
            <CardContent>
               {fulfilledOrders.length === 0 ? (
                 <p className="text-secondary p-4 font-medium">No order history available.</p>
               ) : (
                 <div className="activity-list mt-4">
                   {fulfilledOrders.map(pr => (
                     <div key={pr.id} className="p-3 border-b border-[var(--border-color)] mb-2 flex justify-between items-center">
                       <div>
                         <p className="font-semibold">{pr.product} <span className="text-secondary font-normal">x{pr.quantity}</span></p>
                       </div>
                       <Badge variant="success">Shipped</Badge>
                     </div>
                   ))}
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

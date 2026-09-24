import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { TrendingUp, ShoppingCart, ArrowUpRight, Plus, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './SalesPage.css';

const SalesPage = () => {
  const { sales, inventory, recordSale } = useAppContext();

  const totalRevenue = sales.reduce((acc, s) => acc + s.amount, 0);

  const handleCreateSale = () => {
    if (inventory && inventory.length > 0) {
      const randomItem = inventory[Math.floor(Math.random() * inventory.length)];
      const randomQty = Math.floor(Math.random() * 3) + 1;
      const randomAmount = Math.floor(Math.random() * 50000) + 10000;
      recordSale(randomItem.name, randomQty, randomAmount);
    } else {
      recordSale("Miscellaneous Product", 1, 25000);
    }
  };
  
  // Generate dynamic sales data for chart
  const salesByDate = {};
  sales.forEach(sale => {
    if (!salesByDate[sale.date]) {
      salesByDate[sale.date] = 0;
    }
    salesByDate[sale.date] += sale.amount;
  });

  const salesChartData = Object.keys(salesByDate).sort().map(date => ({
    date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    revenue: salesByDate[date]
  }));

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return <Badge variant="success">Completed</Badge>;
      case 'Processing': return <Badge variant="warning">Processing</Badge>;
      case 'Refunded': return <Badge variant="danger">Refunded</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="sales-page">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Sales & Revenue</h1>
          <p className="page-subtitle">Track your transactions, revenue metrics, and recent orders.</p>
        </div>
        <div className="header-actions">
          <Button variant="secondary" icon={<Download size={16} />} onClick={() => window.print()}>Export Report</Button>
          <Button variant="primary" icon={<Plus size={16} />} onClick={handleCreateSale}>Create New Sale</Button>
        </div>
      </div>

      <div className="sales-metrics">
        <Card>
          <CardContent className="metric-content-sm">
            <div className="metric-header-sm">
              <p className="metric-label-sm">Total Revenue</p>
              <div className="metric-icon-sm bg-accent-light text-accent">
                <TrendingUp size={18} />
              </div>
            </div>
            <h3 className="metric-value-sm">₹{(totalRevenue / 100000).toFixed(2)}L</h3>
            <p className="metric-trend text-success"><ArrowUpRight size={14} /> +8.4% this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="metric-content-sm">
            <div className="metric-header-sm">
              <p className="metric-label-sm">Total Orders</p>
              <div className="metric-icon-sm bg-success-light text-success">
                <ShoppingCart size={18} />
              </div>
            </div>
            <h3 className="metric-value-sm">{sales.length}</h3>
            <p className="metric-trend text-success"><ArrowUpRight size={14} /> +12.1% this week</p>
          </CardContent>
        </Card>
        
        <Card className="revenue-chart-card">
          <CardContent className="revenue-chart-content">
            <div style={{ width: '100%', height: 100 }}>
              <ResponsiveContainer>
                <AreaChart data={salesChartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--success-color)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--success-color)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="var(--success-color)" fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map(sale => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.items}</TableCell>
                  <TableCell className="font-semibold text-success">
                    ₹{sale.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  <TableCell>
                    <Button variant="secondary" size="sm">View Invoice</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPage;

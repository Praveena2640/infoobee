import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Users, UserPlus, Search, Download, ArrowUpRight } from 'lucide-react';
import './CustomersPage.css';

const mockCustomers = [
  { id: 'CUST-001', name: 'Acme Corp', contact: 'John Doe', email: 'john@acmecorp.com', totalSpent: 1250000, lastOrder: '2026-09-20', status: 'Active' },
  { id: 'CUST-002', name: 'Stark Industries', contact: 'Tony Stark', email: 'tony@stark.com', totalSpent: 5400000, lastOrder: '2026-09-15', status: 'Active' },
  { id: 'CUST-003', name: 'Wayne Enterprises', contact: 'Bruce Wayne', email: 'bruce@wayne.com', totalSpent: 3200000, lastOrder: '2026-08-10', status: 'Inactive' },
  { id: 'CUST-004', name: 'Globex Corp', contact: 'Hank Scorpio', email: 'hank@globex.com', totalSpent: 450000, lastOrder: '2026-09-22', status: 'Active' },
  { id: 'CUST-005', name: 'Initech', contact: 'Peter Gibbons', email: 'peter@initech.com', totalSpent: 120000, lastOrder: '2025-12-01', status: 'Churned' },
];

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <Badge variant="success">Active</Badge>;
      case 'Inactive': return <Badge variant="warning">Inactive</Badge>;
      case 'Churned': return <Badge variant="danger">Churned</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const handleViewProfile = (customer) => {
    alert(`Customer Profile:\n\nCompany: ${customer.name}\nContact: ${customer.contact}\nEmail: ${customer.email}\nStatus: ${customer.status}\nTotal Spent: ₹${(customer.totalSpent / 100000).toFixed(2)}L\nLast Order: ${customer.lastOrder}`);
  };

  return (
    <div className="customers-page">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Customer Directory</h1>
          <p className="page-subtitle">Manage client relationships, track lifetime value, and view purchase history.</p>
        </div>
        <div className="header-actions">
          <Button variant="secondary" icon={<Download size={16} />}>Export CSV</Button>
          <Button variant="primary" icon={<UserPlus size={16} />}>Add Customer</Button>
        </div>
      </div>

      <div className="customers-metrics">
        <Card>
          <CardContent className="metric-content-sm">
            <div className="metric-header-sm">
              <p className="metric-label-sm">Total Customers</p>
              <div className="metric-icon-sm bg-accent-light text-accent">
                <Users size={18} />
              </div>
            </div>
            <h3 className="metric-value-sm">1,284</h3>
            <p className="metric-trend text-success"><ArrowUpRight size={14} /> +12 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="metric-content-sm">
            <div className="metric-header-sm">
              <p className="metric-label-sm">Active Clients</p>
              <div className="metric-icon-sm bg-success-light text-success">
                <Users size={18} />
              </div>
            </div>
            <h3 className="metric-value-sm">892</h3>
            <p className="metric-trend text-success"><ArrowUpRight size={14} /> 69% retention rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="metric-content-sm">
            <div className="metric-header-sm">
              <p className="metric-label-sm">Avg. Lifetime Value</p>
              <div className="metric-icon-sm bg-warning-light text-warning">
                <Users size={18} />
              </div>
            </div>
            <h3 className="metric-value-sm">₹2.4L</h3>
            <p className="metric-trend text-success"><ArrowUpRight size={14} /> +4.2% YoY</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="customers-card-header">
          <div className="search-bar customers-search">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by company or contact name..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Primary Contact</TableHead>
                <TableHead>Total Spent (LTV)</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map(customer => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-primary">{customer.name}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{customer.contact}</p>
                      <p className="text-sm text-secondary">{customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ₹{(customer.totalSpent / 100000).toFixed(2)}L
                  </TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <Button variant="secondary" size="sm" onClick={() => handleViewProfile(customer)}>View Profile</Button>
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

export default CustomersPage;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Briefcase, MapPin, Mail, Phone, ExternalLink, Plus } from 'lucide-react';
import './SuppliersPage.css';

const initialSuppliers = [
  { id: 'SUP-001', name: 'TechCorp Electronics', contact: 'Sarah Jenkins', email: 'orders@techcorp.com', phone: '+91 98765 43210', location: 'Bangalore, KA', status: 'Active', rating: 4.8 },
  { id: 'SUP-002', name: 'OfficePlus Furniture', contact: 'Rajesh Kumar', email: 'sales@officeplus.in', phone: '+91 99887 76655', location: 'Mumbai, MH', status: 'Active', rating: 4.2 },
  { id: 'SUP-003', name: 'KeyKey Accessories', contact: 'Anita Desai', email: 'wholesale@keykey.com', phone: '+91 91234 56789', location: 'Hyderabad, TS', status: 'On Hold', rating: 3.5 },
  { id: 'SUP-004', name: 'Global Logistics', contact: 'Vikram Singh', email: 'freight@globallog.in', phone: '+91 98712 34567', location: 'Delhi, DL', status: 'Active', rating: 4.9 },
];

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);

  const handleAddSupplier = () => {
    const name = prompt("Enter the new supplier's company name:");
    if (!name) return;
    
    const newSupplier = {
      id: `SUP-00${suppliers.length + 1}`,
      name: name,
      contact: 'Pending Assign',
      email: `contact@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      phone: '+91 00000 00000',
      location: 'Pending Details',
      status: 'Active',
      rating: 5.0
    };
    
    setSuppliers([newSupplier, ...suppliers]);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <Badge variant="success">Active</Badge>;
      case 'On Hold': return <Badge variant="warning">On Hold</Badge>;
      case 'Inactive': return <Badge variant="danger">Inactive</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="suppliers-page">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Supplier Management</h1>
          <p className="page-subtitle">Manage your vendor network, contracts, and performance ratings.</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={handleAddSupplier}>Add Supplier</Button>
      </div>

      <div className="suppliers-grid">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="supplier-card">
            <CardContent className="supplier-content">
              <div className="supplier-header">
                <div className="supplier-brand">
                  <div className="supplier-icon bg-accent-light text-accent">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="supplier-name">{supplier.name}</h3>
                    <p className="supplier-id text-secondary text-sm">{supplier.id}</p>
                  </div>
                </div>
                {getStatusBadge(supplier.status)}
              </div>
              
              <div className="supplier-details">
                <div className="detail-item">
                  <MapPin size={16} className="text-tertiary" />
                  <span className="text-sm">{supplier.location}</span>
                </div>
                <div className="detail-item">
                  <Mail size={16} className="text-tertiary" />
                  <span className="text-sm">{supplier.email}</span>
                </div>
                <div className="detail-item">
                  <Phone size={16} className="text-tertiary" />
                  <span className="text-sm">{supplier.phone}</span>
                </div>
              </div>

              <div className="supplier-footer">
                <div className="supplier-rating">
                  <span className="rating-star">★</span> {supplier.rating} / 5.0
                </div>
                <Button variant="ghost" size="sm" icon={<ExternalLink size={14} />}>View Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Supplier Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Delivery ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">DEL-082</TableCell>
                <TableCell>TechCorp Electronics</TableCell>
                <TableCell>Today, 10:30 AM</TableCell>
                <TableCell>50x MacBook Pro</TableCell>
                <TableCell><Badge variant="success">Received</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DEL-081</TableCell>
                <TableCell>OfficePlus Furniture</TableCell>
                <TableCell>Yesterday, 2:15 PM</TableCell>
                <TableCell>20x Ergonomic Chair</TableCell>
                <TableCell><Badge variant="success">Received</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DEL-080</TableCell>
                <TableCell>KeyKey Accessories</TableCell>
                <TableCell>Sep 18, 2026</TableCell>
                <TableCell>100x Mechanical Keyboard</TableCell>
                <TableCell><Badge variant="warning">Delayed</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuppliersPage;

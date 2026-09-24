import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './PurchasingPage.css';

const PurchasingPage = () => {
  const navigate = useNavigate();
  const { purchaseRequests, approveRequest } = useAppContext();

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved': return <Badge variant="success">Approved</Badge>;
      case 'Pending Approval': return <Badge variant="warning">Pending Approval</Badge>;
      case 'Rejected': return <Badge variant="danger">Rejected</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="purchasing-page">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Purchasing & Approvals</h1>
          <p className="page-subtitle">Manage purchase requests, purchase orders, and supplier invoices.</p>
        </div>
        <Button variant="primary" icon={<FileText size={16} />} onClick={() => navigate('/dashboard/restock')}>New Purchase Request</Button>
      </div>

      <div className="purchasing-metrics">
        <Card className="metric-card">
          <CardContent className="metric-content">
            <div className="metric-info">
              <p className="metric-label">Pending Requests</p>
              <h3 className="metric-value">{purchaseRequests.filter(pr => pr.status === 'Pending Approval').length}</h3>
            </div>
            <div className="metric-icon bg-warning-light text-warning">
              <Clock size={24} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="metric-card">
          <CardContent className="metric-content">
            <div className="metric-info">
              <p className="metric-label">Approved This Month</p>
              <h3 className="metric-value">{purchaseRequests.filter(pr => pr.status === 'Approved').length}</h3>
            </div>
            <div className="metric-icon bg-success-light text-success">
              <CheckCircle size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseRequests.map(pr => (
                <TableRow key={pr.id}>
                  <TableCell className="font-medium">{pr.id}</TableCell>
                  <TableCell>{pr.product}</TableCell>
                  <TableCell>{pr.quantity}</TableCell>
                  <TableCell>₹{pr.total.toLocaleString()}</TableCell>
                  <TableCell>{pr.requester}</TableCell>
                  <TableCell>{getStatusBadge(pr.status)}</TableCell>
                  <TableCell>
                    {pr.status === 'Pending Approval' ? (
                      <div className="flex gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="text-success border-success hover-success"
                          icon={<CheckCircle size={14} />}
                          onClick={() => approveRequest(pr.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-danger hover-danger"
                          icon={<XCircle size={14} />}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm">View Details</Button>
                    )}
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

export default PurchasingPage;

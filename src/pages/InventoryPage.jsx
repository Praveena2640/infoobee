import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { Search, Filter, Plus, AlertCircle, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './InventoryPage.css';

const InventoryPage = () => {
  const navigate = useNavigate();
  const { inventory, recordSale } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  let filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOrder === 'stockAsc') {
    filteredInventory.sort((a, b) => a.stock - b.stock);
  }

  const toggleSort = () => {
    setSortOrder(prev => prev === 'default' ? 'stockAsc' : 'default');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Healthy': return <Badge variant="success">Healthy</Badge>;
      case 'Low Stock': return <Badge variant="warning">Low Stock</Badge>;
      case 'Critical': return <Badge variant="danger">Critical</Badge>;
      case 'Reorder Recommended': return <Badge variant="primary">Reorder Recommended</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const simulateSale = (itemName) => {
    const amount = Math.floor(Math.random() * 50000) + 10000;
    recordSale(itemName, 1, amount); // random sale amount
    alert(`Successfully recorded 1 sale for ${itemName} (₹${amount.toLocaleString()})!`);
  };

  const showDetails = (item) => {
    alert(`Product Details:\n\nName: ${item.name}\nSKU: ${item.sku}\nCategory: ${item.category}\nCurrent Stock: ${item.stock}\nReorder Level: ${item.reorderLevel}\nStatus: ${item.status}\nSupplier: ${item.supplier || 'N/A'}`);
  };

  return (
    <div className="inventory-page">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Inventory Management</h1>
          <p className="page-subtitle">Manage your stock, track suppliers, and monitor low levels.</p>
        </div>
        <div className="header-actions">
          <Button variant="secondary" icon={<Filter size={16} />} onClick={toggleSort}>
            {sortOrder === 'default' ? 'Filters' : 'Filter: Low Stock'}
          </Button>
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => navigate('/manager/restock')}>
            Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="inventory-card-header">
          <div className="search-bar inventory-search">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by SKU or Product Name..." 
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
                <TableHead>Product / SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-primary">{item.name}</p>
                      <p className="text-sm text-secondary">{item.sku}</p>
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${item.stock <= item.reorderLevel ? 'text-danger' : ''}`}>
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell>{item.reorderLevel}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" onClick={() => showDetails(item)}>Details</Button>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        icon={<ShoppingCart size={14} />}
                        onClick={() => simulateSale(item.name)}
                        title="Simulate 1 Sale"
                      >
                        Sell
                      </Button>
                    </div>
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

export default InventoryPage;

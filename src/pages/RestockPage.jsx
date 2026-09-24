import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PackagePlus, Save, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './RestockPage.css';

const RestockPage = () => {
  const { addInventoryItem } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    stock: '',
    reorderLevel: '',
    supplier: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' || name === 'reorderLevel' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate simple required fields
    if (!formData.name || !formData.sku || !formData.stock) return;
    
    addInventoryItem(formData);
    navigate('/dashboard/inventory');
  };

  return (
    <div className="restock-page">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Add Restocked Products</h1>
          <p className="page-subtitle">Log newly received inventory into the BizSync ERP system.</p>
        </div>
      </div>

      <div className="restock-content">
        <Card className="restock-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackagePlus size={20} className="text-accent" />
              New Product Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="restock-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <Input 
                    id="name"
                    name="name" 
                    placeholder="e.g. Wireless Mouse" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="sku">SKU *</label>
                  <Input 
                    id="sku"
                    name="sku" 
                    placeholder="e.g. BZS-006" 
                    value={formData.sku}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select 
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="restock-select"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="supplier">Supplier Name</label>
                  <Input 
                    id="supplier"
                    name="supplier" 
                    placeholder="e.g. TechCorp" 
                    value={formData.supplier}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Initial Stock Quantity *</label>
                  <Input 
                    id="stock"
                    name="stock" 
                    type="number"
                    min="0"
                    placeholder="e.g. 50" 
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reorderLevel">Reorder Level Alert *</label>
                  <Input 
                    id="reorderLevel"
                    name="reorderLevel" 
                    type="number"
                    min="0"
                    placeholder="e.g. 15" 
                    value={formData.reorderLevel}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions mt-8 flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  icon={<X size={16} />}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  icon={<Save size={16} />}
                >
                  Save Product
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestockPage;

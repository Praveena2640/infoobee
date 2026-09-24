import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, Printer, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import './ReportsPage.css';

const salesByCategory = [
  { name: 'Electronics', sales: 4000, profit: 2400 },
  { name: 'Furniture', sales: 3000, profit: 1398 },
  { name: 'Accessories', sales: 2000, profit: 9800 },
  { name: 'Software', sales: 2780, profit: 3908 },
];

const inventoryDistribution = [
  { name: 'Electronics', value: 45 },
  { name: 'Furniture', value: 30 },
  { name: 'Accessories', value: 15 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'];

const ReportsPage = () => {
  const pageRef = useRef(null);

  const handleExportPDF = () => {
    // Fallback to native print to save as PDF
    window.print();
  };

  return (
    <div className="reports-page" ref={pageRef}>
      <div className="page-header flex justify-between items-center">
        <div>
          <h1 className="page-title">Analytics & Reports</h1>
          <p className="page-subtitle">Detailed business performance and exportable reports.</p>
        </div>
        <div className="header-actions">
          <Button variant="secondary" icon={<Filter size={16} />}>This Quarter</Button>
          <Button variant="secondary" icon={<Printer size={16} />} onClick={() => window.print()}>Print</Button>
          <Button variant="primary" icon={<Download size={16} />} onClick={handleExportPDF}>Export PDF</Button>
        </div>
      </div>

      <div className="reports-grid">
        <Card className="report-card full-width">
          <CardHeader>
            <CardTitle>Sales & Profit by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={salesByCategory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Legend />
                  <Bar dataKey="sales" name="Total Sales" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" name="Net Profit" fill="var(--success-color)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="report-card">
          <CardHeader>
            <CardTitle>Inventory Value Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={inventoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {inventoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-sm)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="report-card">
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="report-list">
              <div className="report-list-item">
                <div className="report-info">
                  <h4>Q3 Financial Summary</h4>
                  <p>Generated on Sep 22, 2026</p>
                </div>
                <Button variant="ghost" size="sm" icon={<Download size={16} />}>CSV</Button>
              </div>
              <div className="report-list-item">
                <div className="report-info">
                  <h4>Monthly Inventory Valuation</h4>
                  <p>Generated on Sep 01, 2026</p>
                </div>
                <Button variant="ghost" size="sm" icon={<Download size={16} />}>PDF</Button>
              </div>
              <div className="report-list-item">
                <div className="report-info">
                  <h4>Supplier Performance Matrix</h4>
                  <p>Generated on Aug 15, 2026</p>
                </div>
                <Button variant="ghost" size="sm" icon={<Download size={16} />}>Excel</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;

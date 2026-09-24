import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CheckCircle2, AlertTriangle, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../pages/DashboardOverview.css'; // Reuse dashboard styles

const EmployeeDashboard = () => {
  const { inventory, tasks, updateTaskStatus } = useAppContext();

  // Mock customers just for display since we don't have a real customer API yet
  const [customers] = useState([
    { id: 'CUST-01', name: 'Acme Corp', status: 'Active' },
    { id: 'CUST-02', name: 'Global Tech', status: 'Active' },
    { id: 'CUST-03', name: 'Stark Industries', status: 'Inactive' }
  ]);

  const lowStockItems = inventory.filter(i => i.stock <= i.reorderLevel);
  // Assume we filter tasks for 'Employee User', but for now show all
  const employeeTasks = tasks;

  return (
    <div className="dashboard-overview">
      <div className="page-header">
        <h1 className="page-title">Employee Workspace</h1>
        <p className="page-subtitle">Your assigned tasks, critical stock alerts, and customer data.</p>
      </div>

      <div className="dashboard-main-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-accent" /> Assigned Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              {employeeTasks.length === 0 ? (
                <p className="text-secondary p-4">No tasks assigned to you right now.</p>
              ) : (
                <div className="activity-list mt-4">
                  {employeeTasks.map(task => (
                    <div key={task.id} className="p-4 border border-[var(--border-color)] rounded-lg mb-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)]">{task.title}</h4>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">{task.description}</p>
                        <div className="flex gap-2 mt-2">
                           <Badge variant={task.status === 'Completed' ? 'success' : 'warning'}>{task.status}</Badge>
                           <span className="text-xs text-[var(--text-secondary)]">Due: {task.dueDate}</span>
                        </div>
                      </div>
                      {task.status !== 'Completed' && (
                        <Button variant="primary" size="sm" onClick={() => updateTaskStatus(task.id, 'Completed')}>
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <Users size={20} className="text-accent" /> Customer Data
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="activity-list mt-4">
                 {customers.map(c => (
                   <div key={c.id} className="flex justify-between items-center p-3 border-b border-[var(--border-color)] last:border-0">
                     <div>
                       <p className="font-medium">{c.name}</p>
                       <p className="text-xs text-[var(--text-secondary)]">{c.id}</p>
                     </div>
                     <Badge variant={c.status === 'Active' ? 'success' : 'default'}>{c.status}</Badge>
                   </div>
                 ))}
               </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-danger">
                <AlertTriangle size={20} /> Stocks Under Reorder Level
              </CardTitle>
            </CardHeader>
            <CardContent>
               {lowStockItems.length === 0 ? (
                 <p className="text-success p-4 font-medium">All stocks are healthy! Great job.</p>
               ) : (
                 <div className="activity-list mt-4">
                   {lowStockItems.map(item => (
                     <div key={item.id || item.sku} className="p-3 border border-danger-light bg-danger-light rounded-lg mb-3 flex justify-between items-center">
                       <div>
                         <p className="font-semibold text-danger">{item.name}</p>
                         <p className="text-xs text-danger opacity-80">SKU: {item.sku}</p>
                       </div>
                       <div className="text-right">
                         <p className="font-bold text-danger">{item.stock} left</p>
                         <p className="text-xs text-danger opacity-80">Min: {item.reorderLevel}</p>
                       </div>
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

export default EmployeeDashboard;

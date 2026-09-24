import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { CheckSquare, Plus, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TasksPage = () => {
  const { tasks, addTask } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('Employee User');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, assignee, dueDate });
    setShowForm(false);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Task Management</h1>
          <p className="text-[var(--text-secondary)]">Assign works and track employee progress.</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Assign New Task'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Assign Work</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium mb-1">Task Title</label>
                <Input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Conduct inventory audit" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  required
                  className="w-full p-2 border border-[var(--border-color)] rounded-md bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                  rows={3} 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  placeholder="Details of the task..."
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Assignee</label>
                  <select 
                    className="w-full p-2 border border-[var(--border-color)] rounded-md bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                    value={assignee} 
                    onChange={e => setAssignee(e.target.value)}
                  >
                    <option value="Employee User">Employee User</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <Input type="date" required value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-32 mt-2">Assign Task</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckSquare size={20}/> All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell>
                    <p className="font-medium text-[var(--text-primary)]">{task.title}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{task.description}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent-light text-accent flex items-center justify-center">
                        <User size={12} />
                      </div>
                      {task.assignee}
                    </div>
                  </TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={task.status === 'Completed' ? 'success' : 'warning'}>{task.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-secondary py-8">
                    No tasks assigned yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;

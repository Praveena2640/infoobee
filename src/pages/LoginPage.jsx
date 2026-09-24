import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Activity, Mail, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAppContext();
  const [role, setRole] = useState('manager');

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(role);
    
    // Redirect based on role
    if (role === 'employee') {
      navigate('/employee');
    } else if (role === 'vendor') {
      navigate('/vendor');
    } else {
      navigate('/manager');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="logo-icon-large"><Activity size={40} color="var(--accent-color)" /></div>
          <h2>BizSync</h2>
          <p>The intelligent ERP platform for modern businesses.</p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h3>Welcome back</h3>
            <p>Enter your details to access your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <Input 
                type="email" 
                placeholder="name@company.com" 
                icon={<Mail size={18} />}
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                icon={<Lock size={18} />}
                required 
              />
            </div>

            <div className="form-group">
              <label>Select Role</label>
              <select className="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>
            
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <Button type="submit" variant="primary" className="w-full">Sign In</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, BarChart3, Brain, Workflow, Bell, Activity, CheckCircle2, LayoutDashboard, ShoppingCart, Package, Users, Settings, Search } from 'lucide-react';
import './LandingPage.css';

import analyticsImage from '../assets/images/analytics_dashboard.jpg';
import supplyChainImage from '../assets/images/automated_supply_chain.jpg';
import aiAssistantImage from '../assets/images/ai_business_assistant.jpg';
import toolsIntegrationImage from '../assets/images/tools_integration.jpg';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="logo-container">
          <div className="logo-icon"><Activity size={24} color="var(--accent-color)" /></div>
          <span className="logo-text">BizSync</span>
        </div>
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#intelligence">AI Intelligence</a>
          <a href="#workflow">Automated Workflow</a>
        </nav>
        <div className="landing-actions">
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/login">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Run Your Business. <span>Smarter.</span></h1>
          <p className="hero-subtitle">
            BizSync connects inventory, sales, purchasing, suppliers, and business workflows in one intelligent ERP platform.
          </p>
          <div className="hero-cta">
            <Link to="/login"><Button variant="primary" size="lg">Get Started</Button></Link>
            <Link to="/login"><Button variant="secondary" size="lg" icon={<ArrowRight size={18} />}>Explore Dashboard</Button></Link>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="dashboard-preview-wrapper animate-slide-up">
          <div className="dashboard-preview">
            <div className="mock-sidebar">
              <div className="mock-sidebar-logo"><Activity size={20} color="var(--accent-color)" /> BizSync</div>
              <div className="mock-nav-item active"><LayoutDashboard size={16} /> Dashboard</div>
              <div className="mock-nav-item"><Package size={16} /> Inventory</div>
              <div className="mock-nav-item"><ShoppingCart size={16} /> Sales</div>
              <div className="mock-nav-item"><Users size={16} /> Customers</div>
              <div className="mock-nav-item mt-auto"><Settings size={16} /> Settings</div>
            </div>
            <div className="mock-main">
              <div className="mock-header">
                 <div className="mock-search"><Search size={14} /> <span>Search anything...</span></div>
                 <div className="mock-avatar"></div>
              </div>
              <div className="mock-content">
                <div className="mock-cards">
                  <div className="mock-card">
                    <div className="mc-title">Total Revenue</div>
                    <div className="mc-value">$124,563.00</div>
                    <div className="mc-trend positive">+14.5%</div>
                  </div>
                  <div className="mock-card">
                    <div className="mc-title">Active Orders</div>
                    <div className="mc-value">1,432</div>
                    <div className="mc-trend positive">+5.2%</div>
                  </div>
                  <div className="mock-card">
                    <div className="mc-title">Low Stock Items</div>
                    <div className="mc-value">12</div>
                    <div className="mc-trend negative">-2.1%</div>
                  </div>
                </div>
                <div className="mock-chart">
                  <div className="mock-chart-header">
                     <span>Revenue vs Expenses</span>
                     <div className="mock-chart-legend">
                        <span className="dot dot-rev"></span> Rev
                        <span className="dot dot-exp"></span> Exp
                     </div>
                  </div>
                  <div className="mock-chart-body">
                     <div className="mock-bar-group"><div className="m-bar b1" style={{height: '60%'}}></div><div className="m-bar b2" style={{height: '40%'}}></div></div>
                     <div className="mock-bar-group"><div className="m-bar b1" style={{height: '80%'}}></div><div className="m-bar b2" style={{height: '50%'}}></div></div>
                     <div className="mock-bar-group"><div className="m-bar b1" style={{height: '40%'}}></div><div className="m-bar b2" style={{height: '30%'}}></div></div>
                     <div className="mock-bar-group"><div className="m-bar b1" style={{height: '90%'}}></div><div className="m-bar b2" style={{height: '60%'}}></div></div>
                     <div className="mock-bar-group"><div className="m-bar b1" style={{height: '70%'}}></div><div className="m-bar b2" style={{height: '45%'}}></div></div>
                     <div className="mock-bar-group"><div className="m-bar b1" style={{height: '85%'}}></div><div className="m-bar b2" style={{height: '55%'}}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating UI Cards */}
          <div className="floating-card fc-1">
            <Bell size={16} color="var(--danger-color)" />
            <span>Low Stock Detected</span>
          </div>
          <div className="floating-card fc-2">
            <Brain size={16} color="var(--accent-color)" />
            <span>AI Reorder Recommendation</span>
          </div>
          <div className="floating-card fc-3">
            <Workflow size={16} color="var(--success-color)" />
            <span>Purchase Request Created</span>
          </div>
        </div>
      </section>

      <section className="single-image-section">
        <img src={toolsIntegrationImage} alt="BizSync Tools and Integrations" className="single-featured-image" />
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Smart ERP Intelligence</h2>
        <p className="section-subtitle">BizSync centralizes your entire business operations with intelligent automated systems.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Brain /></div>
            <h3>AI + ML Intelligence</h3>
            <p>Predictive inventory management, demand forecasting using linear regression, and a built-in AI business assistant.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Workflow /></div>
            <h3>Automated Workflows</h3>
            <p>Actions trigger automatic reactions. Low stock automatically drafts purchase requests and notifies managers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><BarChart3 /></div>
            <h3>Real-Time Analytics</h3>
            <p>Monitor your sales, inventory health, and purchase trends with beautiful interactive charts.</p>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="detailed-features-section">
        <div className="detailed-feature-block">
          <div className="df-content">
            <h3 className="df-title">Predictive AI Analytics</h3>
            <p className="df-description">
              Stop guessing. BizSync's embedded AI analyzes years of historical data to predict future trends, helping you make informed decisions before the market shifts.
            </p>
            <ul className="df-list">
              <li><CheckCircle2 size={18} className="df-icon" /> Demand forecasting with 95% accuracy</li>
              <li><CheckCircle2 size={18} className="df-icon" /> Customer churn prediction models</li>
              <li><CheckCircle2 size={18} className="df-icon" /> Automated insightful reports</li>
            </ul>
          </div>
          <div className="df-image-wrapper">
            <img src={analyticsImage} alt="Advanced Analytics Dashboard" className="df-image" />
          </div>
        </div>

        <div className="detailed-feature-block reverse">
          <div className="df-content">
            <h3 className="df-title">Smart Supply Chain</h3>
            <p className="df-description">
              Connect every node of your supply chain. Ensure seamless communication from procurement to final delivery with automated stock sync and order routing.
            </p>
            <ul className="df-list">
              <li><CheckCircle2 size={18} className="df-icon" /> Multi-warehouse inventory sync</li>
              <li><CheckCircle2 size={18} className="df-icon" /> Automated purchase order generation</li>
              <li><CheckCircle2 size={18} className="df-icon" /> Supplier performance tracking</li>
            </ul>
          </div>
          <div className="df-image-wrapper">
            <img src={supplyChainImage} alt="Automated Supply Chain Network" className="df-image" />
          </div>
        </div>

        <div className="detailed-feature-block">
          <div className="df-content">
            <h3 className="df-title">Your AI Business Assistant</h3>
            <p className="df-description">
              BizSync doesn't just store data; it works with you. Meet your new AI assistant that monitors workflows and suggests critical optimizations in real-time.
            </p>
            <ul className="df-list">
              <li><CheckCircle2 size={18} className="df-icon" /> Real-time workflow optimization</li>
              <li><CheckCircle2 size={18} className="df-icon" /> Automated alerts for anomalies</li>
              <li><CheckCircle2 size={18} className="df-icon" /> Natural language query processing</li>
            </ul>
          </div>
          <div className="df-image-wrapper">
            <img src={aiAssistantImage} alt="AI Business Assistant" className="df-image" />
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="final-cta">
        <h2>Turn your business data into smarter decisions.</h2>
        <Link to="/dashboard/restock">
          <Button variant="primary" size="lg">Launch BizSync</Button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;

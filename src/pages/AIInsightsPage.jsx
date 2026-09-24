import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './AIInsightsPage.css';

const AIInsightsPage = () => {
  const [forecastData, setForecastData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch('/api/forecast')
      .then(res => res.json())
      .then(data => setForecastData(data))
      .catch(err => console.error("Error fetching forecast:", err));

    fetch('/api/recommendations')
      .then(res => res.json())
      .then(data => setRecommendations(data))
      .catch(err => console.error("Error fetching recommendations:", err));
  }, []);

  return (
    <div className="ai-insights-page">
      <div className="page-header">
        <h1 className="page-title">AI Business Intelligence</h1>
        <p className="page-subtitle">Predictive models and smart recommendations for your business.</p>
      </div>

      <div className="insights-grid">
        <Card className="forecast-card">
          <CardHeader className="flex justify-between items-center" style={{flexDirection: 'row'}}>
            <CardTitle>Demand Forecast (Linear Regression)</CardTitle>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Last 30 Days</Button>
              <Button variant="secondary" size="sm">Export Data</Button>
            </div>
          </CardHeader>
          <CardContent>
            {forecastData.length === 0 ? (
               <div className="flex items-center justify-center p-8 text-secondary">
                 <p>Not enough historical sales data to generate a forecast. Please add some sales records.</p>
               </div>
            ) : (
              <div style={{ width: '100%', height: 350, marginTop: '20px' }}>
                <ResponsiveContainer>
                  <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)"/>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="actual" name="Historical Sales" stroke="var(--text-secondary)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} connectNulls />
                    <Line type="monotone" dataKey="forecast" name="Predicted Demand" stroke="var(--accent-color)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="recommendations-sidebar">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <Brain size={20} color="var(--accent-color)" /> Smart Recommendations
          </h3>
          
          <div className="recommendation-cards">
            {recommendations.length === 0 ? (
               <p className="text-secondary p-4 text-sm">No new recommendations based on current data.</p>
            ) : (
               recommendations.map((rec, idx) => (
                 <Card key={idx} className={`rec-card ${rec.type === 'risk' ? 'border-l-warning' : 'border-l-success'}`}>
                   <CardContent className="rec-card-content">
                     <div className={`rec-icon ${rec.type === 'risk' ? 'bg-warning-light text-warning' : 'bg-success-light text-success'}`}>
                       {rec.type === 'risk' ? <AlertTriangle size={18} /> : <TrendingUp size={18} />}
                     </div>
                     <div className="rec-details">
                       <h4>{rec.title}</h4>
                       <p>{rec.message}</p>
                       <div className="rec-actions">
                         {rec.type === 'risk' ? (
                           <Button variant="primary" size="sm">Create Purchase Request</Button>
                         ) : (
                           <Button variant="secondary" size="sm">Update Supplier Terms</Button>
                         )}
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPage;

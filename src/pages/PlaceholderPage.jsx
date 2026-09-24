import React from 'react';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="placeholder-page" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{title}</h1>
      <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
      <div style={{ marginTop: '30px', padding: '40px', backgroundColor: 'var(--bg-surface)', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
        <p style={{ color: 'var(--text-tertiary)' }}>This module is currently under development for the demo.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;

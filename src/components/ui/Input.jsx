import React from 'react';
import './Input.css';

export const Input = React.forwardRef(({ className = '', icon, error, ...props }, ref) => {
  return (
    <div className="input-wrapper">
      {icon && <span className="input-icon">{icon}</span>}
      <input 
        className={`input ${icon ? 'input-with-icon' : ''} ${error ? 'input-error' : ''} ${className}`} 
        ref={ref}
        {...props} 
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

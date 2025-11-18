// components/SharedButton.jsx
import React from 'react';

const Button = ({
  onClick,
  className = '',
  loading = false,
  disabled = false,
  children = 'Button'
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full min-w-max bg-panel text-ink py-3 rounded-lg font-medium transition-colors cursor-pointer
        hover:bg-panel/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${className}`}
    >
      {loading && (
        <span className='inline-block animate-spin border-2 border-t-transparent border-ink rounded-full w-4 h-4 mr-2 -mb-0.5'></span>
      )}
      {children || 'Enter Name'}
    </button>
  );
};

export default Button;

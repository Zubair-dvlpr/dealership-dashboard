// components/SharedButton.jsx
import React from 'react';

const VARIANTS = {
  primary: 'bg-panel text-ink hover:bg-panel/80',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-800'
};

const Button = ({
  onClick,
  className = '',
  loading = false,
  disabled = false,
  variant = 'primary', // Default variant
  children = 'Button'
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full min-w-max py-3 rounded-lg font-medium transition-colors cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${VARIANTS[variant]}
        ${className}
      `}
    >
      {loading && (
        <span className='inline-block animate-spin border-2 border-t-transparent border-current rounded-full w-4 h-4 mr-2 -mb-0.5'></span>
      )}
      {children || 'Enter Name'}
    </button>
  );
};

export default Button;

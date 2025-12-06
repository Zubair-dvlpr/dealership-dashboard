import { X } from 'lucide-react';
import React, { useEffect } from 'react';

export default function Modal({
  isOpen,
  onClose,
  position = 'center',
  children,
  title,
  className
}) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getModalClasses = () => {
    const baseClasses =
      'fixed w-full sm:w-lg p-2 bg-panel  transition-all duration-1000 ease-out' + className;
    switch (position) {
      case 'left':
        return `${baseClasses} top-1/2 right-0 z-50 translate-x-1 -translate-y-1/2 h-full`;
      case 'right':
        return `${baseClasses} top-1/2 -left-1 z-50 translate-x-1 -translate-y-1/2 h-full`;
      case 'center':
      default:
        return `${baseClasses} h-auto sm:h-fit bottom-[5px] sm:bottom-auto translate-y-1 sm:top-1/2 left-1/2 z-50 -translate-x-1/2 sm:-translate-y-1/2`;
    }
  };

  const Header = (
    <div className='flex justify-between items-center p-2'>
      <span>{title}</span>
      <span className='cursor-pointer' onClick={onClose}>
        <X />
      </span>
    </div>
  );
  return (
    <React.Fragment>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden='true'
      />
      <div className={getModalClasses()}>
        {/* Modal Content */}
        <div role='dialog' aria-modal='true' aria-labelledby={title ? 'modal-title' : undefined}>
          {/* Header */}
          {Header}
          {/* Content */}
          <div className='p-2 overflow-y-auto'>{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

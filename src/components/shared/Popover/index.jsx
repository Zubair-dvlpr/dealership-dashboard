import React, { useState, useRef, useEffect } from 'react';

const Popover = ({
  children,
  content,
  position = 'bottom',
  align = 'center',
  className = '',
  contentClassName = '',
  width = 'auto'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState(position);
  const [calculatedAlign, setCalculatedAlign] = useState(align);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  // Calculate optimal position based on viewport
  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let newPosition = position;
    let newAlign = align;

    // Check vertical space
    const spaceBelow = viewport.height - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    if (position === 'bottom' && spaceBelow < popoverRect.height + 10) {
      if (spaceAbove > spaceBelow) {
        newPosition = 'top';
      }
    } else if (position === 'top' && spaceAbove < popoverRect.height + 10) {
      if (spaceBelow > spaceAbove) {
        newPosition = 'bottom';
      }
    }

    // Check horizontal space for left/right positions
    if (position === 'left' || position === 'right') {
      const spaceRight = viewport.width - triggerRect.right;
      const spaceLeft = triggerRect.left;

      if (position === 'right' && spaceRight < popoverRect.width + 10) {
        newPosition = 'left';
      } else if (position === 'left' && spaceLeft < popoverRect.width + 10) {
        newPosition = 'right';
      }
    }

    // Check horizontal alignment for top/bottom positions
    if (newPosition === 'top' || newPosition === 'bottom') {
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      const popoverHalfWidth = popoverRect.width / 2;

      if (align === 'center') {
        if (triggerCenter - popoverHalfWidth < 10) {
          newAlign = 'left';
        } else if (triggerCenter + popoverHalfWidth > viewport.width - 10) {
          newAlign = 'right';
        }
      }
    }

    setCalculatedPosition(newPosition);
    setCalculatedAlign(newAlign);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [isOpen]);

  // Calculate position when popover opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is updated
      setTimeout(calculatePosition, 0);
    }
  }, [isOpen, position, align]);

  const getPopoverClasses = () => {
    const baseClasses =
      'absolute z-50 bg-panel text-ink border border-ink rounded-lg shadow-lg transition-all duration-200 ease-out';
    const widthClass = width === 'auto' ? 'w-auto min-w-48 max-w-80' : width;

    let positionClasses = '';
    let transformClasses = '';

    if (calculatedPosition === 'top') {
      positionClasses = 'bottom-full mb-2';
      if (calculatedAlign === 'left') {
        positionClasses += ' left-0';
      } else if (calculatedAlign === 'right') {
        positionClasses += ' right-0';
      } else {
        positionClasses += ' left-1/2 -translate-x-1/2';
      }
    } else if (calculatedPosition === 'bottom') {
      positionClasses = 'top-full mt-4';
      if (calculatedAlign === 'left') {
        positionClasses += ' left-0';
      } else if (calculatedAlign === 'right') {
        positionClasses += ' -right-4';
      } else {
        positionClasses += ' left-1/2 -translate-x-1/2';
      }
    } else if (calculatedPosition === 'left') {
      positionClasses = 'right-full mr-2 top-1/2 -translate-y-1/2';
    } else if (calculatedPosition === 'right') {
      positionClasses = 'left-full ml-2 top-1/2 -translate-y-1/2';
    }

    // Animation classes
    if (isOpen) {
      transformClasses = 'opacity-100 scale-100';
    } else {
      transformClasses = 'opacity-0 scale-95 pointer-events-none';
    }

    return `${baseClasses} ${widthClass} ${positionClasses} ${transformClasses} ${contentClassName}`;
  };

  const getCaretClasses = () => {
    let caretClasses = 'absolute w-0 h-0 border-ink';

    if (calculatedPosition === 'top') {
      caretClasses += ' top-full border-t-8 border-t-white border-x-8 border-x-transparent';
      if (calculatedAlign === 'left') {
        caretClasses += ' left-4';
      } else if (calculatedAlign === 'right') {
        caretClasses += ' right-4';
      } else {
        caretClasses += ' left-1/2 -translate-x-1/2';
      }
    } else if (calculatedPosition === 'bottom') {
      caretClasses += ' bottom-full border-b-8 border-b-white border-x-8 border-x-transparent';
      if (calculatedAlign === 'left') {
        caretClasses += ' left-4';
      } else if (calculatedAlign === 'right') {
        caretClasses += ' right-4';
      } else {
        caretClasses += ' left-1/2 -translate-x-1/2';
      }
    } else if (calculatedPosition === 'left') {
      caretClasses +=
        ' left-full top-1/2 -translate-y-1/2 border-l-8 border-l-white border-y-8 border-y-transparent';
    } else if (calculatedPosition === 'right') {
      caretClasses +=
        ' right-full top-1/2 -translate-y-1/2 border-r-8 border-r-white border-y-8 border-y-transparent';
    }

    return caretClasses;
  };

  const getCaretBorderClasses = () => {
    let caretBorderClasses = 'absolute w-0 h-0 border-solid';

    if (calculatedPosition === 'top') {
      caretBorderClasses +=
        ' top-full border-t-8 border-t-gray-200 border-x-8 border-x-transparent translate-y-px';
      if (calculatedAlign === 'left') {
        caretBorderClasses += ' left-4';
      } else if (calculatedAlign === 'right') {
        caretBorderClasses += ' right-4';
      } else {
        caretBorderClasses += ' left-1/2 -translate-x-1/2';
      }
    } else if (calculatedPosition === 'bottom') {
      caretBorderClasses +=
        ' bottom-full border-b-8 border-b-gray-200 border-x-8 border-x-transparent -translate-y-px';
      if (calculatedAlign === 'left') {
        caretBorderClasses += ' left-4';
      } else if (calculatedAlign === 'right') {
        caretBorderClasses += ' right-4';
      } else {
        caretBorderClasses += ' left-1/2 -translate-x-1/2';
      }
    } else if (calculatedPosition === 'left') {
      caretBorderClasses +=
        ' left-full top-1/2 -translate-y-1/2 border-l-8 border-l-gray-200 border-y-8 border-y-transparent translate-x-px';
    } else if (calculatedPosition === 'right') {
      caretBorderClasses +=
        ' right-full top-1/2 -translate-y-1/2 border-r-8 border-r-gray-200 border-y-8 border-y-transparent -translate-x-px';
    }

    return caretBorderClasses;
  };

  return (
    <div className={`absolute inline-block ${className}`}>
      {/* Trigger */}
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className='cursor-pointer '>
        {children}
      </div>

      {/* Popover */}
      <div ref={popoverRef} className={getPopoverClasses()}>
        {/* Caret border (shadow) */}
        <div className={getCaretBorderClasses()}></div>
        {/* Caret */}
        <div className={getCaretClasses()}></div>

        {/* Content */}
        <div className='relative z-50'>{content}</div>
      </div>
    </div>
  );
};

export default Popover;

import React, { useRef } from 'react';
import useOutsideClick from '../../../utils/hooks/useOutSideClick';

export const FilterDropdown = ({ name, value, children, open, setOpen }) => {
  const ref = useRef();
  useOutsideClick(ref, () => {
    setOpen(false);
  });
  return (
    <div
      className='relative flex items-center justify-center gap-2 px-2 py-1.5 min-w-48 bg-panel/50  border border-[#2E3651]/50 rounded-[8px]'
      ref={ref}
    >
      <p className='text-md'>{name}</p>
      <button
        className='bg-[#0E1020]  border-[#212332] rounded-[8px] py-1 flex gap-4 px-3 min-w-24  justify-center cursor-pointer relative select-none'
        onClick={() => setOpen(!open)}
      >
        {value ?? 'Select'}
      </button>
      {/* // CHILDREN HERE */}
      <div
        className={`bg-panel cursor-pointer  z-40 flex gap-3 top-full mt-2 min-w-max flex-col p-2 rounded ${
          open ? 'absolute opacity-100 transition-all duration-500' : 'hidden opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

import React from 'react';

const Spinner = ({ size = 'h-8 w-8', color = 'border-white' }) => {
  return (
    <div className='flex justify-center items-center w-full h-[80vh]'>
      <div className={`  animate-spin rounded-full border-2 border-t-panel ${size} ${color}`} />
    </div>
  );
};

export default Spinner;

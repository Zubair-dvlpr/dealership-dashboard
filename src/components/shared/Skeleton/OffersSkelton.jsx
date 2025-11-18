export const HeatMapSkeleton = () => {
  return (
    <div className='w-full'>
      {/* Skeleton Map */}
      <div className='w-full h-[500px] bg-[#1A2135] rounded-2xl animate-pulse' />

      {/* Stats skeleton */}
      <div className='grid grid-cols-3 gap-6 mt-6'>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className='bg-[#1A2135] rounded-2xl p-6 flex flex-col items-center animate-pulse'
          >
            <div className='w-24 h-4 bg-[#2A3149] rounded mb-4' /> {/* Label */}
            <div className='w-12 h-6 bg-[#2A3149] rounded' /> {/* Number */}
          </div>
        ))}
      </div>
    </div>
  );
};

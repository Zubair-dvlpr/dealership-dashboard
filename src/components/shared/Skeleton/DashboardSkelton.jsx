// ANALYTICS CARD SKELETON
const AnalyticsCardSkeleton = () => {
  return (
    <div className='bg-panel/50 border border-border rounded-xl p-4 shadow-sm animate-pulse'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          {/* Title */}
          <div className='h-4 w-24 bg-ink/30 rounded mb-2'></div>
          {/* Value */}
          <div className='h-8 w-32 bg-ink/30 rounded mb-3'></div>
          {/* Change */}
          <div className='flex items-center space-x-2'>
            <div className='h-4 w-12 bg-ink/30 rounded'></div>
            <div className='h-4 w-20 bg-ink/30 rounded'></div>
          </div>
        </div>
        {/* Icon */}
        <div className='p-3 rounded-xl bg-ink/30'>
          <div className='h-6 w-6 bg-gray-400 rounded'></div>
        </div>
      </div>
    </div>
  );
};

export const AnalyticsSkelton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
      {[...Array(12)].map((_, i) => (
        <AnalyticsCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const MapLocationSkeleton = () => {
  return (
    <div>
      {/* Title skeleton */}
      <div className='py-6'>
        <div className='h-6 w-48 bg-ink/40 rounded animate-pulse mb-2'></div>
      </div>

      {/* Map area skeleton */}
      <div className='w-full h-96 bg-ink/40 rounded-xl animate-pulse border border-border'></div>
    </div>
  );
};

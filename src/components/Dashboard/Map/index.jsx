import React, { useEffect } from 'react';
import Map from '../../shared/Map';
import { useOffersStore } from '../../../store/features/offers/useOffersStore';
import { Spinner } from '../../shared';
import { MapLocationSkeleton } from '../../shared/Skeleton/DashboardSkelton';

export const MapLocations = ({ title = true }) => {
  const offersStore = useOffersStore();

  useEffect(() => {
    offersStore?.offersListing();
  }, []);

  if (offersStore?.list?.loading) {
    return <MapLocationSkeleton />;
  }
  return (
    <div>
      {title && (
        <div className='py-6'>
          <h3 className='text-xl font-bold mb-1'>Geographic Distribution</h3>
        </div>
      )}

      <Map locations={offersStore?.list?.data} />
    </div>
  );
};

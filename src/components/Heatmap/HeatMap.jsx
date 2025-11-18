import Map from '../shared/Map';
import { HeatMapHeader } from './HeatMapHeader';
import PostalOffersTable from './PostalOffersTable';
import { useOffersStore } from '../../store/features/offers/useOffersStore';
import { HeatMapSkeleton } from '../shared/Skeleton/OffersSkelton';

const THRESH = 0.83; // tweak: what qualifies as "purchased"

const HeatMap = () => {
  const offersList = useOffersStore(state => state?.heatMap?.data);
  const loading = useOffersStore(state => state?.heatMap?.loading);

  const totalOffers = offersList?.length;
  const totalPurchased = offersList?.filter(o => {
    const median = Number(o?.median ?? 0);
    const final = Number(o?.finalOffer ?? 0);
    return median > 0 && final >= THRESH * median;
  })?.length;

  const conversionPct = totalOffers ? Math.round((totalPurchased / totalOffers) * 100) : 0;

  return (
    <div className='space-y-5'>
      <HeatMapHeader />

      {loading ? (
        <HeatMapSkeleton />
      ) : (
        <>
          {/* Map */}
          <div className='bg-blue w-full py-3 flex gap-4 px-3 border border-[#212332] rounded-[12px]'>
            <Map locations={offersList} />
          </div>

          {/* CARDS (dynamic) */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            <div className='flex flex-col items-center justify-center bg-blue border border-[#212332] rounded-xl py-3 gap-2'>
              <p className='text-[12px]'>Total Offers</p>
              <p className='text-[20px] font-bold'>{totalOffers?.toLocaleString()}</p>
            </div>

            <div className='flex flex-col items-center justify-center bg-blue border border-[#212332] rounded-xl py-3 gap-2'>
              <p className='text-[12px]'>Total Purchased</p>
              <p className='text-[20px] font-bold'>{totalPurchased?.toLocaleString()}</p>
            </div>

            <div className='flex flex-col items-center justify-center bg-blue border border-[#212332] rounded-xl py-3 gap-2'>
              <p className='text-[12px]'>Conversion</p>
              <p className='text-[20px] font-bold'>{conversionPct}%</p>
            </div>
          </div>
          <PostalOffersTable offers={offersList} />
        </>
      )}
    </div>
  );
};

export default HeatMap;

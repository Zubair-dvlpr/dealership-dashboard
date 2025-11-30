import { useMemo } from 'react';

// expects props.offers = array from API
const PostalOffersTable = ({ offers = [] }) => {
  // Format date utility
  const fmt = iso => {
    if (!iso) return '-';
    const d = new Date(iso);
    // show local short date
    return d.toLocaleDateString();
  };

  const citiesList = useMemo(() => {
    if (!offers?.offers || offers?.offers.length === 0) return [];
    
    const map = {};

   offers?.offers.forEach(offer => {
      const city = offer?.geo?.city || 'Unknown';
      if (!map[city]) {
        map[city] = { city, offers: 0, purchased: 0 };
      }

      map[city].offers += 1;
      if (offer.purchased) {
        map[city].purchased += 1;
      }
    });

    return Object.values(map).map(c => ({
      ...c,
      conv: c.offers > 0 ? ((c.purchased / c.offers) * 100).toFixed(1) : 0
    }));
  }, [offers?.offers]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
      {/* Left: Offers (mapped from API) */}
      <div className='bg-blue border border-[#212332] rounded-xl p-4 overflow-x-auto'>
        <h2 className='text-lg font-semibold mb-4'>Offers (Filtered)</h2>
        <table className='w-full border-separate border-spacing-y-2'>
          <thead>
            <tr className='text-left text-gray-400 border-b border-[#1F273D]'>
              <th className='px-3'>#</th>
              <th className='px-3'>Postal</th>
              <th className='px-3'>Vehicle</th>
              <th className='px-3'>Final</th>
              <th className='px-3'>Created</th>
            </tr>
          </thead>
          <tbody>
            {offers.length === 0 && (
              <tr className='bg-[#1A2135]/70'>
                <td className='py-2 px-3 border border-[#24293C]' colSpan={7}>
                  No data
                </td>
              </tr>
            )}
            
            {offers.map((o, idx) => (
              <tr
                key={o._id || idx}
                className='bg-[#1A2135]/70 transition bborder-2 border-[#11162B]'
              >
                <td className='py-2 px-3 border border-[#24293C]'>{idx + 1}</td>
                <td className='py-2 px-3 border border-[#24293C] min-w-24'>{o.postalCode}</td>
                <td className='py-2 px-3 border border-[#24293C] min-w-64 max-w-32'>{o.vehicle}</td>
                <td className='py-2 px-3 border border-[#24293C] min-w-20'>
                  {o.finalOffer ?? '-'}
                </td>
                <td className='py-2 px-3 border border-[#24293C] min-w-20'>{fmt(o.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right: Top Cities (keep your static layout for now) */}
      <div className='bg-blue border border-[#212332] rounded-xl p-4 overflow-x-auto'>
        <h2 className='text-lg font-semibold mb-4'>Top Cities</h2>
        <table className='w-full border-separate border-spacing-y-2'>
          <thead>
            <tr className='text-left text-gray-400 border-b border-[#1F273D]'>
              <th className='px-3'>#</th>
              <th className='px-3'>City</th>
              <th className='px-3'>Offers</th>
              <th className='px-3'>Purchased</th>
              <th className='px-3'>Conv %</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with real city aggregation once backend provides city info */}
            {offers?.length === 0 && (
              <tr className='bg-[#1A2135]/70'>
                <td className='py-2 px-3 border border-[#24293C]' colSpan={7}>
                  No data
                </td>
              </tr>
            )}
            {citiesList?.map((_c, idx) => (
              <tr className='bg-[#1A2135]/70 transition border-2 border-[#11162B]' key={_c?.city}>
                <td className='py-2 px-3 border border-[#24293C]'>{idx + 1}</td>
                <td className='py-2 px-3 border border-[#24293C] min-w-64 max-w-32 truncate'>
                  {_c?.city}
                </td>
                <td className='py-2 px-3 border border-[#24293C] min-w-20'>{_c?.offers}</td>
                <td className='py-2 px-3 border border-[#24293C] min-w-20'>{_c?.purchased}</td>
                <td className='py-2 px-3 border border-[#24293C] min-w-20'>{_c?.conv}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostalOffersTable;

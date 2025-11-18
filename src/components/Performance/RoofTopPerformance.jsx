import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OverallRooftops from './OverallRoofTop';
import PerformanceTable from './PerformanceTable';
import { FilterDropdown } from '../shared/FilterDropdown';
import { dependency, heatmapoffersList } from '../../store/features/offers/offersFns';
import PerformanceHeader from './PerformanceHeader';

const months = [
  { id: 1, name: 'Jan' },
  { id: 2, name: 'Feb' },
  { id: 3, name: 'Mar' },
  { id: 4, name: 'Apr' },
  { id: 5, name: 'May' },
  { id: 6, name: 'Jun' },
  { id: 7, name: 'Jul' },
  { id: 8, name: 'Aug' },
  { id: 9, name: 'Sep' },
  { id: 10, name: 'Oct' },
  { id: 11, name: 'Nov' },
  { id: 12, name: 'Dec' }
];

// Optional quick picks for Min Offer
const minOfferOptions = [0, 25, 50, 75, 100, 150, 200];

const RoofTopPerformance = () => {
  // dropdown open states
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isProvOpen, setIsProvOpen] = useState(false);
  const [isMinOpen, setIsMinOpen] = useState(false);

  // Month/Year state (local only)
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

  // Province (postal) state (local only)
  const [postal, setPostal] = useState('ALL'); // default ALL
  const [postals, setPostals] = useState([]);
  const [loadingPostals, setLoadingPostals] = useState(false);

  // Min-Offer (local only)
  const [minOffer, setMinOffer] = useState(50);

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Build clean params (omit undefined)
  const fetchOffers = useCallback(async (params = {}) => {
    try {
      setLoading(true);

      // If your heatmapoffersList returns a wrapper {success, data}, unwrap it;
      // if it already returns an array, this still works.
      const res = await heatmapoffersList(params);
      const data = Array.isArray(res) ? res : res?.data || [];
      setOffers(data);
    } catch (e) {
      console.error('Failed to fetch offers', e);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load: FULL list (no params)
  useEffect(() => {
    fetchOffers({});
  }, [fetchOffers]);

  // Called by header whenever Month/Province change
  const handleFiltersChange = useCallback(
    ({ province, month }) => {
      const params = {};
      if (province) params.province = province; // omit if ALL
      if (month) params.date = month; // omit if ALL
      // If neither provided => will fetch full list
      fetchOffers(params);
    },
    [fetchOffers]
  );

  // Load postal codes (same method as HeatMapHeader)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingPostals(true);
        const resp = await dependency(); // { data: { postals: [...] } }
        if (!alive) return;
        const list = resp?.data?.postals || [];
        setPostals(list);
      } catch (e) {
        console.error('Failed to load postals', e);
      } finally {
        if (alive) setLoadingPostals(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Display text for Month pill
  const monthDisplay = `${selectedYear} - ${selectedMonth}`;

  return (
    <div className='space-y-5'>
      <PerformanceHeader onFiltersChange={handleFiltersChange} />

      {loading ? (
        'loading'
      ) : (
        <>
          {/* You can pass local state down later if needed */}
          <OverallRooftops
            offers={
              offers
            } /* month={selectedYear+'-'+selectedMonth} province={postal} minOffer={minOffer} */
          />
          <PerformanceTable
            offers={
              offers
            } /* month={selectedYear+'-'+selectedMonth} province={postal} minOffer={minOffer} */
          />
        </>
      )}
      {/* HEADER */}
    </div>
  );
};

export default RoofTopPerformance;

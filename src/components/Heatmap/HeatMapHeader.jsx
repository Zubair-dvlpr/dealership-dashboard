import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FilterDropdown } from '../shared/FilterDropdown';
import { useDependencyStore } from '../../store/features/dependency/useDependencyStore';
import { useOffersStore } from '../../store/features/offers/useOffersStore';

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

export const HeatMapHeader = () => {
  // DEPENDENCY STORE
  const loading = useDependencyStore(state => state?.state?.loading);
  const postals = useDependencyStore(state => state?.state?.data?.postals);
  const fetchDependency = useDependencyStore(state => state?.fetchDependency);

  // OFFERS STORE
  const fetchOffersList = useOffersStore(state => state?.offersListWithFilters);

  const [isMonthFilter, setIsMonthFilter] = useState(false);
  const [isPCFilter, setPCFilter] = useState(false);
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(`${currentYear}-${new Date().getMonth() + 1}`);

  const [postal, setPostal] = useState('ALL');
  // CALL OFFERS LIST

  const onClickToFetchOffers = async () => {
    const date = `${selectedYear}-${selectedMonth}`.toString();
    setSelectedDate(date);
    await fetchOffersList({ province: postal === 'ALL' ? '' : postal || '', date: selectedDate });
  };

  // load postals (no auto-select; keep 'ALL')
  useEffect(() => {
    fetchDependency();
    fetchOffersList();
  }, []);

  return (
    <div className='bg-blue w-full py-3 flex gap-4 px-3 border border-[#212332] rounded-[12px] flex-wrap'>
      {/* MONTH */}
      <FilterDropdown
        name='Month'
        value={selectedDate}
        open={isMonthFilter}
        setOpen={setIsMonthFilter}
      >
        <div className='flex justify-between items-center border-b border-blue'>
          <ChevronLeft
            className='w-5 h-5 cursor-pointer hover:text-blue-600'
            onClick={() => setSelectedYear(y => y - 1)}
          />
          <span className='font-semibold text-lg'>{selectedYear}</span>
          <ChevronRight
            className='w-5 h-5 cursor-pointer hover:text-blue-600'
            onClick={() => setSelectedYear(y => y + 1)}
          />
        </div>

        <div className='grid grid-cols-3 gap-2'>
          {months.map(month => (
            <div
              key={month.id}
              onClick={() => setSelectedMonth(month?.id)}
              className={`px-2 py-1 text-center rounded cursor-pointer
              ${selectedMonth === month.id ? 'bg-blue text-white' : 'hover:bg-blue'}`}
            >
              {month.name}
            </div>
          ))}
        </div>
        {/* CLEAR / ALL */}
        <div
          onClick={onClickToFetchOffers}
          className={`px-2 py-1 text-center rounded cursor-pointer bg-blue-900`}
        >
          Click to apply
        </div>
      </FilterDropdown>

      {/* PROVINCE (postal codes) */}
      <FilterDropdown
        name='Province'
        open={isPCFilter}
        setOpen={setPCFilter}
        value={loading ? 'loading' : postal || 'Select'}
      >
        <div className='grid grid-cols-3 gap-2'>
          {/* ALL */}
          <div
            onClick={() => setPostal('ALL')}
            className={`px-2 py-1 text-center rounded cursor-pointer
            ${postal === 'ALL' ? 'bg-blue text-white' : 'hover:bg-blue'}`}
          >
            ALL
          </div>

          {loading && <div>Loading…</div>}
          {!loading && postals?.length === 0 && <div>No postal codes</div>}
          {!loading &&
            postals?.map((p, i) => (
              <div
                key={i}
                onClick={() => {
                  setPostal(p);
                }}
                className={`px-2 py-1 text-center rounded cursor-pointer
              ${postal === p ? 'bg-blue text-white' : 'hover:bg-blue'}`}
              >
                {p}
              </div>
            ))}
        </div>
        {/* CLEAR / ALL */}
        <div
          onClick={onClickToFetchOffers}
          className={`px-2 py-1 text-center rounded cursor-pointer bg-blue-900`}
        >
          Click to apply
        </div>
      </FilterDropdown>
    </div>
  );
};

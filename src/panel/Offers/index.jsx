import React, { useEffect, useState } from 'react';
import { Table } from '../../components/shared';
import { offersColumnData, offersTableColumnExtensions } from '../../utils/data';
import { LicenseDate, Link, PriceFormate } from '../../components/shared/TableUtilities';
import { SearchBar } from '../../components/shared/SearchBar';
import { useOffersStore } from '../../store/features/offers/useOffersStore';
import TableSkeleton from '../../components/shared/Skeleton/TableSkeleton';

export const Offers = () => {
  const offersStore = useOffersStore();
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('This Month');
  const [country, setCountry] = useState('Canada');
  const [province, setProvince] = useState('ALL');
  const [status, setStatus] = useState('All (Offer / Booked / Purchased / Expired)');
  const [program, setProgram] = useState('All (Retail + CarPool)');

  // KPI Data - You can replace this with actual data from your API
  const kpiData = {
    offersGenerated: 2936,
    activeOffers: 612,
    carpoolOffers: 63,
    photoboostOffers: 381,
    photoboostCompleted: 279,
    offerValue: 58200000,
    dealerProfit: 7900000,
    expiringToday: 37,
    expiringThisWeek: 219
  };

  const dataProviders = [
    {
      columnName: ['expires'],
      func: restProps => <LicenseDate row={restProps?.row} />,
    },
    {
      columnName: ['submitted'],
      func: restProps => <LicenseDate row={restProps?.row} />,
    },
    {
      columnName: ['marketPrice'],
      func: restProps => <PriceFormate number={restProps?.row?.median} />,
    },
    {
      columnName: ['finalOffer'],
      func: restProps => <PriceFormate number={restProps?.row?.finalOffer} />,
    },
    {
      columnName: ['profit'],
      func: restProps => <PriceFormate number={restProps?.row?.profit} />,
    },
    {
      columnName: ['deductions'],
      func: restProps => <PriceFormate number={restProps?.row?.deductions} />,
    },
    // Add new data providers for the enhanced design
    {
      columnName: ['program'],
      func: restProps => {
        const isCarPool = restProps?.row?.program === 'CarPool';
        return (
          <span className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-xs border ${
            isCarPool 
              ? 'text-blue-400 bg-blue-900/20 border-blue-700' 
              : 'text-gray-300 bg-gray-800 border-gray-600'
          }`}>
            {isCarPool ? 'CarPool' : 'Retail'}
          </span>
        );
      }
    },
    {
      columnName: ['photoboost'],
      func: restProps => {
        const status = restProps?.row?.photoboost;
        if (status === 'sent') return (
          <span className="inline-flex items-center justify-center px-2 py-1 rounded-md text-xs border text-yellow-400 bg-yellow-900/20 border-yellow-700">
            PhotoBoost Sent
          </span>
        );
        if (status === 'done') return (
          <span className="inline-flex items-center justify-center px-2 py-1 rounded-md text-xs border text-green-400 bg-green-900/20 border-green-700">
            PhotoBoost Done
          </span>
        );
        return '—';
      }
    },
    {
      columnName: ['status'],
      func: restProps => {
        const status = restProps?.row?.status;
        const statusConfig = {
          offer: { label: 'Offer', className: 'text-gray-300 bg-gray-800 border-gray-600' },
          booked: { label: 'Booked', className: 'text-green-400 bg-green-900/20 border-green-700' },
          purchased: { label: 'Purchased', className: 'text-green-400 bg-green-900/20 border-green-700' },
          expired: { label: 'Expired', className: 'text-orange-400 bg-orange-900/20 border-orange-700' }
        };
        const config = statusConfig[status] || { label: status, className: 'text-gray-300 bg-gray-800 border-gray-600' };
        return (
          <span className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-xs border ${config.className}`}>
            {config.label}
          </span>
        );
      }
    },
    {
      columnName: ['domain'],
      func: restProps => (
        <a 
          href={`https://${restProps?.row?.domain}`} 
          className="text-gray-400 hover:text-gray-300 hover:underline transition-colors" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {restProps?.row?.domain}
        </a>
      )
    }
  ];

  useEffect(() => {
    offersStore.offersGeneratedListing();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Add your search logic here
    console.log('Search:', value);
  };

  const handleExportCSV = () => {
    // Add export logic here
    console.log('Export CSV');
  };

  const handleDownloadSummary = () => {
    // Add download summary logic here
    console.log('Download Range Summary');
  };

  const handleBoostToday = () => {
    // Add boost today logic here
    console.log('Boost Today Offers');
  };

  const handleBoostWeek = () => {
    // Add boost week logic here
    console.log('Boost Week Offers');
  };

  return (
    <div className="min-h-screen text-gray-200">
      <div className="max-w-[1600px] mx-auto h-full flex flex-col gap-2">
        

        {/* FILTERS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 flex-wrap">
          <div className="flex flex-wrap items-center gap-2">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search by VIN, vehicle, phone, or dealership…"
              className="min-w-[260px]"
            />

            {/* Date Range Filter */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-700 bg-gray-900 text-xs">
              <span className="text-gray-400">Date Range</span>
              <select 
                className="bg-transparent border-none text-gray-200 outline-none text-xs"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option className='bg-gray-900'>This Month</option>
                <option className='bg-gray-900'>Last 30 Days</option>
                <option className='bg-gray-900'>This Week</option>
                <option className='bg-gray-900'>Today</option>
                <option className='bg-gray-900'>Custom…</option>
              </select>
            </div>

            {/* Country Filter */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-700 bg-gray-900 text-xs">
              <span className="text-gray-400">Country</span>
              <select 
                className="bg-transparent border-none text-gray-200 outline-none text-xs"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option className='bg-gray-900'>Canada</option>
                <option className='bg-gray-900'>United States</option>
              </select>
            </div>

            {/* Province Filter */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-700 bg-gray-900 text-xs">
              <span className="text-gray-400">Province / State</span>
              <select 
                className="bg-transparent border-none text-gray-200 outline-none text-xs"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option className='bg-gray-900' value="ALL">All</option>
                <option className='bg-gray-900' value="ON">ON – Ontario</option>
                <option className='bg-gray-900' value="QC">QC – Quebec</option>
                <option className='bg-gray-900' value="BC">BC – British Columbia</option>
                <option className='bg-gray-900' value="AB">AB – Alberta</option>
                <option className='bg-gray-900' value="MB">MB – Manitoba</option>
                <option className='bg-gray-900' value="SK">SK – Saskatchewan</option>
                <option className='bg-gray-900' value="NS">NS – Nova Scotia</option>
                <option className='bg-gray-900' value="NB">NB – New Brunswick</option>
                <option className='bg-gray-900' value="NL">NL – Newfoundland & Labrador</option>
                <option className='bg-gray-900' value="PE">PE – Prince Edward Island</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-700 bg-gray-900 text-xs">
              <span className="text-gray-400">Status</span>
              <select 
                className="bg-transparent border-none text-gray-200 outline-none text-xs"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option className='bg-gray-900'>All (Offer / Booked / Purchased / Expired)</option>
                <option className='bg-gray-900'>Offer Only</option>
                <option className='bg-gray-900'>Booked</option>
                <option className='bg-gray-900'>Purchased</option>
                <option className='bg-gray-900'>Expired</option>
              </select>
            </div>

            {/* Program Filter */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-700 bg-gray-900 text-xs">
              <span className="text-gray-400">Program</span>
              <select 
                className="bg-transparent border-none text-gray-200 outline-none text-xs"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              >
                <option className='bg-gray-900'>All (Retail + CarPool)</option>
                <option className='bg-gray-900'>Retail Only</option>
                <option className='bg-gray-900'>CarPool Only</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              className="px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-gray-300 text-xs hover:bg-gray-800 transition-colors"
              onClick={handleExportCSV}
            >
              Export CSV
            </button>
            <button 
              className="px-4 py-2 rounded-md border border-indigo-600 bg-gray-800 text-gray-200 text-xs font-medium hover:bg-gray-700 transition-colors"
              onClick={handleDownloadSummary}
            >
              Download Range Summary
            </button>
          </div>
        </div>

        {/* KPI SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Offers Generated */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <div className="text-xs text-gray-400 uppercase">Offers Generated (Selected Range)</div>
            <div className="text-lg font-semibold text-white mt-1">{kpiData.offersGenerated.toLocaleString()}</div>
            <div className="text-xs text-green-400 mt-1">+19% vs previous period</div>
          </div>

          {/* Active Offers */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <div className="text-xs text-gray-400 uppercase">Active Offers (Unexpired)</div>
            <div className="text-lg font-semibold text-white mt-1">{kpiData.activeOffers.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">Offer-only + booked, within 7-day window.</div>
          </div>

          {/* CarPool Offers */}
          <div className="bg-gray-900 border border-gray-700 rounded-md p-4">
            <div className="text-xs text-gray-400 uppercase">CarPool Offers (Current)</div>
            <div className="text-lg font-semibold text-white mt-1">{kpiData.carpoolOffers.toLocaleString()}</div>
            <div className="text-xs text-green-400 mt-1">10.3% of active offers</div>
            <div className="text-xs text-gray-400 mt-1">% = CarPool ÷ Active.</div>
          </div>

          {/* PhotoBoost Offers */}
          <div className="bg-gray-900 border border-gray-700 rounded-md p-4">
            <div className="text-xs text-gray-400 uppercase">PhotoBoost Offers (Range)</div>
            <div className="text-lg font-semibold text-white mt-1">{kpiData.photoboostOffers.toLocaleString()}</div>
            <div className="text-xs text-green-400 mt-1">73% completed</div>
            <div className="text-xs text-gray-400 mt-1">
              Sent: {kpiData.photoboostOffers} · Completed: {kpiData.photoboostCompleted}.
            </div>
          </div>

          {/* Offer Value */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <div className="text-xs text-gray-400 uppercase">Offer Value (Gross)</div>
            <div className="text-lg font-semibold text-white mt-1">${(kpiData.offerValue / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-gray-400 mt-1">Before deductions / profit.</div>
          </div>

          {/* Dealer Profit */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <div className="text-xs text-gray-400 uppercase">Total Dealer Profit (Est.)</div>
            <div className="text-lg font-semibold text-white mt-1">${(kpiData.dealerProfit / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-gray-400 mt-1">Final offer minus CVX dealer cost.</div>
          </div>

          {/* Expiring Today */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <div className="text-xs text-gray-400 uppercase">Offers Expiring Today</div>
            <div className="text-lg font-semibold text-white mt-1">{kpiData.expiringToday.toLocaleString()}</div>
            <button 
              className="mt-2 px-3 py-1 rounded-md border border-indigo-600 bg-gray-800 text-gray-200 text-xs hover:bg-gray-700 transition-colors"
              onClick={handleBoostToday}
            >
              Boost Today's Offers
            </button>
          </div>

          {/* Expiring This Week */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <div className="text-xs text-gray-400 uppercase">Offers Expiring This Week</div>
            <div className="text-lg font-semibold text-white mt-1">{kpiData.expiringThisWeek.toLocaleString()}</div>
            <button 
              className="mt-2 px-3 py-1 rounded-md border border-indigo-600 bg-gray-800 text-gray-200 text-xs hover:bg-gray-700 transition-colors"
              onClick={handleBoostWeek}
            >
              Boost This Week's Offers
            </button>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="flex-1 min-h-0 border border-gray-700 rounded-xl overflow-hidden bg-gray-900 mt-2">
          {offersStore?.list?.loading ? (
            <TableSkeleton />
          ) : (
            <Table
              rowData={{
                rows: offersStore?.list?.data,
                totalCount: offersStore?.list?.data?.length
              }}
              columns={offersColumnData}
              tableColumnExtensions={offersTableColumnExtensions}
              dataProviders={dataProviders}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          )}
        </div>
      </div>
    </div>
  );
};
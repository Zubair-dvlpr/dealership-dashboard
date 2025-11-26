import React, { useEffect, useState } from 'react';
import { Table } from '../../components/shared';
import { appointmentsColumnData, appointmentsTableColumnExtensions } from '../../utils/data';
import { ActionInfo, LicenseDate, PriceFormate } from '../../components/shared/TableUtilities';
import { SearchBar } from '../../components/shared/SearchBar';
import { useOffersStore } from '../../store/features/offers/useOffersStore';
import TableSkeleton from '../../components/shared/Skeleton/TableSkeleton';
import { StatsCards } from '../../components/BookedaAppointments/Stats';

export const Appointments = () => {
  const offersStore = useOffersStore();
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Statuses');

  const { stats, list } = useOffersStore();


  const dataProviders = [
    {
      columnName: ['submittedDate'],
      func: restProps => (
        <LicenseDate row={{ creationDate: restProps?.row?.submittedDate }} />
      )
    },
    {
      columnName: ['median'],
      func: restProps => (
        <PriceFormate number={restProps?.row?.median} />
      )
    },
    {
      columnName: ['booking_datetime'],
      func: restProps => (
        <LicenseDate
          row={{
            creationDate: restProps?.row?.booking_datetime
          }}
        />
      )
    },
    {
      columnName: ['action'],
      func: restProps => <ActionInfo row={restProps?.row} />
    },
    // Add new data providers for status badges
    {
      columnName: ['appointmentStatus'],
      func: restProps => {
        const status = restProps?.row?.appointmentStatus?.toLowerCase();
        const statusConfig = {
          confirmed: { label: 'Confirmed', className: 'bg-green-900/20 text-green-400 border-green-700' },
          pending: { label: 'Pending', className: 'bg-yellow-900/20 text-yellow-400 border-yellow-700' },
          completed: { label: 'Completed', className: 'bg-green-900/30 text-green-300 border-green-600' },
          noshow: { label: 'No Show', className: 'bg-red-900/20 text-red-400 border-red-700' }
        };
        const config = statusConfig[status] || { label: status, className: 'bg-gray-800 text-gray-300 border-gray-600' };

        return (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${config.className}`}>
            {config.label}
          </span>
        );
      }
    },
    {
      columnName: ['profit'],
      func: restProps => {
        const profit = restProps?.row?.profit || 0;
        const isPositive = profit >= 0;
        return (
          <span className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}${profit}
          </span>
        );
      }
    }
  ];

  useEffect(() => {
    offersStore?.offersBookedListing();
  }, []);

  const filteredRows = offersStore?.list?.data?.filter(row => row?.iaPurchased === false) || [];
  // console.log('Filtered Rows:', filteredRows);
  const handleSearch = (value) => {
    setSearchTerm(value);
    console.log('Search:', value);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    // Add filter logic here
    console.log('Filter:', filter);
  };

  return (
    <div className="min-h-screen  text-gray-100">

      <div className="s mx-auto ">

        <StatsCards stats={stats} />

        {/* APPOINTMENTS LIST SECTION */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-3">Appointments List</h2>

          {/* SEARCH AND FILTERS */}
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center mb-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search by vehicle, VIN, seller, dealership..."
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {['All Statuses', 'Today', 'This Week', 'Completed', 'No Show'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`px-3 py-2 rounded-full text-xs border transition-colors ${activeFilter === filter
                    ? 'border-green-500 text-green-400 bg-green-900/20'
                    : 'border-gray-600 text-gray-400 bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="border border-gray-700 rounded-md overflow-hidden bg-gray-900/50 shadow-2xl">
          {offersStore?.list?.loading ? (
            <TableSkeleton />
          ) : (
            <Table
              rowData={{
                rows: filteredRows,
                totalCount: filteredRows.length
              }}
              columns={appointmentsColumnData}
              tableColumnExtensions={appointmentsTableColumnExtensions}
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
import React, { useEffect, useState } from 'react';
import { Table } from '../../components/shared';
import { appointmentsColumnData, appointmentsTableColumnExtensions } from '../../utils/data';
import {
  Action,
  ActionInfo,
  LicenseDate,
  PriceFormate,
  Status
} from '../../components/shared/TableUtilities';
import { SearchBar } from '../../components/shared/SearchBar';
import { useOffersStore } from '../../store/features/offers/useOffersStore';
import TableSkeleton from '../../components/shared/Skeleton/TableSkeleton';
import { StatsCards } from '../../components/BookedaAppointments/Stats';
import { UpdateOfferModal } from './utils';
import { AnalyticsSkelton } from '../../components/shared/Skeleton/DashboardSkelton';

export const Appointments = () => {
  const offersStore = useOffersStore();
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Statuses');

  const [open, setOpen] = useState({
    type: '',
    data: {}
  });

  const { stats, list } = useOffersStore();

  const dataProviders = [
    {
      columnName: ['submittedDate'],
      func: restProps => <LicenseDate row={{ creationDate: restProps?.row?.submittedDate }} />
    },
    {
      columnName: ['median'],
      func: restProps => <PriceFormate number={restProps?.row?.median} />
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
      func: restProps => (
        <Action
          row={restProps?.row}
          isUpdate={true}
          onUpdate={row => {
            setOpen({
              type: 'update',
              data: row
            });
          }}
        />
      )
    },
    // Add new data providers for status badges
    {
      columnName: ['appointmentStatus'],
      func: restProps => <Status row={restProps?.row} />
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
  const handleSearch = value => {
    setSearchTerm(value);
    console.log('Search:', value);
    2;
  };

  const handleFilterClick = filter => {
    setActiveFilter(filter);
    // Add filter logic here
    console.log('Filter:', filter);
  };
// console.log('row in modal', row);

  return (
    <React.Fragment>
      <div className='min-h-screen  text-gray-100'>
        <div className='s mx-auto '>
          {offersStore?.list?.loading ? (
            <AnalyticsSkelton grid={4} />
          ) : (
            <StatsCards stats={stats} />
          )}


          {/* APPOINTMENTS LIST SECTION */}
          <div className='mb-4'>
            <h2 className='text-lg font-semibold text-white mb-3'>Appointments List</h2>

            {/* SEARCH AND FILTERS */}
            <div className='flex flex-col lg:flex-row gap-3 items-start lg:items-center mb-4 flex-wrap'>
              <div className='flex-1 min-w-[300px]'>
                <SearchBar
                  onSearch={handleSearch}
                  placeholder='Search by vehicle, VIN, seller, dealership...'
                />
              </div>

              <div className='flex flex-wrap gap-2'>
                {['All Statuses', 'Today', 'This Week', 'Completed', 'No Show'].map(filter => (
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
          <div className='border border-gray-700 rounded-md overflow-hidden bg-gray-900/50 shadow-2xl'>
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

      <UpdateOfferModal
        open={open.type === 'update'}
        onClose={() => setOpen({ type: '', data: {} })}
        row={open?.data}
      />

    </React.Fragment>
  );
};

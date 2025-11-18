import React, { useEffect, useState } from 'react';
import { Table } from '../../components/shared';
import { appointmentsColumnData, appointmentsTableColumnExtensions } from '../../utils/data';
import { ActionInfo, LicenseDate, PriceFormate } from '../../components/shared/TableUtilities';
import { SearchBar } from '../../components/shared/SearchBar';
import { useOffersStore } from '../../store/features/offers/useOffersStore';
import TableSkeleton from '../../components/shared/Skeleton/TableSkeleton';

export const Appointments = () => {
  const offersStore = useOffersStore();
  // STATE
  const [selectedIds, setSelectedIds] = useState([]);

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
  }
];




  useEffect(() => {
    offersStore?.offersListing();
  }, []);

  const filteredRows =
    offersStore?.list?.data?.filter(row => row?.iaPurchased === true) || [];

  console.log('offersStore?.list?.data', filteredRows);

  return (
    <React.Fragment>
      <div className=''>
        {/* // GENERATE KEY AND SEARCH BAR  */}
        <div className='flex items-center mb-4 gap-2'>
          <SearchBar onSearch={value => console.log(value)} />
        </div>

        {/* // TABLE */}
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
    </React.Fragment>
  );
};

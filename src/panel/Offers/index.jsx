import React, { useEffect, useState } from 'react';
import { Table } from '../../components/shared';
import { offersColumnData, offersTableColumnExtensions } from '../../utils/data';
import { LicenseDate, Link, PriceFormate } from '../../components/shared/TableUtilities';
import { SearchBar } from '../../components/shared/SearchBar';
import { useOffersStore } from '../../store/features/offers/useOffersStore';
import TableSkeleton from '../../components/shared/Skeleton/TableSkeleton';

export const Offers = () => {
  const offersStore = useOffersStore();
  // STATE
  const [selectedIds, setSelectedIds] = useState([]);

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
    }
  ];


  useEffect(() => {
    offersStore.offersListing();
  }, []);

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
    </React.Fragment>
  );
};

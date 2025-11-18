import React, { useEffect, useState } from 'react';
import TableMainBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({
  rowData,
  setRowData,
  columns,
  selectedIds,
  setSelectedIds,
  tableColumnExtensions,
  dataProviders,
  onRowClick,
  loading,
  isMultiSelect = false,
  freezedColumns = [],
  isborder = false,
}) => {
  const [sortOrder, setSortOrder] = useState(false);
  const [sortField, setSortField] = useState('');

  const getFieldValue = (item, field) => {
    // Support nested fields like "property.propertyName"
    const value = field
      .split('.')
      .reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : null),
        item
      );

    if (value === null || value === undefined) return 'zz';

    // Check if it's a valid date string or Date object
    if (!isNaN(Date.parse(value))) {
      return new Date(value).getTime();
    }

    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return value ? 1 : 0;
    return value?.toString().toLowerCase() || 'zz';
  };

  const sortData = (data, field, descending = false) => {
    return [...data].sort((a, b) => {
      const valA = getFieldValue(a, field);
      const valB = getFieldValue(b, field);

      const comparison =
        typeof valA === 'number' && typeof valB === 'number'
          ? valA - valB
          : String(valA).localeCompare(String(valB));

      return descending ? -comparison : comparison;
    });
  };

  const onSorting = ({ name: field }) => {
    const newOrder = field === sortField ? !sortOrder : false;
    setSortField(field);
    setSortOrder(newOrder);

    const sorted = sortData(rowData?.rows, field, newOrder);
    setRowData((prev) => ({ ...prev, rows: sorted }));
  };

  useEffect(() => {
    if (loading) {
      setSortField('');
      setSortOrder(false);
    }
  }, [loading]);

  return (
    <div className={`relative flex flex-col w-full overflow-hidden`}>
      <div
        className={`${
          isborder ? 'border' : 'border-t border-b-0'
        } border-ink/25 flex flex-col h-full flex-1 w-full overflow-auto no-scrollbar`}
      >
        {/* Table */}
        <table
          className={`w-full flex flex-col select-none min-w-min  ${
            rowData?.rows?.length > 0 ? 'h-auto' : 'h-full'
          }`}
          aria-label='a dense table'
        >
          <TableHeader
            rows={rowData?.rows}
            columns={columns}
            tableColumnExtensions={tableColumnExtensions}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onSorting={onSorting}
            sortField={sortField}
            sortOrder={sortOrder}
            isMultiSelect={isMultiSelect}
            freezedColumns={freezedColumns}
          />
          <TableMainBody
            rows={rowData?.rows}
            columns={columns}
            tableColumnExtensions={tableColumnExtensions}
            dataProviders={dataProviders}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onRowClick={onRowClick}
            isMultiSelect={isMultiSelect}
            freezedColumns={freezedColumns}
          />
        </table>
        {rowData?.rows?.length === 0 && (
          <div className='h-[150px] flex items-center justify-center'>
            <p className='mt-2 text-[#13343B] whitespace-nowrap text-sm'>
              No data found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;

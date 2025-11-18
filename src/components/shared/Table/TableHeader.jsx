import React from 'react';
import { getOrderedColumns } from '../../../utils/utils';

const TableHeader = ({
  rows,
  columns,
  tableColumnExtensions,
  selectedIds,
  setSelectedIds,
  isMultiSelect
}) => {
  // ORDER COLUMNS

  return (
    <React.Fragment>
      <thead
        className={`bg-panel sticky top-0 left-0 z-10 select-none border-b
        border-ink/25 w-full text-[10px] !tracking-[0px] !leading-[18px] font-semibold !min-h-[40px] flex items-center`}
      >
        <tr
          style={{
            backgroundColor: 'transparent',
            inlineSize: '100%'
          }}
          className={`flex items-center min-w-min
            ${
              selectedIds?.length > 0
                ? 'border rounded-[4px] w-fit pr-2 py-[4px] gap-2.5'
                : 'border-none'
            }`}
        >
          {/* CHECKBOX */}
          {isMultiSelect && (
            <td style={{ minWidth: selectedIds?.length <= 0 && '55px' }}>
              <div className={`flex justify-start pl-2 items-center`}>
                <div
                  className={`cursor-pointer !rounded-[4px] !p-[2px] !w-[16px] !h-[16px] flex items-center justify-center
                ${selectedIds?.length > 0 ? 'bg-primary00' : 'border-[1.9px] border-borderGray'}`}
                  onClick={() =>
                    setSelectedIds(selectedIds?.length === 0 ? rows?.map(row => row) : [])
                  }
                >
                  {Boolean(selectedIds?.length > 0) && (
                    <div className='w-full h-full text-ink flex items-center justify-center'>
                      <div className='w-2 h-1 bg-primary00'></div>
                    </div>
                  )}
                </div>
              </div>
            </td>
          )}

          {columns?.map((col, colIndex) => {
            // GET COLUMN EXTENSION
            const columnExtension = tableColumnExtensions?.find(
              item => item?.columnName === col?.name
            );
            const width = columnExtension?.width || 100;

            return (
              <td
                key={colIndex}
                style={{
                  width,
                  minWidth: width,
                  maxWidth: width
                }}
                className='flex items-center !h-[40px]'
              >
                <span className={`text-ink px-2 w-fit text-[14px]`}>{col?.title}</span>
              </td>
            );
          })}
        </tr>
      </thead>
    </React.Fragment>
  );
};

export default TableHeader;

// Library Imports
import React, { useState } from 'react';
import { getOrderedColumns } from '../../../utils/utils';
import { Check } from 'lucide-react';

const TableMainBody = ({
  rows,
  columns,
  selectedIds,
  setSelectedIds,
  tableColumnExtensions,
  dataProviders,
  onRowClick,
  isMultiSelect,
  freezedColumns,
}) => {
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  const handleRowClick = (row) => (event) => {
    event.stopPropagation();
    onRowClick && onRowClick(row);
  };

  const handleCheckboxClick = (row, isRowSelected, index) => (event) => {
    event.stopPropagation();
    let newSelectedIds = [];
    if (event.shiftKey && lastClickedIndex !== null) {
      const start = Math.min(lastClickedIndex, index);
      const end = Math.max(lastClickedIndex, index);
      const selectedIndexs = rows.slice(start, end + 1)?.map((r) => r);
      if (isRowSelected) {
        newSelectedIds = selectedIds.filter(
          (_) => !selectedIndexs.every((ele) => ele?.id === _.id)
        );
        setSelectedIds(newSelectedIds);
      } else {
        newSelectedIds = Array.from(
          new Set([...selectedIds, ...selectedIndexs])
        );
        setSelectedIds(newSelectedIds);
      }
    } else {
      const ids = isRowSelected
        ? selectedIds?.filter((ele) => ele?.id !== row?.id)
        : [...selectedIds, row];
      setSelectedIds(ids);
      setLastClickedIndex(index);
    }
  };

  // ORDER COLUMNS
  const orderedColumns = getOrderedColumns(columns, freezedColumns);

  return (
    <React.Fragment>
      {rows?.length > 0 && (
        <tbody className={`flex flex-col w-full h-full`}>
          {rows?.map((row, rowIndex) => {
            const isRowSelected = selectedIds?.find(
              (item) => item?.id === row?.id
            );
            return (
              <tr
                key={rowIndex}
                className={`!font-normal   !tracking-[0px] !leading-[18px] min-w-min flex items-center ${
                  rowIndex % 2 === 0 ? 'bg-panel/70' : ''
                }`}
              >
                {/* Checkbox */}
                {isMultiSelect && (
                  <td style={{ minWidth: '55px' }}>
                    <div className='flex justify-start pl-2 items-center'>
                      <div
                        className={`cursor-pointer !rounded-[4px] !p-[2px] !w-[16px] !h-[16px] border-borderGray  flex items-center justify-center ${
                          isRowSelected ? 'bg-primaryColor' : 'border-[1.5px]'
                        }`}
                        onClick={handleCheckboxClick(
                          row,
                          isRowSelected,
                          rowIndex
                        )}
                      >
                        {Boolean(isRowSelected) && (
                          <div className='w-full h-full text-white flex items-center justify-center'>
                            <Check />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                )}

                {orderedColumns?.map((col, colIndex) => {
                  const columnExtension = tableColumnExtensions?.find(
                    (item) => item?.columnName === col?.name
                  );
                  const width = columnExtension?.width || 100;
                  const dataProvider = dataProviders?.find(
                    (provider) => provider?.columnName[0] === col?.name
                  );

                  return (
                    <td
                      key={colIndex}
                      style={{
                        width,
                        minWidth: width,
                        maxWidth: width,
                        fontSize: col?.name !== 'id' ? '14px' : '12px',
                      }}
                      onClick={() => handleRowClick(row)}
                      className={`px-2 h-[40px] flex items-center text-[10px]`}
                    >
                      {dataProvider ? (
                        dataProvider?.func({
                          row: row,
                        })
                      ) : (
                        <p className='w-full truncate'>{row[col?.name]}</p>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      )}
    </React.Fragment>
  );
};

export default TableMainBody;

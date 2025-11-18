const TableSkeleton = ({ rows = 15, cols = 4 }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border border-border rounded-xl'>
        <thead>
          <tr>
            {[...Array(cols)].map((_, i) => (
              <th key={i} className='px-4 py-3 text-left'>
                <div className='h-4 w-24 bg-ink/50 rounded animate-pulse'></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className='border-t border-border'>
              {[...Array(cols)].map((_, colIndex) => (
                <td key={colIndex} className='px-4 py-3'>
                  <div className='h-4 w-20 bg-ink/40 rounded animate-pulse'></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;

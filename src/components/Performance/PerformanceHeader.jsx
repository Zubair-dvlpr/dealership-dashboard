import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterDropdown } from "../shared/FilterDropdown";
import { dependency } from "../../store/features/offers/offersFns";

const months = [
  { id: 1, name: "Jan" }, { id: 2, name: "Feb" }, { id: 3, name: "Mar" },
  { id: 4, name: "Apr" }, { id: 5, name: "May" }, { id: 6, name: "Jun" },
  { id: 7, name: "Jul" }, { id: 8, name: "Aug" }, { id: 9, name: "Sep" },
  { id: 10, name: "Oct" }, { id: 11, name: "Nov" }, { id: 12, name: "Dec" },
];

export default function PerformanceHeader({ onFiltersChange }) {
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isProvOpen, setIsProvOpen] = useState(false);

  // Month (allow "ALL" = not selected)
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null); // null => ALL months

  // Province (postal) (allow "ALL")
  const [postal, setPostal] = useState("ALL");
  const [postals, setPostals] = useState([]);
  const [loadingPostals, setLoadingPostals] = useState(false);

  // Load postals
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingPostals(true);
        const resp = await dependency(); // { data: { postals: [...] } }
        if (!alive) return;
        setPostals(resp?.data?.postals || []);
      } catch (e) {
        console.error("Failed to load postals", e);
      } finally {
        if (alive) setLoadingPostals(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Emit filter changes upwards
  useEffect(() => {
    const monthParam = selectedMonth ? `${selectedYear}-${selectedMonth}` : undefined; // YYYY-M
    const provinceParam = postal === "ALL" ? undefined : postal;
    onFiltersChange?.({ province: provinceParam, month: monthParam });
  }, [selectedYear, selectedMonth, postal, onFiltersChange]);

  const monthDisplay = selectedMonth ? `${selectedYear} - ${selectedMonth}` : "Select";

  return (
    <div className='bg-blue w-full py-3 flex gap-4 px-3 border border-[#212332] rounded-[12px] flex-wrap'>
      {/* MONTH */}
      <FilterDropdown
        name='Month'
        value={monthDisplay}
        open={isMonthOpen}
        setOpen={setIsMonthOpen}
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

        {/* ALL option */}
        <div
          onClick={() => setSelectedMonth(null)}
          className={`px-2 py-1 my-2 text-center rounded cursor-pointer ${selectedMonth === null ? 'bg-blue text-white' : 'hover:bg-blue'}`}
        >
          ALL
        </div>

        <div className='grid grid-cols-3 gap-2'>
          {months.map(m => (
            <div
              key={m.id}
              onClick={() => setSelectedMonth(m.id)}
              className={`px-2 py-1 text-center rounded cursor-pointer
              ${selectedMonth === m.id ? 'bg-blue text-white' : 'hover:bg-blue'}`}
            >
              {m.name}
            </div>
          ))}
        </div>
      </FilterDropdown>

      {/* PROVINCE (postal) */}
      <FilterDropdown
        name='Province'
        value={loadingPostals ? 'loading' : (postal || 'Select')}
        open={isProvOpen}
        setOpen={setIsProvOpen}
      >
        <div className='grid grid-cols-3 gap-2'>
          {/* ALL */}
          <div
            onClick={() => setPostal("ALL")}
            className={`px-2 py-1 text-center rounded cursor-pointer
            ${postal === "ALL" ? 'bg-blue text-white' : 'hover:bg-blue'}`}
          >
            ALL
          </div>

          {loadingPostals && <div>Loading…</div>}
          {!loadingPostals && postals.length === 0 && <div>No postal codes</div>}
          {!loadingPostals && postals.map((p, i) => (
            <div
              key={i}
              onClick={() => setPostal(p)}
              className={`px-2 py-1 text-center rounded cursor-pointer
              ${postal === p ? 'bg-blue text-white' : 'hover:bg-blue'}`}
            >
              {p}
            </div>
          ))}
        </div>
      </FilterDropdown>
    </div>
  );
}

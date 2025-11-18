import React, { useMemo } from "react";

export default function PerformanceTable({ offers = [] }) {
  const THRESH = 0.83; // tweak threshold as needed

  const prettyDomain = (d) =>
    (d || "—").replace(/^https?:\/\//, "").replace(/\/$/, "");

  const fmtNum = (n) =>
    n === null || n === undefined ? "—" : Number(n).toLocaleString();

  const fmtDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
  };

  const rows = useMemo(() => {
    return offers.map((o, idx) => {
      const median = Number(o?.median ?? 0);
      const final = Number(o?.finalOffer ?? 0);
      const convPct = median > 0 ? (final / median) * 100 : 0;
      const purchased = median > 0 && final >= THRESH * median;

      return {
        _id: o._id || idx,
        createdAt: o.createdAt,
        name: o.name,
        phone: o.phone,
        vehicle: o.vehicle,
        kilometres: o.kilometres,
        median,
        finalOffer: final,
        profit: o.profit,
        deductions: o.deductions,
        postalCode: o.postalCode,
        domain: prettyDomain(o?.license?.domain),
        purchased,
        convPct,
      };
    });
  }, [offers]);

  const fmtPct = (n) => `${n.toFixed(1)}%`;

  return (
    <div className='bg-blue border border-[#212332] rounded-xl p-4 overflow-x-auto'>
      <h2 className='text-lg font-semibold mb-4'>Rooftop Performance</h2>
      <table className='w-full border-separate border-spacing-y-2'>
        <thead>
          <tr className='text-left text-gray-400 border-b border-[#1F273D]'>
            <th className='px-3'>#</th>
            <th className='px-3'>Created</th>
            <th className='px-3'>Name</th>
            <th className='px-3'>Phone</th>
            <th className='px-3'>Vehicle</th>
            <th className='px-3'>KM</th>
            <th className='px-3'>Median</th>
            <th className='px-3'>Final</th>
            <th className='px-3'>Profit</th>
            <th className='px-3'>Deduct</th>
            <th className='px-3'>Postal</th>
            <th className='px-3'>Rooftop</th>
            <th className='px-3'>Purch</th>
            <th className='px-3'>Conv%</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr className='bg-[#1A2135]/70'>
              <td className='py-2 px-3 border border-[#24293C]' colSpan={14}>
                No data
              </td>
            </tr>
          )}

          {rows.map((r, idx) => (
            <tr key={r._id} className='bg-[#1A2135]/70 transition bborder-2 border-[#11162B]'>
              <td className='py-2 px-3 border border-[#24293C]'>{idx + 1}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{fmtDate(r.createdAt)}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{r.name || "—"}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{r.phone || "—"}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{r.vehicle || "—"}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{fmtNum(r.kilometres)}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{fmtNum(r.median)}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{fmtNum(r.finalOffer)}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{fmtNum(r.profit)}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{fmtNum(r.deductions)}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{r.postalCode || "—"}</td>
              <td className='py-2 px-3 border border-[#24293C]'>{r.domain || "—"}</td>
              <td className='py-2 px-3 border border-[#24293C]'>
                {r.purchased ? "Yes" : "No"}
              </td>
              <td className='py-2 px-3 border border-[#24293C]'>{fmtPct(r.convPct)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* If you don't want the heuristic note, delete this comment. */}
      {/* <div className="mt-2 text-xs text-gray-500">
        Purch = finalOffer ≥ {Math.round(THRESH * 100)}% of median. Replace when backend sends a purchased flag.
      </div> */}
    </div>
  );
}

import React, { useMemo } from 'react';

// Reusable list tile (unchanged)
const ListCard = ({ rank, name, province, offers, purchased, conv, tone = 'good' }) => {
  const pillTone =
    tone === 'good'
      ? 'text-emerald-300 border-emerald-700/40 bg-emerald-900/10'
      : 'text-rose-300 border-rose-700/40 bg-rose-900/10';

  return (
    <div className='flex items-center justify-between rounded-2xl border border-[#24293C] bg-[#1A2135]/80 px-4 py-4'>
      <div className='flex items-center gap-4'>
        <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#2a2f45] bg-[#12182a] text-gray-300'>
          {rank}
        </div>
        <div>
          <div className='text-[1.125rem] font-semibold leading-6'>{name}</div>
          <div className='text-sm text-gray-400'>
            {province} • Offers {offers} • Purchased {purchased}
          </div>
        </div>
      </div>
      <span className={`rounded-2xl border px-3 py-1 text-sm ${pillTone}`}>{conv}</span>
    </div>
  );
};

// FSA (first letter) -> Province
const PROVINCE_BY_FSA = {
  A: 'NL', B: 'NS', C: 'PE', E: 'NB',
  G: 'QC', H: 'QC', J: 'QC',
  K: 'ON', L: 'ON', M: 'ON', N: 'ON', P: 'ON',
  R: 'MB', S: 'SK', T: 'AB', V: 'BC',
  X: 'NT/NU', Y: 'YT'
};
const postalToProvince = (p) => {
  if (!p || typeof p !== 'string') return '—';
  const c = p[0]?.toUpperCase();
  return PROVINCE_BY_FSA[c] || '—';
};

// Temporary heuristic for "purchased" until backend provides a flag.
// Tweak THRESH if you want higher/lower conversion rates.
const THRESH = 0.83;
const purchaseRule = (o) => {
  const median = Number(o?.median ?? 0);
  const final = Number(o?.finalOffer ?? 0);
  if (!median) return false;
  return final >= THRESH * median;
};

const prettyDomain = (d) => (d || '—').replace(/^https?:\/\//, '').replace(/\/$/, '');
const fmtPct = (n) => `${(n * 100).toFixed(1)}%`;

const MIN_OFFERS = 1; // change to 50 when you enable "Min Offer" filter on this screen

const OverallRooftops = ({ offers = [] }) => {
  const { top5, bottom5, consideredCount } = useMemo(() => {
    // group by rooftop (license.domain)
    const map = new Map();
    for (const o of offers) {
      const domain = o?.license?.domain || '—';
      const rec = map.get(domain) || {
        domain,
        offers: 0,
        purchased: 0,
        provCount: {} // province frequency for this rooftop
      };
      rec.offers += 1;
      const prov = postalToProvince(o?.postalCode);
      rec.provCount[prov] = (rec.provCount[prov] || 0) + 1;
      if (purchaseRule(o)) rec.purchased += 1;
      map.set(domain, rec);
    }

    // finalize rows: pick modal province, calc conv
    const rows = Array.from(map.values()).map(r => {
      let province = '—', max = 0;
      for (const [p, cnt] of Object.entries(r.provCount)) {
        if (cnt > max) { province = p; max = cnt; }
      }
      const conv = r.offers ? r.purchased / r.offers : 0;
      return {
        name: prettyDomain(r.domain),
        province,
        offers: r.offers,
        purchased: r.purchased,
        conv
      };
    });

    // apply min-offers gate
    const considered = rows.filter(r => r.offers >= MIN_OFFERS);

    // sort for top & bottom
    const top5 = [...considered].sort((a, b) => b.conv - a.conv).slice(0, 5);
    const bottom5 = [...considered].sort((a, b) => a.conv - b.conv).slice(0, 5);

    return { top5, bottom5, consideredCount: considered.length };
  }, [offers]);

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      {/* Top 5 */}
      <div className='bg-blue border border-[#212332] rounded-2xl p-4'>
        <h3 className='text-xl font-semibold mb-4'>Top 5 Overall Rooftops</h3>
        <div className='space-y-4'>
          {top5.length === 0 && (
            <div className='text-sm text-gray-400'>No rooftops to display</div>
          )}
          {top5.map((r, i) => (
            <ListCard
              key={r.name + i}
              rank={i + 1}
              name={r.name}
              province={r.province}
              offers={r.offers}
              purchased={r.purchased}
              conv={fmtPct(r.conv)}
              tone='good'
            />
          ))}
        </div>
        <div className='mt-4 text-sm text-gray-400'>
          {consideredCount} rooftops considered (min offers {MIN_OFFERS})
        </div>
      </div>

      {/* Bottom 5 */}
      <div className='bg-blue border border-[#212332] rounded-2xl p-4'>
        <h3 className='text-xl font-semibold mb-4'>Bottom 5 Overall Rooftops</h3>
        <div className='space-y-4'>
          {bottom5.length === 0 && (
            <div className='text-sm text-gray-400'>No rooftops to display</div>
          )}
          {bottom5.map((r, i) => (
            <ListCard
              key={r.name + i}
              rank={i + 1}
              name={r.name}
              province={r.province}
              offers={r.offers}
              purchased={r.purchased}
              conv={fmtPct(r.conv)}
              tone='bad'
            />
          ))}
        </div>
        <div className='mt-4 text-sm text-gray-400'>Ranked by Conversion %</div>
      </div>
    </div>
  );
};

export default OverallRooftops;

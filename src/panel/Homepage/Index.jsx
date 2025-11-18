import React, { useState } from 'react';

const Homepage = () => {
  const [statsRange, setStatsRange] = useState('this_month');
  const [statsFrom, setStatsFrom] = useState('');
  const [statsTo, setStatsTo] = useState('');

  // Sample data - in a real app, this would come from an API
  const dashboardData = {
    dealerName: "CarBiz",
    outstandingBalance: "$297",
    
    // Top KPIs
    totalOffers: 23,
    totalOffersAllTime: 77,
    totalOfferValue: "$1,029,621",
    bookedOffers: 9,
    conversionRate: "39%",
    vehiclesPurchased: 7,
    vehiclesPurchasedAllTime: 31,
    totalPurchaseValue: "$172,450",
    avgPerVehicle: "$24,636",
    vehiclesInProcess: 5,
    
    // Billing Summary
    outstandingBalanceAmount: "$297",
    dueVehiclesCount: 1,
    pendingChargesAmount: "$198",
    pendingChargesCount: 2,
    paidThisPeriod: "$891",
    paidVehicleCount: 9,
    
    // Offer Health
    expiringOffersCount: 3,
    expiredOffersCount: 4,
    expiredOffersValue: "$41,200",
    cancelledByDealerCount: 2,
    cancelledByDealerValue: "$18,900",
    
    // Operations
    appointmentsTodayCount: 3,
    dropOffBookedCount: 4,
    vehiclesBookedForTransportCount: 5,
    incomingVehiclesCount: 3,
  };

  return (
    <div className="min-h-screen  text-slate-200" bgcls="bg-gradient-to-br from-slate-800 to-slate-950">
      {/* Main Content */}
      <main className="p-4 md:p-2 lg:p-0">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-xl md:text-2xl font-bold text-white">Dealer Overview</h1>
            <p className="text-sm text-slate-400">
              Performance and activity for <strong>{dashboardData.dealerName}</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-full px-3 py-2 text-sm">
            <span>Current Balance</span>
            <span className="bg-red-900/20 text-red-200 rounded-full px-2 py-1 text-xs">
              {dashboardData.outstandingBalance}
            </span>
          </div>
        </header>

        {/* Date Filter */}
        <section className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm text-slate-400">
              Filter stats by date range
            </div>
            <div className="flex flex-wrap gap-3 items-center text-sm">
              <label className="flex items-center gap-1">
                <span>Period</span>
                <select 
                  value={statsRange}
                  onChange={(e) => setStatsRange(e.target.value)}
                  className="bg-slate-950 border border-slate-600 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                >
                  <option value="this_month">This month</option>
                  <option value="last_month">Last month</option>
                  <option value="last_7">Last 7 days</option>
                  <option value="custom">Custom</option>
                </select>
              </label>
              <label className="flex items-center gap-1">
                <span>From</span>
                <input 
                  type="date" 
                  value={statsFrom}
                  onChange={(e) => setStatsFrom(e.target.value)}
                  className="bg-slate-950 border border-slate-600 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </label>
              <label className="flex items-center gap-1">
                <span>To</span>
                <input 
                  type="date" 
                  value={statsTo}
                  onChange={(e) => setStatsTo(e.target.value)}
                  className="bg-slate-950 border border-slate-600 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
              </label>
            </div>
          </div>
        </section>

        {/* Top KPI Cards */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Total Offers */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Total Offers</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">🎯</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.totalOffers}</div>
              <div className="text-xs text-slate-400 mt-1">
                {dashboardData.totalOffersAllTime} all-time · <strong>Total value: {dashboardData.totalOfferValue}</strong>
              </div>
            </div>

            {/* Booked Offers */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Booked Offers</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">✅</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.bookedOffers}</div>
              <div className="text-xs text-red-400 mt-1">-1 vs last period</div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Conversion Rate</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">📈</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.conversionRate}</div>
              <div className="text-xs text-slate-400 mt-1">from {dashboardData.totalOffers} offers</div>
            </div>

            {/* Vehicles Purchased */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Vehicles Purchased</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">🚗</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.vehiclesPurchased}</div>
              <div className="text-xs text-slate-400 mt-1">{dashboardData.vehiclesPurchasedAllTime} all-time</div>
            </div>

            {/* Total Purchase Value */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Total Purchase Value</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">$</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.totalPurchaseValue}</div>
              <div className="text-xs text-slate-400 mt-1">Avg per vehicle: {dashboardData.avgPerVehicle}</div>
            </div>

            {/* Vehicles In Process */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Vehicles In Process</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">🔄</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.vehiclesInProcess}</div>
              <div className="text-xs text-slate-400 mt-1">2 in inspection · 3 in transit</div>
            </div>
          </div>
        </section>

        {/* Billing Summary */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Billing Summary</h2>
              <p className="text-sm text-slate-400">CarValueX fees for this dealership.</p>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300">Open Billing →</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Outstanding */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Outstanding (Due)</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">⏱</span>
              </div>
              <div className="text-lg font-semibold text-red-300">{dashboardData.outstandingBalanceAmount}</div>
              <div className="text-xs text-slate-400 mt-1">{dashboardData.dueVehiclesCount} vehicle with unpaid fees</div>
            </div>

            {/* Pending Charges */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Pending Charges</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">🕒</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.pendingChargesAmount}</div>
              <div className="text-xs text-slate-400 mt-1">Holds on {dashboardData.pendingChargesCount} booked vehicles</div>
            </div>

            {/* Paid This Period */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Paid This Period</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">💰</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.paidThisPeriod}</div>
              <div className="text-xs text-slate-400 mt-1">{dashboardData.paidVehicleCount} vehicle fees collected</div>
            </div>
          </div>
        </section>

        {/* Offer Health */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Offer Health</h2>
              <p className="text-sm text-slate-400">Expiring, expired, and cancelled offers.</p>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300">Open Offers →</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Expiring Soon */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Expiring Soon (48h)</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">⏳</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.expiringOffersCount}</div>
              <div className="text-xs text-slate-400 mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span>2019 Civic</span>
                  <span className="bg-yellow-900/20 text-yellow-400 rounded-full px-2 py-1 text-xs">in 5h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>2016 CR-V</span>
                  <span className="bg-yellow-900/20 text-yellow-400 rounded-full px-2 py-1 text-xs">tomorrow</span>
                </div>
              </div>
            </div>

            {/* Expired Offers */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Expired Offers (7d)</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">🧊</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.expiredOffersCount}</div>
              <div className="text-xs text-slate-400 mt-1">Lost opportunity value: {dashboardData.expiredOffersValue}</div>
            </div>

            {/* Cancelled by Dealer */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Cancelled by Dealer</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">🗑</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.cancelledByDealerCount}</div>
              <div className="text-xs text-slate-400 mt-1">Value cancelled: {dashboardData.cancelledByDealerValue}</div>
            </div>
          </div>
        </section>

        {/* Operations */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Today & Upcoming</h2>
              <p className="text-sm text-slate-400">Appointments, transportation, and incoming vehicles.</p>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300">Go to Appointments →</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Appointments Today */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Appointments Today</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">📅</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.appointmentsTodayCount}</div>
              <div className="text-xs text-slate-400 mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span>11:00 – 2018 Tiguan</span>
                  <span>Drop-off</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>14:30 – 2015 Corolla</span>
                  <span>Pickup</span>
                </div>
              </div>
            </div>

            {/* Vehicles Booked for Drop-Off */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Vehicles Booked for Drop-Off</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">🏢</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.dropOffBookedCount}</div>
              <div className="text-xs text-slate-400 mt-1">Next: today 4:30pm (2020 RAV4)</div>
            </div>

            {/* Vehicles Booked for Transportation */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Vehicles Booked for Transportation</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">🚚</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.vehiclesBookedForTransportCount}</div>
              <div className="text-xs text-slate-400 mt-1">3 pickups scheduled · 2 awaiting dispatch</div>
            </div>

            {/* Incoming Vehicles */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400">Incoming Vehicles</span>
                <span className="w-6 h-6 rounded-full border border-slate-500 flex items-center justify-center text-sm">🚦</span>
              </div>
              <div className="text-lg font-semibold text-white">{dashboardData.incomingVehiclesCount}</div>
              <div className="text-xs text-slate-400 mt-1">1 in transit · 2 arriving within 2h</div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Offers */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Recent Offers</h2>
                <button className="text-sm text-blue-400 hover:text-blue-300">View all offers →</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 text-xs uppercase tracking-wider text-slate-400">Vehicle</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider text-slate-400">Final Offer</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider text-slate-400">Submitted</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider text-slate-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-2">2019 Mercedes E-Class</td>
                      <td className="py-2">$27,449</td>
                      <td className="py-2">Nov 12, 02:12</td>
                      <td className="py-2">
                        <span className="bg-green-900/20 text-green-300 rounded-full px-2 py-1 text-xs">Active</span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-2">2012 Hyundai Elantra</td>
                      <td className="py-2">$1,577</td>
                      <td className="py-2">Oct 24, 17:06</td>
                      <td className="py-2">
                        <span className="bg-yellow-900/20 text-yellow-400 rounded-full px-2 py-1 text-xs">Expiring</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="py-2">2006 Honda Civic EX</td>
                      <td className="py-2">$725</td>
                      <td className="py-2">Oct 21, 13:28</td>
                      <td className="py-2">
                        <span className="bg-red-900/20 text-red-300 rounded-full px-2 py-1 text-xs">Expired</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Purchases */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">Recent Purchases</h2>
                <button className="text-sm text-blue-400 hover:text-blue-300">View all purchases →</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 text-xs uppercase tracking-wider text-slate-400">Vehicle</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider text-slate-400">Final Offer</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider text-slate-400">Completed</th>
                      <th className="text-left py-2 text-xs uppercase tracking-wider text-slate-400">Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-2">2018 Ford F-150</td>
                      <td className="py-2">$26,900</td>
                      <td className="py-2">Nov 11</td>
                      <td className="py-2">Pickup ($349)</td>
                    </tr>
                    <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                      <td className="py-2">2017 Toyota Corolla</td>
                      <td className="py-2">$9,300</td>
                      <td className="py-2">Nov 10</td>
                      <td className="py-2">Drop-off</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="py-2">2020 Honda CR-V</td>
                      <td className="py-2">$24,750</td>
                      <td className="py-2">Nov 7</td>
                      <td className="py-2">Drop-off</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
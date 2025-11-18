import React, { useState } from 'react';
import { MapLocations } from '../../components/Dashboard/Map';

const OffersHeatmapIntelligence = () => {
  const [activeTab, setActiveTab] = useState('zones');
  const [activeToggle, setActiveToggle] = useState('myRooftop');

  // Sample data - in a real app, this would come from an API
  const dashboardData = {
    // Stats
    totalOffers: 49,
    bookedAppointments: 31,
    bookedAppointmentsPercent: "63%",
    vehiclesPurchased: 28,
    vehiclesPurchasedPercent: "57%",
    avgOfferValue: "$18,420",
    avgProfitPotential: "$2,140",
    topPerformingCategory: "SUVs",
    
    // Postal Zones data
    postalZones: [
      {
        postal: "L1K 3E8",
        offers: 20,
        booked: 14,
        purchased: 5,
        conversion: "25%",
        avgOffer: "$17,300",
        avgProfit: "$2,050",
        topCategory: "SUV",
        status: "hot"
      },
      {
        postal: "M1C 2A7",
        offers: 18,
        booked: 12,
        purchased: 4,
        conversion: "22%",
        avgOffer: "$14,450",
        avgProfit: "$1,680",
        topCategory: "Sedan",
        status: "warm"
      },
      {
        postal: "L7B 3H2",
        offers: 10,
        booked: 4,
        purchased: 1,
        conversion: "10%",
        avgOffer: "$19,900",
        avgProfit: "$1,120",
        topCategory: "Truck",
        status: "cold"
      },
      {
        postal: "K1A 0B1",
        offers: 6,
        booked: 3,
        purchased: 1,
        conversion: "17%",
        avgOffer: "$16,750",
        avgProfit: "$1,430",
        topCategory: "Luxury",
        status: "warm"
      },
      {
        postal: "T3A 1P4",
        offers: 5,
        booked: 3,
        purchased: 1,
        conversion: "20%",
        avgOffer: "$21,100",
        avgProfit: "$2,480",
        topCategory: "Truck",
        status: "hot"
      }
    ],
    
    // Top Vehicles by Category
    vehiclesByCategory: {
      suvs: [
        { year: "2021", model: "Toyota RAV4 XLE", offers: 7, purchased: 4, conversion: "57%", avgOffer: "$24,800", avgProfit: "$2,450" },
        { year: "2020", model: "Honda CR-V EX", offers: 5, purchased: 2, conversion: "40%", avgOffer: "$23,100", avgProfit: "$2,050" }
      ],
      trucks: [
        { year: "2019", model: "Ford F-150 XLT", offers: 5, purchased: 2, conversion: "40%", avgOffer: "$31,900", avgProfit: "$3,150" },
        { year: "2020", model: "RAM 1500 Big Horn", offers: 3, purchased: 1, conversion: "33%", avgOffer: "$34,200", avgProfit: "$3,480" }
      ],
      sedans: [
        { year: "2020", model: "Honda Civic EX", offers: 6, purchased: 3, conversion: "50%", avgOffer: "$17,400", avgProfit: "$1,780" },
        { year: "2019", model: "Toyota Corolla LE", offers: 4, purchased: 2, conversion: "50%", avgOffer: "$15,900", avgProfit: "$1,520" }
      ],
      evs: [
        { year: "2022", model: "Tesla Model 3", offers: 4, purchased: 2, conversion: "50%", avgOffer: "$39,500", avgProfit: "$3,600" },
        { year: "2021", model: "Nissan Leaf SV", offers: 2, purchased: 1, conversion: "50%", avgOffer: "$22,800", avgProfit: "$2,050" }
      ],
      luxury: [
        { year: "2018", model: "BMW 3 Series 330i", offers: 3, purchased: 1, conversion: "33%", avgOffer: "$27,800", avgProfit: "$2,200" },
        { year: "2019", model: "Audi Q5 Progressiv", offers: 2, purchased: 1, conversion: "50%", avgOffer: "$32,400", avgProfit: "$2,900" }
      ]
    },
    
    // Network data
    networkData: [
      {
        postal: "L1K · Durham Region",
        tag: "SUV Volume Zone",
        offers: 81,
        avgOffer: "$18,220",
        topCategory: "SUVs",
        conversion: "21%",
        insight: "Great for family SUV acquisition. Dealers with reconditioning capacity perform best here."
      },
      {
        postal: "M1C · Scarborough",
        tag: "Sedan Volume Zone",
        offers: 65,
        avgOffer: "$14,350",
        topCategory: "Sedans",
        conversion: "13%",
        insight: "Best for rooftops comfortable with quick-turn commuter vehicles and price-sensitive buyers."
      },
      {
        postal: "T3A · Calgary NW",
        tag: "Truck Power Zone",
        offers: 42,
        avgOffer: "$21,700",
        topCategory: "Trucks",
        conversion: "29%",
        insight: "Strong truck margins. Ideal for rooftops looking to stock higher-ticket domestic trucks."
      },
      {
        postal: "V5N · Vancouver",
        tag: "EV Cluster",
        offers: 37,
        avgOffer: "$19,800",
        topCategory: "EVs",
        conversion: "26%",
        insight: "Strong for rooftops with EV infrastructure. Consider EV-specific campaigns targeted to this zone."
      },
      {
        postal: "K1A · Ottawa",
        tag: "Balanced Market",
        offers: 33,
        avgOffer: "$13,900",
        topCategory: "Mixed categories",
        conversion: "18%",
        insight: "Healthy, steady zone. Great for rooftops wanting consistent private-seller inflow without heavy specialization."
      }
    ]
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'hot':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-900/20 text-green-300 border border-green-800/30">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1"></span>
            Hot
          </span>
        );
      case 'warm':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-900/20 text-yellow-300 border border-yellow-800/30">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1"></span>
            Warm
          </span>
        );
      case 'cold':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-900/20 text-red-300 border border-red-800/30">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1"></span>
            Watch
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryTag = (category) => {
    switch(category.toLowerCase()) {
      case 'suv':
        return <span className="cvx-cat-tag suv px-2 py-1 rounded-full text-xs border border-blue-500/50 bg-blue-900/30">SUV</span>;
      case 'truck':
        return <span className="cvx-cat-tag truck px-2 py-1 rounded-full text-xs border border-yellow-500/50 bg-yellow-900/30">Truck</span>;
      case 'sedan':
        return <span className="cvx-cat-tag sedan px-2 py-1 rounded-full text-xs border border-gray-500/50 bg-gray-900/30">Sedan</span>;
      case 'ev':
        return <span className="cvx-cat-tag ev px-2 py-1 rounded-full text-xs border border-green-500/50 bg-green-900/30">EV</span>;
      case 'luxury':
        return <span className="cvx-cat-tag luxury px-2 py-1 rounded-full text-xs border border-purple-500/50 bg-purple-900/30">Luxury</span>;
      default:
        return <span className="cvx-cat-tag px-2 py-1 rounded-full text-xs border border-gray-500/50 bg-gray-900/30">{category}</span>;
    }
  };

  return (
    <div className="min-h-screen  text-slate-200 p-4 md:p-4 lg:p-0" bgcls="bg-gradient-to-b from-slate-950 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start gap-6 mb-6">
          <div className="max-w-lg">
            <div className="text-xs uppercase tracking-wider text-indigo-300 mb-1">CarValueX Intelligence</div>
            <h1 className="text-2xl font-semibold text-white mb-2">Offers Heatmap & Lead Control Center</h1>
            <p className="text-sm text-slate-400">
              Track every private-seller lead, see where they come from, and focus your ad spend on the zones that actually buy.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
            <div className="flex bg-slate-900 rounded-full p-1 border border-slate-800">
              <button 
                className={`px-3  py-1.5 text-xs rounded-full transition-colors ${
                  activeToggle === 'myRooftop' 
                    ? 'bg-indigo-900/30  text-indigo-100 shadow-inner border border-indigo-700/50' 
                    : 'text-slate-500 cursor-pointer'
                }`}
                onClick={() => setActiveToggle('myRooftop')}
              >
                My Rooftop
              </button>
              <button 
                className={`px-3 cursor-pointer py-1.5 text-xs rounded-full transition-colors ${
                  activeToggle === 'carValueXNetwork' 
                    ? 'bg-indigo-900/30 text-indigo-100 shadow-inner border border-indigo-700/50' 
                    : 'text-slate-500 cursor-pointer'
                }`}
                onClick={() => setActiveToggle('carValueXNetwork')}
              >
                CarValueX Network
              </button>
            </div>

            <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
              <select className="bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Month: Nov 2025</option>
              </select>
              <select className="bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Province: All</option>
              </select>
              <select className="bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Radius: 25 km</option>
              </select>
              <select className="bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Category: All Vehicles</option>
              </select>
            </div>
          </div>
        </div>

        {/* Map Module */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-slate-800 bg-gradient-to-r from-indigo-900/20 to-slate-900">
            <div>
              <h2 className="text-sm font-medium text-white">Live Offers Around Your Rooftop</h2>
              <p className="text-xs text-slate-400 mt-1">
                Pins represent real sellers who started or completed a CarValueX offer.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-3 sm:mt-0 bg-slate-800/70 border border-slate-700 rounded-full px-3 py-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              49 offers · 28 purchased · 57% conversion
            </div>
          </div>
          <MapLocations title={false} />
          {/* <div className="w-full h-80 bg-slate-950 relative">
           
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-slate-600 text-lg mb-2">Map Integration Area</div>
                <div className="text-slate-500 text-sm">Google Maps or similar would be integrated here</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-400">
              Tip: Zoom into a hot zone and click a pin to see the vehicle and seller details.
            </div>
          </div> */}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
          {/* Total Offers */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-3 relative overflow-hidden">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Total Offers</div>
            <div className="text-lg font-semibold text-white">{dashboardData.totalOffers}</div>
            <div className="text-xs text-slate-500 mt-1">Last 30 days · all channels</div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-green-900/20 text-green-300 text-xs px-2 py-1 rounded-full border border-green-800/30">
              <span>▲</span> 12% vs. prior 30 days
            </div>
          </div>

          {/* Booked Appointments */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-3 relative overflow-hidden">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Booked Appointments</div>
            <div className="flex items-baseline gap-1">
              <div className="text-lg font-semibold text-white">{dashboardData.bookedAppointments}</div>
              <div className="text-xs text-slate-500">({dashboardData.bookedAppointmentsPercent})</div>
            </div>
            <div className="text-xs text-slate-500 mt-1">Offers that selected a date & time</div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-green-900/20 text-green-300 text-xs px-2 py-1 rounded-full border border-green-800/30">
              <span>▲</span> 8% this month
            </div>
          </div>

          {/* Vehicles Purchased */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-3 relative overflow-hidden">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Vehicles Purchased</div>
            <div className="flex items-baseline gap-1">
              <div className="text-lg font-semibold text-white">{dashboardData.vehiclesPurchased}</div>
              <div className="text-xs text-slate-500">({dashboardData.vehiclesPurchasedPercent})</div>
            </div>
            <div className="text-xs text-slate-500 mt-1">Marked as purchased in your dashboard</div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-green-900/20 text-green-300 text-xs px-2 py-1 rounded-full border border-green-800/30">
              <span>▲</span> 19% close rate
            </div>
          </div>

          {/* Avg Offer Value */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-3 relative overflow-hidden">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Avg Offer Value</div>
            <div className="text-lg font-semibold text-white">{dashboardData.avgOfferValue}</div>
            <div className="text-xs text-slate-500 mt-1">Before your dealer profit settings</div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-red-900/20 text-red-300 text-xs px-2 py-1 rounded-full border border-red-800/30">
              <span>▼</span> 3% vs. last month
            </div>
          </div>

          {/* Avg Profit Potential */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-3 relative overflow-hidden">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Avg Profit Potential</div>
            <div className="text-lg font-semibold text-white">{dashboardData.avgProfitPotential}</div>
            <div className="text-xs text-slate-500 mt-1">After your EV / Luxury / Economy margins</div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-green-900/20 text-green-300 text-xs px-2 py-1 rounded-full border border-green-800/30">
              <span>▲</span> 6% higher spread
            </div>
          </div>

          {/* Top Performing Category */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-lg p-3 relative overflow-hidden">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Top Performing Category</div>
            <div className="text-lg font-semibold text-white">{dashboardData.topPerformingCategory}</div>
            <div className="text-xs text-slate-500 mt-1">41% of purchased vehicles this month</div>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tabbed Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Your Market Performance</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Switch between your strongest zones and top vehicles by category.
                </p>
              </div>
              <div className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-1 rounded-full">
                Last 30 days
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-950 rounded-full p-1 border border-slate-800 w-fit mb-4">
              <button 
                className={`px-4 py-1.5 text-xs rounded-full transition-colors ${
                  activeTab === 'zones' 
                    ? 'bg-indigo-900/30 text-indigo-100 shadow-inner border border-indigo-700/50' 
                    : 'text-slate-500 cursor-pointer'
                }`}
                onClick={() => setActiveTab('zones')}
              >
                Top Postal Zones
              </button>
              <button 
                className={`px-4 py-1.5 text-xs rounded-full transition-colors ${
                  activeTab === 'vehicles' 
                    ? 'bg-indigo-900/30 text-indigo-100 shadow-inner border border-indigo-700/50' 
                    : 'text-slate-500 cursor-pointer'
                }`}
                onClick={() => setActiveTab('vehicles')}
              >
                Top Vehicles by Category
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'zones' && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-2 text-slate-400 font-medium">Postal</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Offers</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Booked</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Purchased</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Conv %</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Avg Offer</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Avg Profit</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Top Category</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Zone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.postalZones.map((zone, index) => (
                      <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="py-2 font-medium">{zone.postal}</td>
                        <td className="py-2">{zone.offers}</td>
                        <td className="py-2">{zone.booked}</td>
                        <td className="py-2">{zone.purchased}</td>
                        <td className="py-2">{zone.conversion}</td>
                        <td className="py-2">{zone.avgOffer}</td>
                        <td className="py-2">{zone.avgProfit}</td>
                        <td className="py-2">{getCategoryTag(zone.topCategory)}</td>
                        <td className="py-2">{getStatusBadge(zone.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'vehicles' && (
              <div className="space-y-4">
                {/* SUVs */}
                <div className="border-b border-dashed border-slate-800 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs uppercase tracking-wider text-slate-400">SUVs</div>
                    <div className="text-xs text-slate-500">41% of purchased units</div>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left py-1 text-slate-400 font-medium">Vehicle</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Offers</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Purchased</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Conv %</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Offer</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.vehiclesByCategory.suvs.map((vehicle, index) => (
                        <tr key={index} className="hover:bg-slate-800/30">
                          <td className="py-1">
                            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-full px-2 py-1 w-fit">
                              <span className="text-indigo-300 text-xs">{vehicle.year}</span>
                              <span>{vehicle.model}</span>
                            </div>
                          </td>
                          <td className="py-1">{vehicle.offers}</td>
                          <td className="py-1">{vehicle.purchased}</td>
                          <td className="py-1">{vehicle.conversion}</td>
                          <td className="py-1">{vehicle.avgOffer}</td>
                          <td className="py-1">{vehicle.avgProfit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Trucks */}
                <div className="border-b border-dashed border-slate-800 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs uppercase tracking-wider text-slate-400">Trucks</div>
                    <div className="text-xs text-slate-500">High profit spread</div>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left py-1 text-slate-400 font-medium">Vehicle</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Offers</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Purchased</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Conv %</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Offer</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.vehiclesByCategory.trucks.map((vehicle, index) => (
                        <tr key={index} className="hover:bg-slate-800/30">
                          <td className="py-1">
                            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-full px-2 py-1 w-fit">
                              <span className="text-indigo-300 text-xs">{vehicle.year}</span>
                              <span>{vehicle.model}</span>
                            </div>
                          </td>
                          <td className="py-1">{vehicle.offers}</td>
                          <td className="py-1">{vehicle.purchased}</td>
                          <td className="py-1">{vehicle.conversion}</td>
                          <td className="py-1">{vehicle.avgOffer}</td>
                          <td className="py-1">{vehicle.avgProfit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Sedans */}
                <div className="border-b border-dashed border-slate-800 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs uppercase tracking-wider text-slate-400">Sedans</div>
                    <div className="text-xs text-slate-500">Volume commuter units</div>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left py-1 text-slate-400 font-medium">Vehicle</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Offers</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Purchased</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Conv %</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Offer</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.vehiclesByCategory.sedans.map((vehicle, index) => (
                        <tr key={index} className="hover:bg-slate-800/30">
                          <td className="py-1">
                            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-full px-2 py-1 w-fit">
                              <span className="text-indigo-300 text-xs">{vehicle.year}</span>
                              <span>{vehicle.model}</span>
                            </div>
                          </td>
                          <td className="py-1">{vehicle.offers}</td>
                          <td className="py-1">{vehicle.purchased}</td>
                          <td className="py-1">{vehicle.conversion}</td>
                          <td className="py-1">{vehicle.avgOffer}</td>
                          <td className="py-1">{vehicle.avgProfit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* EVs */}
                <div className="border-b border-dashed border-slate-800 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs uppercase tracking-wider text-slate-400">EVs</div>
                    <div className="text-xs text-slate-500">Emerging high-intent sellers</div>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left py-1 text-slate-400 font-medium">Vehicle</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Offers</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Purchased</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Conv %</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Offer</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.vehiclesByCategory.evs.map((vehicle, index) => (
                        <tr key={index} className="hover:bg-slate-800/30">
                          <td className="py-1">
                            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-full px-2 py-1 w-fit">
                              <span className="text-indigo-300 text-xs">{vehicle.year}</span>
                              <span>{vehicle.model}</span>
                            </div>
                          </td>
                          <td className="py-1">{vehicle.offers}</td>
                          <td className="py-1">{vehicle.purchased}</td>
                          <td className="py-1">{vehicle.conversion}</td>
                          <td className="py-1">{vehicle.avgOffer}</td>
                          <td className="py-1">{vehicle.avgProfit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Luxury */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs uppercase tracking-wider text-slate-400">Luxury</div>
                    <div className="text-xs text-slate-500">Lower volume, strong margin</div>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left py-1 text-slate-400 font-medium">Vehicle</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Offers</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Purchased</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Conv %</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Offer</th>
                        <th className="text-left py-1 text-slate-400 font-medium">Avg Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.vehiclesByCategory.luxury.map((vehicle, index) => (
                        <tr key={index} className="hover:bg-slate-800/30">
                          <td className="py-1">
                            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-full px-2 py-1 w-fit">
                              <span className="text-indigo-300 text-xs">{vehicle.year}</span>
                              <span>{vehicle.model}</span>
                            </div>
                          </td>
                          <td className="py-1">{vehicle.offers}</td>
                          <td className="py-1">{vehicle.purchased}</td>
                          <td className="py-1">{vehicle.conversion}</td>
                          <td className="py-1">{vehicle.avgOffer}</td>
                          <td className="py-1">{vehicle.avgProfit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Network Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Top Postal Codes by CarValueX</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Live network-wide seller activity. See where private sellers are most active across the CarValueX network.
                </p>
              </div>
              <div className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-1 rounded-full">
                Network View · Real time
              </div>
            </div>

            <div className="space-y-3">
              {dashboardData.networkData.map((network, index) => (
                <div key={index} className=" border-slate-800 rounded-lg p-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 mb-1">
                    <div className="text-sm font-semibold text-white">{network.postal}</div>
                    <div className="text-xs bg-indigo-900/30 border border-indigo-700/50 text-indigo-200 px-2 py-1 rounded-full">
                      {network.tag}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 mb-2">
                    {network.offers} offers · Avg offer {network.avgOffer} · Top category: {network.topCategory} · {network.conversion} conversion
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-indigo-300">Insight:</span> {network.insight}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-slate-800 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-slate-300">CarValueX Network Movers:</strong>
                <span className="bg-blue-900/40 border border-blue-700/50 text-blue-200 px-2 py-1 rounded-full">Toyota · 14%</span>
                <span className="bg-blue-900/40 border border-blue-700/50 text-blue-200 px-2 py-1 rounded-full">Honda · 12%</span>
                <span className="bg-blue-900/40 border border-blue-700/50 text-blue-200 px-2 py-1 rounded-full">Ford · 11%</span>
                <span className="bg-blue-900/40 border border-blue-700/50 text-blue-200 px-2 py-1 rounded-full">Hyundai · 8%</span>
                <span className="bg-blue-900/40 border border-blue-700/50 text-blue-200 px-2 py-1 rounded-full">BMW · 6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersHeatmapIntelligence;
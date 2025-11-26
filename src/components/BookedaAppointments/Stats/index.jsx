import React from "react";

export const StatsCards = ({ stats }) => {
  const cards = [
    {
      label: "Appointments Today",
      icon: "📍",
      value: stats?.today || 0,
      sub: "Sellers dropping off at rooftop today"
    },
    {
      label: "Appointments This Week",
      icon: "🗓",
      value: stats?.thisWeek || 0,
      sub: "Monday – Sunday window"
    },
    {
      label: "Appointments This Month",
      icon: "📅",
      value: stats?.thisMonth || 0,
      sub: "All scheduled dealership drop-offs"
    },
    {
      label: "Completion Rate (Month)",
      icon: "✔",
      value: `${stats?.completionRate || 0}%`,
      sub: "Completed vs total appointments"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-gray-800 to-gray-900 
          border border-gray-700 rounded-2xl p-5 
          relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-20 h-20 
            bg-gradient-to-br from-white/5 to-transparent 
            rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="flex justify-between items-start mb-3 relative z-10">
            <div className="text-sm font-medium text-gray-400">{card.label}</div>
            <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm">
              {card.icon}
            </div>
          </div>

          <div className="text-2xl font-semibold text-white mb-1 relative z-10">
            {card.value}
          </div>

          <div className="text-xs text-gray-400 relative z-10">{card.sub}</div>
        </div>
      ))}
    </div>
  );
};

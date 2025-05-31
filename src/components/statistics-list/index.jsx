import React from "react";

function StatisticsList({ title, count, children }) {
  return (
    <div className="w-full px-4 py-3 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex item-center gap-3 text-sm font-medium text-gray-500 truncate">
          {children}
          <span>{title}</span>
        </div>
        <span className="mt-1 text-xl font-semibold text-gray-700">
        {new Intl.NumberFormat("fa-IR").format(count)}
        </span>
      </div>
    </div>
  );
}

export default StatisticsList;

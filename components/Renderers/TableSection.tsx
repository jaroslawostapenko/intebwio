import React from 'react';
import { DataTableSection } from '../../types';

export const TableSection: React.FC<{ data: DataTableSection }> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        {data.title && <h2 className="text-xl font-bold text-gray-900">{data.title}</h2>}
        {data.source && <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Source: {data.source}</span>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              {data.headers.map((header, i) => (
                <th key={i} className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.rows.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="p-4 text-sm text-gray-700 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
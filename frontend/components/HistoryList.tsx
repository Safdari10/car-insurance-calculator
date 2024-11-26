import React from 'react';
import { CalculationHistory } from '../types/car';
import { Clock, AlertCircle } from 'lucide-react';

interface HistoryListProps {
  history: CalculationHistory[];
}

export function HistoryList({ history }: HistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Clock size={20} />
        Recent Calculations
      </h2>
      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm 
                     hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{item.model}</h3>
                <p className="text-sm text-gray-500">Year: {item.year}</p>
                {item.riskRating && (
                  <p className="text-sm text-gray-500">Risk Rating: {item.riskRating}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-blue-600">
                  ${item.value.toLocaleString()}
                </p>
                {item.monthlyPremium && (
                  <p className="text-sm text-gray-600">
                    Monthly Premium: ${item.monthlyPremium}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
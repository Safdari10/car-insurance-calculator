import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ResultDisplayProps {
  value?: number;
  error?: string;
}

export function ResultDisplay({ value, error }: ResultDisplayProps) {
  if (!value && !error) return null;

  return (
    <div className="w-full max-w-md mt-8">
      {value !== undefined && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500" size={24} />
            <h2 className="text-xl font-semibold text-green-900">Results</h2>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-green-700">Estimated Car Value</p>
              <p className="text-3xl font-bold text-green-700">
                ${value.toLocaleString()}
              </p>
            </div>
            <div className="pt-4 border-t border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-blue-500" />
                <p className="text-sm text-blue-700">Note: Using placeholder API data</p>
              </div>
              <p className="text-xs text-gray-600">
                The actual values will be calculated when the APIs are implemented.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-500" size={24} />
            <h2 className="text-xl font-semibold text-red-900">Error</h2>
          </div>
          <p className="mt-2 text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}
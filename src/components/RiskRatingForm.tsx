import React, { useState } from 'react';
import { ChevronRight, FileText } from 'lucide-react';

interface RiskRatingFormProps {
  onSubmit: (claimHistory: string) => void;
  isLoading?: boolean;
}

const RiskRatingForm: React.FC<RiskRatingFormProps> = ({ onSubmit, isLoading = false }) => {
  const [claimHistory, setClaimHistory] = useState('');
  const [errors, setErrors] = useState<{ claimHistory?: string }>({});

  const validate = (): boolean => {
    const newErrors: { claimHistory?: string } = {};
    
    if (!claimHistory.trim()) {
      newErrors.claimHistory = 'Claim history is required';
    } else if (claimHistory.trim().length < 10) {
      newErrors.claimHistory = 'Please provide more detail about your claim history';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(claimHistory.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <label htmlFor="claimHistory" className="block text-sm font-medium text-gray-700">
          Claim History
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
          <textarea
            id="claimHistory"
            value={claimHistory}
            onChange={(e) => setClaimHistory(e.target.value)}
            rows={4}
            className={`w-full pl-10 pr-4 py-2 rounded-xl border ${
              errors.claimHistory ? 'border-red-300' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="Describe your claim history in detail..."
          />
        </div>
        {errors.claimHistory && (
          <p className="text-red-500 text-sm">{errors.claimHistory}</p>
        )}
        <p className="text-xs text-gray-500">
          Please include any accidents, claims, or incidents in the last 5 years.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-medium 
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 
                 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            Calculate Risk
            <ChevronRight size={20} />
          </>
        )}
      </button>
    </form>
  );
};

export default RiskRatingForm; 
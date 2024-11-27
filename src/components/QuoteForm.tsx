import React, { useState } from 'react';
import { ChevronRight, DollarSign, Shield } from 'lucide-react';

interface QuoteFormProps {
  onSubmit: (carValue: number, riskRating: number) => void;
  isLoading?: boolean;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit, isLoading = false }) => {
  const [carValue, setCarValue] = useState('');
  const [riskRating, setRiskRating] = useState('');
  const [errors, setErrors] = useState<{ carValue?: string; riskRating?: string }>({});

  const validate = (): boolean => {
    const newErrors: { carValue?: string; riskRating?: string } = {};
    
    const carValueNum = parseFloat(carValue);
    if (!carValue || isNaN(carValueNum) || carValueNum <= 0) {
      newErrors.carValue = 'Please enter a valid car value';
    }

    const riskRatingNum = parseInt(riskRating);
    if (!riskRating || isNaN(riskRatingNum) || riskRatingNum < 1 || riskRatingNum > 5) {
      newErrors.riskRating = 'Risk rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(parseFloat(carValue), parseInt(riskRating));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <label htmlFor="carValue" className="block text-sm font-medium text-gray-700">
          Car Value
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            id="carValue"
            type="number"
            value={carValue}
            onChange={(e) => setCarValue(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              errors.carValue ? 'border-red-300' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="Enter car value"
            min="0"
            step="0.01"
          />
        </div>
        {errors.carValue && <p className="text-red-500 text-sm">{errors.carValue}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="riskRating" className="block text-sm font-medium text-gray-700">
          Risk Rating (1-5)
        </label>
        <div className="relative">
          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            id="riskRating"
            type="number"
            value={riskRating}
            onChange={(e) => setRiskRating(e.target.value)}
            min="1"
            max="5"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              errors.riskRating ? 'border-red-300' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="Enter risk rating (1-5)"
          />
        </div>
        {errors.riskRating && <p className="text-red-500 text-sm">{errors.riskRating}</p>}
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
            Get Quote
            <ChevronRight size={20} />
          </>
        )}
      </button>
    </form>
  );
};

export default QuoteForm;
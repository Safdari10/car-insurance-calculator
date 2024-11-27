import React from 'react';
import { CarValueRequest } from '../types/car';
import { ChevronRight, Car } from 'lucide-react';

interface CarFormProps {
  onSubmit: (data: CarValueRequest) => void;
  isLoading: boolean;
  onClear: () => void;
}

export function CarForm({ onSubmit, isLoading, onClear }: CarFormProps) {
  const currentYear = new Date().getFullYear();
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [errors, setErrors] = React.useState<{ model?: string; year?: string }>({});

  const validate = (): boolean => {
    const newErrors: { model?: string; year?: string } = {};
    
    if (!model.trim()) {
      newErrors.model = 'Car model is required';
    }

    const yearNum = parseInt(year);
    if (!year || isNaN(yearNum)) {
      newErrors.year = 'Please enter a valid year';
    } else if (yearNum < 1886 || yearNum > currentYear) {
      newErrors.year = `Year must be between 1886 and ${currentYear}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ model: model.trim(), year: parseInt(year) });
    }
  };

  const handleClear = () => {
    setModel('');
    setYear('');
    setErrors({});
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
          Car Model
        </label>
        <div className="relative">
          <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
              errors.model ? 'border-red-300' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="Enter car model"
          />
        </div>
        {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="1886"
          max={currentYear}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.year ? 'border-red-300' : 'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
          placeholder={`1886 - ${currentYear}`}
        />
        {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium 
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 
                   disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Calculate Value
              <ChevronRight size={20} />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 
                   hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 
                   focus:ring-offset-2 transition-all duration-200"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
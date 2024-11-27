import React from 'react';
import { CarForm } from './components/CarForm';
import { ResultDisplay } from './components/ResultDisplay';
import { HistoryList } from './components/HistoryList';
import { CarValueRequest, CalculationHistory } from './types/car';
import { Car } from 'lucide-react';
import { calculateCarValue, calculateRiskRating, calculateQuote } from './services/api';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<number>();
  const [error, setError] = React.useState<string>();
  const [history, setHistory] = React.useState<CalculationHistory[]>([]);

  const calculateValue = async (data: CarValueRequest) => {
    setIsLoading(true);
    setError(undefined);
    setResult(undefined);

    try {
      // Step 1: Calculate car value
      const carValueResponse = await calculateCarValue(data);
      
      // Step 2: Calculate risk rating (using a default claim history for demo)
      const riskRatingResponse = await calculateRiskRating(
        "Sample claim history for demonstration"
      );
      
      // Step 3: Calculate quote
      const quoteResponse = await calculateQuote(
        carValueResponse.car_value,
        riskRatingResponse.risk_rating
      );
      
      setResult(carValueResponse.car_value);
      
      // Add to history with all calculated values
      const historyItem: CalculationHistory = {
        id: crypto.randomUUID(),
        model: data.model,
        year: data.year,
        value: carValueResponse.car_value,
        riskRating: riskRatingResponse.risk_rating,
        monthlyPremium: quoteResponse.monthly_premium,
        yearlyPremium: quoteResponse.yearly_premium,
        timestamp: new Date(),
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 4)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResult(undefined);
    setError(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 
                          rounded-full mb-4 shadow-lg">
              <Car className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Car Insurance Calculator
            </h1>
            <p className="text-gray-600 text-lg">
              Get an instant estimate for your car insurance
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col items-center">
              <CarForm
                onSubmit={calculateValue}
                isLoading={isLoading}
                onClear={handleClear}
              />
              <ResultDisplay value={result} error={error} />
            </div>
          </div>

          <HistoryList history={history} />
        </div>
      </div>
    </div>
  );
}

export default App;
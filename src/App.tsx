import React, { useState } from 'react';
import CarValueForm from './components/CarValueForm';
import RiskRatingForm from './components/RiskRatingForm';
import QuoteForm from './components/QuoteForm';
import './App.css';
import { calculateCarValue, calculateRiskRating, calculateQuote } from './services/api';

interface Quote {
  monthly_premium: number;
  yearly_premium: number;
}

function App() {
  const [carValue, setCarValue] = useState<number | null>(null);
  const [riskRating, setRiskRating] = useState<number | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCarValue = async (model: string, year: number) => {
    try {
      setError(null);
      const response = await calculateCarValue({ model, year });
      setCarValue(response.car_value);
    } catch (err) {
      setError('Failed to calculate car value');
      console.error(err);
    }
  };

  const handleRiskRating = async (claimHistory: string) => {
    try {
      setError(null);
      const response = await calculateRiskRating(claimHistory);
      setRiskRating(response.risk_rating);
    } catch (err) {
      setError('Failed to calculate risk rating');
      console.error(err);
    }
  };

  const handleQuote = async (carValue: number, riskRating: number) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await calculateQuote(carValue, riskRating);
      setQuote(response);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setQuote(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Car Insurance Calculator</h1>
      
      <div className="calculators">
        <div className="calculator">
          <CarValueForm onSubmit={handleCarValue} />
          {carValue && (
            <div className="result">Car Value: ${carValue}</div>
          )}
        </div>

        <div className="calculator">
          <RiskRatingForm onSubmit={handleRiskRating} />
          {riskRating && (
            <div className="result">Risk Rating: {riskRating}</div>
          )}
        </div>

        <div className="calculator">
          <QuoteForm onSubmit={handleQuote} isLoading={isLoading} />
          {quote && (
            <div className="result">
              <div>Monthly Premium: ${quote.monthly_premium}</div>
              <div>Yearly Premium: ${quote.yearly_premium}</div>
            </div>
          )}
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
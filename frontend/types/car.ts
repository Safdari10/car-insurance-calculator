export interface CarValueRequest {
    model: string;
    year: number;
  }
  
  export interface CarValueResponse {
    car_value: number;
  }
  
  export interface ErrorResponse {
    error: string;
  }
  
  export interface CalculationHistory {
    id: string;
    model: string;
    year: number;
    value: number;
    riskRating?: number;
    monthlyPremium?: number;
    yearlyPremium?: number;
    timestamp: Date;
  }
  
  export interface RiskRatingRequest {
    claim_history: string;
  }
  
  export interface RiskRatingResponse {
    risk_rating: number;
  }
  
  export interface QuoteRequest {
    car_value: number;
    risk_rating: number;
  }
  
  export interface QuoteResponse {
    monthly_premium: number;
    yearly_premium: number;
  }
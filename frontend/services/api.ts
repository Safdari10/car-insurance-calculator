import { CarValueRequest, CarValueResponse, ErrorResponse } from '../types/car';

// Helper to simulate API delay
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 800));

// API 1: Calculate Car Value
export async function calculateCarValue(data: CarValueRequest): Promise<CarValueResponse> {
  await simulateDelay();
  
  try {
    // Validate input
    if (!data.model || !data.year) {
      throw new Error('Invalid input: Model and year are required');
    }

    // Calculate value based on alphabet positions
    const value = data.model
      .toLowerCase()
      .split('')
      .filter(char => /[a-z]/.test(char))
      .reduce((sum, char) => sum + (char.charCodeAt(0) - 96), 0) * 100 + data.year;

    return { car_value: value };
  } catch (error) {
    throw new Error('Failed to calculate car value');
  }
}

// API 2: Calculate Risk Rating
export async function calculateRiskRating(claimHistory: string): Promise<{ risk_rating: number }> {
  await simulateDelay();

  try {
    if (!claimHistory) {
      throw new Error('Invalid input: Claim history is required');
    }

    const keywords = ['collide', 'crash', 'scratch', 'bump', 'smash'];
    const text = claimHistory.toLowerCase();
    
    let rating = keywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'g');
      return count + (text.match(regex)?.length || 0);
    }, 0);

    // Ensure rating is between 1 and 5
    rating = Math.max(1, Math.min(5, rating));

    return { risk_rating: rating };
  } catch (error) {
    throw new Error('Failed to calculate risk rating');
  }
}

// API 3: Calculate Insurance Quote
export async function calculateQuote(
  carValue: number,
  riskRating: number
): Promise<{ monthly_premium: number; yearly_premium: number }> {
  await simulateDelay();

  try {
    if (carValue <= 0 || riskRating < 1 || riskRating > 5) {
      throw new Error('Invalid input: Car value must be positive and risk rating must be between 1 and 5');
    }

    const yearlyPremium = (carValue * riskRating) / 100;
    const monthlyPremium = yearlyPremium / 12;

    return {
      monthly_premium: Number(monthlyPremium.toFixed(2)),
      yearly_premium: Number(yearlyPremium.toFixed(2)),
    };
  } catch (error) {
    throw new Error('Failed to calculate insurance quote');
  }
}
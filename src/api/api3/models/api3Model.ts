export const calculatePremiums = (car_value: number, risk_rating: number) => {
  if (typeof car_value !== "number" || typeof risk_rating !== "number") {
    throw new Error("Invalid input");
  }

  if (car_value <= 0) {
    throw new Error("Car value must be a positive number");
  }

  if (risk_rating < 1 || risk_rating > 5) {
    throw new Error("Risk Rating is invalid");
  }

  const yearly_premium = (car_value * risk_rating) / 100;
  const monthly_premium = yearly_premium / 12;

  return {
    yearly_premium,
    monthly_premium,
  };
};

export const calculatePremiums = (car_value: number, risk_rating: number) => {
  const yearly_premium = (car_value * risk_rating) / 100;
  const monthly_premium = yearly_premium / 12;

  return {
      yearly_premium,
      monthly_premium
  };
}

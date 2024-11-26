export const calculatePremiums = (carValue: number, riskRating: number) => {
  const yearly_premium = (carValue * riskRating) / 100;
  const monthly_premium = yearly_premium / 12;

  return {
    yearly_premium: Number(yearly_premium.toFixed(2)),
    monthly_premium: Number(monthly_premium.toFixed(2)),
  };
};

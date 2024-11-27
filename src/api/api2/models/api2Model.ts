export const calculateRiskRating = (claimHistory: string | null): { risk_rating?: number; error?: string } => {
  if (!claimHistory || typeof claimHistory !== 'string' || claimHistory.trim() === '') {
    return { error: "there is an error" };
  }

  const keywords = ["collide", "crash", "scratch", "bump", "smash"];
  const lowerCaseHistory = claimHistory.toLowerCase();

  const riskRating = keywords.reduce((count, keyword) => {
    return count + (lowerCaseHistory.split(keyword).length - 1);
  }, 0);

  return { risk_rating: Math.min(riskRating, 5) };
};

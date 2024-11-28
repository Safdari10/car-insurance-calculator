export const validateQuote = (car_value: (number | undefined), risk_rating: number | undefined) => {

    if (!car_value || !risk_rating) {
      return { error: "Car Value and Risk Rating are required" };
    }
  
   // Sanitize inputs by removing commas for numeric parsing
    const sanitizedCarValue = car_value.toString().replace(/,/g, "");
    const sanitizedRiskRating = risk_rating.toString().replace(/,/g, "");
  
   
    const carValue = parseInt(sanitizedCarValue, 10);
    const riskRating = parseInt(sanitizedRiskRating, 10);
  
    // Risk rating must be between 1 and 5 (inclusive)
    if (isNaN(riskRating) || riskRating < 1 || riskRating > 5) {
      return { error: "Risk Rating must be a number between 1 and 5" };
    }
  
  
    if (isNaN(carValue) || carValue <= 0) {
      return { error: "Car Value must be a positive number" };
    }
  
    return { carValue, riskRating };
  };
  
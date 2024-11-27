import request from 'supertest';
import app from './api2';

describe('Risk Rating API Tests', () => {
  test('Valid input', async () => {
    const response = await request(app)
      .post('/api2/risk-rating')
      .send({ claim_history: "A crash and a scratch." });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ risk_rating: 2 });
  });

  test('Invalid input - empty string', async () => {
    const response = await request(app)
      .post('/api2/risk-rating')
      .send({ claim_history: "" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ error: "there is an error" });
  });

  test('Risk rating exceeds maximum limit', async () => {
    const response = await request(app)
      .post('/api2/risk-rating')
      .send({
        claim_history:
          "A crash, a bump, another crash, a scratch, a smash, and yet another bump!",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ risk_rating: 5 }); 
  });
});

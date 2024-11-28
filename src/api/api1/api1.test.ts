import request from 'supertest';
import app from './app';

describe('Car Value API Tests', () => {
    it('should return 6620 for model "Civic" and year 2020', async () => {
        const response = await request(app)
            .post('/car-value')
            .send({ model: "Civic", year: 2020 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ car_value: 6620 });
    });

    it('should return 2920 for model "911" and year 2020', async () => {
        const response = await request(app)
            .post('/car-value')
            .send({ model: "911", year: 2020 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ car_value: 2020 });
    });

    it('should return an error for negative year', async () => {
        const response = await request(app)
            .post('/car-value')
            .send({ model: "Task-Force", year: -987 });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Invalid year" });
    });

    it('should return an error for non-numeric year', async () => {
        const response = await request(app)
            .post('/car-value')
            .send({ model: "C200", year: "twenty twenty" });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Year must be an integer" });
    });

    it('should return an error for empty model', async () => {
        const response = await request(app)
            .post('/car-value')
            .send({ model: "", year: 2020 });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Model name is required" });
    });

    it('should return an error for model with special characters', async () => {
        const response = await request(app)
            .post('/car-value')
            .send({ model: "Civic@#$%", year: 2020 });
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('should return an error for year before 1886', async () => {
        const response = await request(app)
            .post('/car-value')
            .send({ model: "Civic", year: 1885 });
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('should accept model names with hyphens and numbers', async () => {
        const response = await request(app)
            .post('/car-value')
            .send({ model: "RS-7", year: 2020 });
        expect(response.status).toBe(200);
        expect(response.body.car_value).toBeDefined();
    });
});

describe('CORS and API Accessibility Tests', () => {
  it('should allow CORS preflight requests', async () => {
    const response = await request(app)
      .options('/car-value')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'Content-Type');

    expect(response.headers['access-control-allow-origin']).toBeTruthy();
    expect(response.headers['access-control-allow-methods']).toBeTruthy();
    expect(response.status).toBe(204);
  });

  it('should accept JSON content type', async () => {
    const response = await request(app)
      .post('/car-value')
      .set('Content-Type', 'application/json')
      .send({ model: "Civic", year: 2020 });

    expect(response.status).toBe(200);
  });
});

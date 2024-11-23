import request from 'supertest';
import app from './app';

describe('Car Value API Tests', () => {
    it('should return 6620 for model "Civic" and year 2020', async () => {
        const response = await request(app)
            .post('/api/v1/car-value')
            .send({ model: "Civic", year: 2020 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ car_value: 6620 });
    });

    it('should return 2920 for model "911" and year 2020', async () => {
        const response = await request(app)
            .post('/api/v1/car-value')
            .send({ model: "911", year: 2020 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ car_value: 2920 });
    });

    it('should return an error for negative year', async () => {
        const response = await request(app)
            .post('/api/v1/car-value')
            .send({ model: "Task-Force", year: -987 });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "there is an error" });
    });

    it('should return an error for non-numeric year', async () => {
        const response = await request(app)
            .post('/api/v1/car-value')
            .send({ model: "C200", year: "twenty twenty" });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "there is an error" });
    });

    it('should return an error for empty model', async () => {
        const response = await request(app)
            .post('/api/v1/car-value')
            .send({ model: "", year: 2020 });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "there is an error" });
    });
});

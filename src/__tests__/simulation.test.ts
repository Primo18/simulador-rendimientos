import request from 'supertest';
import createTestServer from './testServer.js';

const app = createTestServer();

describe('Simulation API', () => {
    it('should simulate earnings correctly', async () => {
        const response = await request(app).post('/api/simulation/simulate').send({
            bankId: 1,
            principal: 1000,
            years: 5,
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('earnings');
        expect(response.body).toHaveProperty('finalAmount');
    });

    it('should return 400 for missing required fields', async () => {
        const response = await request(app).post('/api/simulation/simulate').send({
            principal: 1000,
        });
        expect(response.status).toBe(400);
    });
});

import request from 'supertest';
import createTestServer from './testServer.js';

const app = createTestServer();

describe('Banks API - Validation', () => {
    it('should return 400 for missing required fields', async () => {
        const response = await request(app).post('/api/banks').send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

    it('should return 404 for a non-existent bank', async () => {
        const response = await request(app).get('/api/banks/99999');
        expect(response.status).toBe(404);
    });

    it('should return 400 for invalid input types', async () => {
        const response = await request(app).post('/api/banks').send({
            name: 123, // Invalid type
            address: '123 Test Street',
            contact: 'test@test.com',
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });
});

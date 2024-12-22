import request from 'supertest';
import createTestServer from './testServer.js';

const app = createTestServer();

describe('Banks API - CRUD Operations', () => {
    let createdBankId: number;

    it('should create a new bank', async () => {
        const newBank = {
            name: 'Test Bank',
            address: '123 Test Avenue',
            contact: 'contact@testbank.com',
        };
        const response = await request(app).post('/api/banks').send(newBank);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newBank.name);
        createdBankId = response.body.id;
    });

    it('should retrieve all banks', async () => {
        const response = await request(app).get('/api/banks');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should retrieve a specific bank by ID', async () => {
        const response = await request(app).get(`/api/banks/${createdBankId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(createdBankId);
    });

    it('should update a bank by ID', async () => {
        const updatedData = { name: 'Updated Test Bank' };
        const response = await request(app).put(`/api/banks/${createdBankId}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
    });

    it('should delete a bank by ID', async () => {
        const response = await request(app).delete(`/api/banks/${createdBankId}`);
        expect(response.status).toBe(204);
    });

    it('should return 404 when retrieving a non-existent bank', async () => {
        const response = await request(app).get(`/api/banks/${createdBankId}`);
        expect(response.status).toBe(404);
    });
});

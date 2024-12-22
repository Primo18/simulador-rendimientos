import request from 'supertest';
import createTestServer from './testServer.js';

const app = createTestServer();
let token: string;

describe('Authentication and Authorization', () => {
    it('should login successfully and return a token', async () => {
        const response = await request(app).post('/api/users/login').send({
            username: 'admin',
            password: 'password123',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    it('should reject unauthorized access to protected routes', async () => {
        const response = await request(app).get('/api/logs');
        expect(response.status).toBe(401);
    });

    it('should allow authorized access with a valid token', async () => {
        const response = await request(app)
            .get('/api/logs')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it('should reject access with an invalid token', async () => {
        const response = await request(app)
            .get('/api/logs')
            .set('Authorization', 'Bearer invalidtoken');
        expect(response.status).toBe(403);
    });
});

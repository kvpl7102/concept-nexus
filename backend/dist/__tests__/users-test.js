import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../app.js';
const prisma = new PrismaClient();
describe('User API Endpoints', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({});
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
    describe('POST /api/users', () => {
        it('should create a new user successfully', async () => {
            const newUser = {
                login: 'testuser',
                password: 'password123',
            };
            const response = await request(app)
                .post('/api/users')
                .send(newUser);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.login).toBe(newUser.login);
            expect(response.body.password).toBeUndefined();
        });
        it('should return 409 Conflict if the user already exists', async () => {
            await request(app).post('/api/users').send({ login: 'testuser', password: 'password123' });
            const response = await request(app)
                .post('/api/users')
                .send({ login: 'testuser', password: 'password123' });
            expect(response.status).toBe(409);
            expect(response.body.message).toBe('A user with this login already exists');
        });
    });
    describe('POST /api/users/login', () => {
        it('should return a JWT for valid credentials', async () => {
            await request(app).post('/api/users').send({ login: 'testuser', password: 'password123' });
            const response = await request(app)
                .post('/api/users/login')
                .send({ login: 'testuser', password: 'password123' });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
        it('should return 401 Unauthorized for invalid credentials', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({ login: 'testuser', password: 'wrongpassword' });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
    describe('GET /api/users/me', () => {
        it('should return the user profile for a valid token', async () => {
            await request(app).post('/api/users').send({ login: 'testuser', password: 'password123' });
            const loginResponse = await request(app)
                .post('/api/users/login')
                .send({ login: 'testuser', password: 'password123' });
            const token = loginResponse.body.token;
            const profileResponse = await request(app)
                .get('/api/users/me')
                .set('Authorization', `Bearer ${token}`);
            expect(profileResponse.status).toBe(200);
            expect(profileResponse.body.login).toBe('testuser');
        });
        it('should return 401 Unauthorized if no token is provided', async () => {
            const response = await request(app).get('/api/users/me');
            expect(response.status).toBe(401);
        });
    });
});
//# sourceMappingURL=users-test.js.map
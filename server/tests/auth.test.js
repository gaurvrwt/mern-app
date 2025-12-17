const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const { User } = require('../src/models');

describe('Auth API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const userData = {
    email: 'test@example.com',
    username: 'testuser',
    password: 'password123'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered');

    const user = await User.findOne({ email: userData.email });
    expect(user).not.toBeNull();
  });

  it('should login an existing user', async () => {
    // register first
    await request(app)
      .post('/auth/register')
      .send(userData);

    const res = await request(app)
      .post('/auth/login')
      .send(userData);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should not login with wrong password', async () => {
    await request(app)
      .post('/auth/register')
      .send(userData);

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: userData.email,
        password: 'wrongpass'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});

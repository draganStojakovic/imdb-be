import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';

const app = createApp();

beforeAll(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB);
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('auth unit tests', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      fname: 'John',
      lname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
    });
  });

  it('should log in an user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
    });
  });

  it('should log in an user, then log out', async () => {
    const agent = request.agent(app);
    const response = await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
    });
    const res = await agent.post('/api/auth/logout').send();
    expect(res.statusCode).toBe(200);
  });

  it('should log in an user, then run "me" route', async () => {
    const agent = request.agent(app);
    const response = await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
    });
    const me = await agent.post('/api/auth/me');
    expect(me.statusCode).toBe(200);
    expect(me.body).toEqual({
      fname: me.body.fname,
      lname: me.body.lname,
      email: me.body.email,
    });
  });

  it('should fail log in', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'wrongpassword',
    });
    expect(response.statusCode).toBe(401);
  });

  it('should fail logout', async () => {
    const response = await request(app).post('/api/auth/logout').send();
    expect(response.statusCode).toBe(401);
  });

  it('should fail "me" route', async () => {
    const response = await request(app).post('/api/auth/me').send();
    expect(response.statusCode).toBe(401);
  });

  it('should fail registering a new user (email exists)', async () => {
    const response = await request(app).post('/api/auth/register').send({
      fname: 'John',
      lname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(response.statusCode).toBe(400);
  });
});

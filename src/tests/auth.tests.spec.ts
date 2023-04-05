import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';
import { createUser } from 'helpers/TestHelpers';
import { User } from 'database/schemas/User';

const app = createApp();

beforeEach(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB);
  await mongoose.connection.db.dropDatabase();
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
      id: response.body.id,
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
      watchList: response.body.watchList,
    });
    const user = await User.findOne({ email: 'johndoe@gmail.com' });
    expect(user.fname).toEqual('John');
    expect(user.lname).toEqual('Doe');
    expect(user.email).toEqual('johndoe@gmail.com');
  });

  it('should log in an user', async () => {
    await createUser();
    const response = await request(app).post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: response.body.id,
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
      watchList: response.body.watchList,
    });
  });

  it('should log in an user, then log out', async () => {
    await createUser();
    const agent = request.agent(app);
    const response = await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: response.body.id,
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
      watchList: response.body.watchList,
    });
    const res = await agent.post('/api/auth/logout').send();
    expect(res.statusCode).toBe(200);
  });

  it('should log in an user, then run "me" route', async () => {
    await createUser();
    const agent = request.agent(app);
    const response = await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: response.body.id,
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
      watchList: response.body.watchList,
    });
    const me = await agent.post('/api/auth/me');
    expect(me.statusCode).toBe(200);
    expect(me.body).toEqual({
      id: response.body.id,
      fname: me.body.fname,
      lname: me.body.lname,
      email: me.body.email,
      watchList: me.body.watchList,
    });
  });

  it('should fail log in', async () => {
    await createUser();
    const response = await request(app).post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'wrongpassword',
    });
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      success: false,
      errors: [
        {
          msg: 'Bad credentials.',
          location: 'body',
        },
      ],
    });
  });

  it('should fail logout', async () => {
    const response = await request(app).post('/api/auth/logout').send();
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      success: false,
      errors: [
        {
          msg: 'Not authentificated.',
          location: 'body',
          value: '401',
        },
      ],
    });
  });

  it('should fail "me" route', async () => {
    const response = await request(app).post('/api/auth/me').send();
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      success: false,
      errors: [
        {
          msg: 'Not authentificated.',
          location: 'body',
          value: '401',
        },
      ],
    });
  });

  it('should fail registering a new user (email exists)', async () => {
    await createUser();
    const response = await request(app).post('/api/auth/register').send({
      fname: 'John',
      lname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: [
        {
          value: 'johndoe@gmail.com',
          msg: 'Email already in use',
          param: 'email',
          location: 'body',
        },
      ],
    });
  });
});

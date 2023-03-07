import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';
import { createGenresTest } from 'helpers/TestHelpers';
import { createUser } from 'helpers/TestHelpers';

const app = createApp();

beforeEach(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB);
  await mongoose.connection.db.dropDatabase();
});

describe('genres tests', () => {
  it('should return all genres', async () => {
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const genres = await createGenresTest();
    const response = await agent.get('/api/genres').send();
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toEqual({
      id: genres[0].id,
      name: genres[0].name,
    });
  });

  it('should fail to return all genres', async () => {
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.get('/api/genres').send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});

import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';
import { createGenresTest } from 'helpers/TestHelpers';
import { createUser } from 'helpers/TestHelpers';

const app = createApp();

beforeEach(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://127.0.0.1:27017/imdb');
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
    expect(response.body.length).toEqual(genres.length);
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

  it('should return single genre', async () => {
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const genres = await createGenresTest();
    const response = await agent.get(`/api/genres/${genres[0].id}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(genres[0].id);
    expect(response.body.name).toEqual(genres[0].name);
  });

  it('should fail to return single genre', async () => {
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent
      .get('/api/genres/6407026126ae5b838eb816ae') // random id which is wrong
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toEqual(false);
    expect(response.body.errors[0]).toEqual({
      value: '6407026126ae5b838eb816ae',
      msg: 'Genre not found',
      param: 'id',
      location: 'params',
    });
  });
});

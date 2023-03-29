import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';
import { createMovieTest, createUser } from 'helpers/TestHelpers';
import { Movie } from 'database/schemas/Movie';
import { response } from 'express';

const app = createApp();

beforeEach(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB);
  await mongoose.connection.db.dropDatabase();
});

describe('views unit test', () => {
  it('should increment views count by 1', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.put(`/api/views/${newMovie._id}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      views: 'ok',
    });
    const movie = await Movie.findById(newMovie._id);
    expect(movie.views).toEqual(1);
  });

  it('should fail to increment views count (movie not found)', async () => {
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent
      .put('/api/views/640864ed5ff36737bded8c9c')
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: [
        {
          value: '640864ed5ff36737bded8c9c',
          msg: 'Movie not found',
          param: 'id',
          location: 'params',
        },
      ],
    });
  });
});

import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';
import { createMovieTest, createUser } from 'helpers/TestHelpers';

const app = createApp();

beforeEach(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://127.0.0.1:27017/imdb');
  await mongoose.connection.db.dropDatabase();
});

describe('comment unit tests', () => {
  it('should leave a new comment', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    const newUser = await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.post('/api/comments').send({
      content: 'Test comment',
      userId: newUser._id,
      movieId: newMovie._id,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.content).toEqual('Test comment');
  });

  it('should delete a comment', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    const newUser = await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.post('/api/comments').send({
      content: 'Test comment',
      userId: newUser._id,
      movieId: newMovie._id,
    });
    expect(response.statusCode).toBe(201);
    const deleteResponse = await agent.delete('/api/comments').send({
      commentId: response.body.id.toString(),
      movieId: newMovie._id.toString(),
      userId: newUser._id.toString(),
    });
    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toEqual({
      delete: 'ok',
    });
  });
});

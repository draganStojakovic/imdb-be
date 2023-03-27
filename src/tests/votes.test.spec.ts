import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';
import { createMovieTest, createUser } from 'helpers/TestHelpers';

const app = createApp();

beforeEach(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB);
  await mongoose.connection.db.dropDatabase();
});

describe('votes unit tests', () => {
  it('should like a movie', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    const newUser = await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent
      .put(
        `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=like`
      )
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      like: 'added',
      dislike: null,
    });
  });

  it('should dislike a movie', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    const newUser = await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent
      .put(
        `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=dislike`
      )
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      like: null,
      dislike: 'added',
    });
  });

  it('should remove dislike and like a movie', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    const newUser = await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const res1 = await agent
      .put(
        `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=dislike`
      )
      .send();
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toEqual({
      like: null,
      dislike: 'added',
    });
    const res2 = await agent.put(
      `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=like`
    );
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual({
      like: 'added',
      dislike: 'removed',
    });
  });

  it('should remove like and dislike a movie', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    const newUser = await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const res1 = await agent
      .put(
        `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=like`
      )
      .send();
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toEqual({
      like: 'added',
      dislike: null,
    });
    const res2 = await agent.put(
      `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=dislike`
    );
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual({
      like: 'removed',
      dislike: 'added',
    });
  });

  it('should unlike a movie', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    const newUser = await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const res1 = await agent
      .put(
        `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=like`
      )
      .send();
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toEqual({
      like: 'added',
      dislike: null,
    });
    const res2 = await agent
      .put(
        `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=like`
      )
      .send();
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual({
      like: 'removed',
      dislike: null,
    });
  });

  it('should undislike a movie', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    const newUser = await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const res1 = await agent
      .put(
        `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=dislike`
      )
      .send();
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toEqual({
      like: null,
      dislike: 'added',
    });
    const res2 = await agent
      .put(
        `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=dislike`
      )
      .send();
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual({
      like: null,
      dislike: 'removed',
    });
  });

  it('should fail liking a movie', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    const newUser = await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent
      .put(
        `/api/votes?movieId=${newMovie._id}&userId=${newUser._id}&button=wrongKeyword`
      )
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      errors: [
        {
          value: 'wrongKeyword',
          msg: 'Invalid button keyword.',
          param: 'button',
          location: 'query',
        },
      ],
    });
  });
});

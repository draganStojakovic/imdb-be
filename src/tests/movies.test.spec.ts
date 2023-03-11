import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';
import {
  createMovieTest,
  createUser,
  createGenresTest,
} from 'helpers/TestHelpers';
import { Movie } from 'database/schemas/Movie';

const app = createApp();

beforeEach(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB);
  await mongoose.connection.db.dropDatabase();
});

describe('movies unit tests', () => {
  it('should create a new movie', async () => {
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const genres = await createGenresTest();
    const response = await agent.post('/api/movies').send({
      title: 'test movie',
      description: 'description of a movie',
      coverImage: 'https://blabla.com/images/blabla.jpg',
      genres: [genres[0]._id, genres[1]._id],
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: response.body.id,
      title: response.body.title,
      description: response.body.description,
      coverImage: response.body.coverImage,
      genres: response.body.genres,
    });
    const movie = await Movie.findOne({ title: 'test movie' });
    expect(movie.title).toEqual('test movie');
    expect(movie.description).toEqual('description of a movie');
    expect(movie.coverImage).toEqual('https://blabla.com/images/blabla.jpg');
    expect(movie.genres).toEqual(movie.genres);
  });

  it('should return all movies paginated', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.get('/api/movies').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.movies[0].title).toEqual(newMovie.title);
    expect(response.body.movies[0].title).toEqual(newMovie.title);
    expect(response.body.movies[0].coverImage).toEqual(newMovie.coverImage);
    expect(response.body.movies[0].genres).toEqual(newMovie.genres);
    expect(response.body.currentPage).toEqual(1);
  });

  it('should find movie by id', async () => {
    const agent = request.agent(app);
    await createUser();
    const newMovie = await createMovieTest();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.get(`/api/movies/${newMovie._id}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: response.body.id,
      title: response.body.title,
      description: response.body.description,
      coverImage: response.body.coverImage,
      genres: response.body.genres,
    });
  });

  it('should update an existing movie', async () => {
    const agent = request.agent(app);
    const newUser = await createUser();
    const genres = await createGenresTest();
    const newMovie = await createMovieTest();
    await agent.post('/api/auth/login').send({
      email: newUser.email,
      password: 'password123',
    });
    const response = await agent.put(`/api/movies/${newMovie._id}`).send({
      title: 'new title',
      description: 'new description',
      coverImage: newMovie.coverImage,
      genres: [genres[0]._id, genres[1]._id, genres[2]._id],
    });
    expect(response.statusCode).toBe(202);
    expect(response.body).toEqual({
      id: response.body.id,
      title: 'new title',
      description: 'new description',
      coverImage: response.body.coverImage,
      genres: response.body.genres,
    });
  });

  it('should delete an existing movie', async () => {
    const newMovie = await createMovieTest();
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.delete(`/api/movies/${newMovie._id}`).send();
    expect(response.statusCode).toBe(200);
    const movie = await agent.get(`/api/movies/${newMovie._id}`).send();
    expect(movie.statusCode).toBe(400);
    expect(movie.body.success).toEqual(false);
  });

  it('should fail finding a movie', async () => {
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent
      .get('/api/movies/64036b4b759c01f1e686654a') // random id which is wrong
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toEqual(false);
  });
});

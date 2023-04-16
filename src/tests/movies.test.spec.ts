import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';
import {
  createMovieTest,
  createUser,
  createGenresTest,
} from 'helpers/TestHelpers';
import { Movie } from 'database/schemas/Movie';
import { genresQueryFormatter } from 'util/queryFormatters';

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
      likes: [],
      dislikes: [],
      views: 0,
    });
    const movie = await Movie.findOne({ title: 'test movie' });
    expect(movie.title).toEqual('test movie');
    expect(movie.description).toEqual('description of a movie');
    expect(movie.coverImage).toEqual('https://blabla.com/images/blabla.jpg');
    expect(movie.genres).toEqual(movie.genres);
    expect(movie.views).toEqual(0);
  });

  it('should hit root movies endpoint with two query params and redirect', async () => {
    const agent = request.agent(app);
    await createMovieTest();
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.get('/api/movies?page=1&limit=10').send();
    expect(response.statusCode).toBe(302);
  });

  it('should hit root movies endpoint with three query params and redirect', async () => {
    const agent = request.agent(app);
    await createMovieTest();
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent
      .get('/api/movies?page=1&limit=10&search=test')
      .send();
    expect(response.statusCode).toBe(302);
  });

  it('should hit root movies endpoint with four query params and redirect', async () => {
    const agent = request.agent(app);
    await createMovieTest();
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const genres = await agent.get('/api/genres');
    expect(genres.statusCode).toBe(200);
    expect(genres.body[0].id).toEqual(genres.body[0].id);
    const response = await agent
      .get(
        `/api/movies?page=1&limit=10&search=test&genres=${genres.body[0].id}`
      )
      .send();
    expect(response.statusCode).toBe(302);
  });

  it('should return all movies paginated', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieTest();
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent
      .get('/api/movies-paginated?page=1&limit=10')
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.movies[0].title).toEqual(newMovie.title);
    expect(response.body.movies[0].title).toEqual(newMovie.title);
    expect(response.body.movies[0].coverImage).toEqual(newMovie.coverImage);
    expect(response.body.movies[0].views).toEqual(0);
    expect(response.body.movies[0].genres[0]._id).toEqual(
      newMovie.genres[0].toString()
    );
    expect(response.body.movies[0].genres[1]._id).toEqual(
      newMovie.genres[1].toString()
    );
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
      likes: [],
      dislikes: [],
      views: 0,
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
      likes: [],
      dislikes: [],
      views: 0,
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
      .get('/api/movies/64036b4b759c01f1e686654a') // wrong id on purpose
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toEqual(false);
  });

  it('should mark movie as watched and then remove it', async () => {
    const agent = request.agent(app);
    await createUser();
    const newMovie = await createMovieTest();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const { _id } = newMovie;
    const movieId = _id.toString();
    const addMovie = await agent.put(`/api/watched-movie/${movieId}`).send();
    expect(addMovie.statusCode).toBe(200);
    expect(addMovie.body.watchedMovies).toEqual([movieId]);
    const removeMovie = await agent.put(`/api/watched-movie/${movieId}`).send();
    expect(removeMovie.statusCode).toBe(200);
    expect(removeMovie.body.watchedMovies).toEqual([]);
  });

  it('should add a movie to watch list and the remove it', async () => {
    const agent = request.agent(app);
    await createUser();
    const newMovie = await createMovieTest();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const { _id } = newMovie;
    const movieId = _id.toString();
    const addMovie = await agent.put(`/api/watch-list/${movieId}`).send();
    expect(addMovie.statusCode).toBe(200);
    expect(addMovie.body.watchList).toEqual([movieId]);
    const removeMovie = await agent.put(`/api/watch-list/${movieId}`).send();
    expect(removeMovie.statusCode).toBe(200);
    expect(removeMovie.body.watchList).toEqual([]);
  });

  it("should return all movies from auth users's watch list", async () => {
    const agent = request.agent(app);
    await createUser();
    const newMovie = await createMovieTest();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const { _id } = newMovie;
    const movieId = _id.toString();
    const addMovie = await agent.put(`/api/watch-list/${movieId}`).send();
    expect(addMovie.statusCode).toBe(200);
    expect(addMovie.body.watchList).toEqual([movieId]);
    const response = await agent.get('/api/watch-list').send();
    expect(response.statusCode).toBe(200);
    expect(response.body[0].title).toEqual(newMovie.title);
    expect(response.body[0].coverImage).toEqual(newMovie.coverImage);
  });

  it('should return 10 most popular movies (1 movie in this test)', async () => {
    const agent = request.agent(app);
    await createUser();
    const newMovie = await createMovieTest();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.get('/api/popular-movies').send();
    const { _id, coverImage } = newMovie;
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: _id.toString(),
        coverImage: coverImage,
      },
    ]);
  });

  it('should return up to 10 related movies (1 movie in this test)', async () => {
    const agent = request.agent(app);
    await createUser();
    const newMovie = await createMovieTest();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const { _id, coverImage, genres } = newMovie;
    const formattedGenres = genres.join(',');
    const response = await agent
      .get(`/api/related-movies?genres=${formattedGenres}`)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: _id.toString(),
        coverImage: coverImage,
      },
    ]);
  });
});

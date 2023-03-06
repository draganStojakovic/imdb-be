import createApp from 'app/app';
import request from 'supertest';
import mongoose from 'mongoose';
import { createMovieJest, createUser } from 'helpers/TestHelpers';
import { User } from 'database/schemas/User';
import { Movie } from 'database/schemas/Movie';

const app = createApp();

beforeEach(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.DB);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('unit tests', () => {
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
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
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
      fname: response.body.fname,
      lname: response.body.lname,
      email: response.body.email,
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
      error: 'Not authentificated.',
    });
  });

  it('should fail "me" route', async () => {
    const response = await request(app).post('/api/auth/me').send();
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      error: 'Not authentificated.',
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

  ////////// MOVIE TESTS ////////////////////////////////

  it('should create a new movie', async () => {
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.post('/api/movies').send({
      title: 'test movie',
      description: 'description of a movie',
      coverImage: 'https://blabla.com/images/blabla.jpg',
      genre: 'horror',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: response.body.id,
      title: response.body.title,
      description: response.body.description,
      coverImage: response.body.coverImage,
      genre: response.body.genre,
    });
    const movie = await Movie.findOne({ title: 'test movie' });
    expect(movie.title).toEqual('test movie');
    expect(movie.description).toEqual('description of a movie');
    expect(movie.coverImage).toEqual('https://blabla.com/images/blabla.jpg');
    expect(movie.genre).toEqual('horror');
  });

  it('should return all movies', async () => {
    const agent = request.agent(app);
    const newMovie = await createMovieJest();
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.get('/api/movies').send();
    expect(response.statusCode).toBe(200);
    expect(response.body[0].title).toEqual(newMovie.title);
    expect(response.body[0].description).toEqual(newMovie.description);
    expect(response.body[0].coverImage).toEqual(newMovie.coverImage);
    expect(response.body[0].genre).toEqual(newMovie.genre);
  });

  it('should find movie by id', async () => {
    const agent = request.agent(app);
    await createUser();
    const newMovie = await createMovieJest();
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
      genre: response.body.genre,
    });
  });

  it('should update an existing movie', async () => {
    const agent = request.agent(app);
    const newUser = await createUser();
    const newMovie = await createMovieJest();
    await agent.post('/api/auth/login').send({
      email: newUser.email,
      password: 'password123',
    });
    const response = await agent.put(`/api/movies/${newMovie._id}`).send({
      title: 'new title',
      description: 'new description',
      coverImage: newMovie.coverImage,
      genre: 'action',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: response.body.id,
      title: 'new title',
      description: 'new description',
      coverImage: response.body.coverImage,
      genre: 'action',
    });
  });

  it('should delete an existing movie', async () => {
    const newMovie = await createMovieJest();
    const agent = request.agent(app);
    await createUser();
    await agent.post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123',
    });
    const response = await agent.delete(`/api/movies/${newMovie._id}`).send();
    expect(response.statusCode).toBe(200);
    const movie = await agent.get(`/api/movies/${newMovie._id}`).send();
    expect(movie.statusCode).toBe(404);
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
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toEqual(false);
  });
});

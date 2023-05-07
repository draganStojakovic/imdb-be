import { createMovie } from 'controllers/movies/createMovie';
import { deleteMovie } from 'controllers/movies/deleteMovie';
import { getMoviesPaginated } from 'controllers/movies/getMoviesPaginated';
import { getSingleMovie } from 'controllers/movies/getSingleMovie';
import { moviesEndPointRedirect } from 'controllers/movies/moviesEndPointRedirect';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import createMovieValidator from 'validators/CreateMovieValidator';
import schemaValidator from 'validators/schemaValidator';
import moviesPaginatedValidator from 'validators/getMovies/moviesPaginatedValidator';
import moviesPaginatedSearchValidator from 'validators/getMovies/moviesPaginatedSearchValidator';
import { getMoviesPaginatedSearch } from 'controllers/movies/getMoviesPaginatedSearch';
import moviesPaginatedGenresValidator from 'validators/getMovies/moviesPaginatedGenresValidator';
import { getMoviesPaginatedGenres } from 'controllers/movies/getMoviesPaginatedGenres';
import moviesPaginatedSearchGenresValidator from 'validators/getMovies/moviesPaginatedSearchGenresValidator';
import { getMoviesPaginatedSearchGenres } from 'controllers/movies/getMoviesPaginatedSearchGenres';
import votesMovieValidator from 'validators/votesMovieValidator';
import { voteMovie } from 'controllers/votes/voteMovie';
import movieIdValidator from 'validators/movieIdValidator';
import { watchedMovie } from 'controllers/movies/watchedMovie';
import { addOrRemoveFromWatchList } from 'controllers/movies/addOrRemoveFromWatchList';
import { getAllMoviesFromWatchList } from 'controllers/movies/getAllMoviesFromWatchList';
import { getPopularMovies } from 'controllers/movies/getPopularMovies';
import { getRelatedMovies } from 'controllers/movies/getRelatedMovies';
import getRelatedMoviesValidator from 'validators/getMovies/getRelatedMoviesValidator';

export const movieRouter = Router();

movieRouter.get(
  '/movies/:id',
  auth,
  movieIdValidator,
  schemaValidator,
  getSingleMovie
);

movieRouter.get('/movies', moviesEndPointRedirect);
movieRouter.get(
  '/movies-paginated',
  auth,
  moviesPaginatedValidator,
  schemaValidator,
  getMoviesPaginated
);
movieRouter.get(
  '/movies-paginated-search',
  auth,
  moviesPaginatedSearchValidator,
  schemaValidator,
  getMoviesPaginatedSearch
);
movieRouter.get(
  '/movies-paginated-genres',
  auth,
  moviesPaginatedGenresValidator,
  schemaValidator,
  getMoviesPaginatedGenres
);
movieRouter.get(
  '/movies-paginated-search-genres',
  auth,
  moviesPaginatedSearchGenresValidator,
  schemaValidator,
  getMoviesPaginatedSearchGenres
);

movieRouter.put(
  '/votes',
  auth,
  votesMovieValidator,
  schemaValidator,
  voteMovie
);

movieRouter.put(
  '/watched-movie/:id',
  auth,
  movieIdValidator,
  schemaValidator,
  watchedMovie
);

movieRouter.get('/watch-list', auth, getAllMoviesFromWatchList);

movieRouter.put(
  '/watch-list/:id',
  auth,
  movieIdValidator,
  schemaValidator,
  addOrRemoveFromWatchList
);

movieRouter.post(
  '/movies',
  auth,
  createMovieValidator,
  schemaValidator,
  createMovie
);

movieRouter.delete('/movies/:id', auth, deleteMovie);

movieRouter.get('/popular-movies', auth, getPopularMovies);

movieRouter.get(
  '/related-movies',
  auth,
  getRelatedMoviesValidator,
  schemaValidator,
  getRelatedMovies
);

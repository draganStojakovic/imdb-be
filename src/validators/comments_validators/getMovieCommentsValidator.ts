import { param } from 'express-validator';
import { query } from 'express-validator';
import { Movie } from 'database/schemas/Movie';

const getMovieCommentsValidator = [
  param('movieId')
    .exists({ checkFalsy: true })
    .withMessage('movieId param missing.')
    .isString()
    .withMessage('movieId param must be of type string.')
    .custom(async (movieId) => {
      const movie = await Movie.exists({ _id: movieId });
      if (!movie) throw new Error('Movie not found');
      return true;
    }),
  query('page')
    .exists({ checkFalsy: true })
    .withMessage('page query missing.')
    .isString()
    .withMessage('page query must be of type string.'),
  query('limit')
    .exists({ checkFalsy: true })
    .withMessage('limit query missing.')
    .isString()
    .withMessage('limit query must be of type string.'),
];

export default getMovieCommentsValidator;

import { query } from 'express-validator';
import { Movie } from 'database/schemas/Movie';
import { User } from 'database/schemas/User';

const votesMovieValidator = [
  query('movieId')
    .exists({ checkFalsy: true })
    .withMessage('movieId is required')
    .isString()
    .withMessage('movieId must be string type')
    .custom(async (movieId) => {
      const movie = await Movie.exists({ _id: movieId });
      if (!movie) throw new Error('Invalid movie id');
      return true;
    }),
  query('userId')
    .exists({ checkFalsy: true })
    .withMessage('userId is required')
    .isString()
    .withMessage('userId must be string type')
    .custom(async (userId) => {
      const user = await User.exists({ _id: userId });
      if (!user) throw new Error('Invalid user id');
      return true;
    }),
  query('button')
    .exists({ checkFalsy: true })
    .withMessage('button query is required')
    .isString()
    .withMessage('button query must be string type'),
];

export default votesMovieValidator;

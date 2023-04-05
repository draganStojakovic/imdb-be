import { body } from 'express-validator';
import { User } from 'database/schemas/User';
import { Movie } from 'database/schemas/Movie';

const postCommentValidator = [
  body('content')
    .exists({ checkFalsy: true })
    .withMessage('Comment content is required')
    .isString()
    .withMessage('Comment content must be string type')
    .custom((content: string) => {
      if (content.length > 500)
        throw new Error('Comment must be 500 characters or bellow');
      return true;
    }),
  body('userId')
    .exists({ checkFalsy: true })
    .withMessage('userId is required')
    .isString()
    .withMessage('userId must be string type')
    .custom(async (userId: string) => {
      const userExists = await User.exists({ _id: userId });
      if (userExists) return true;
      throw new Error('User not found');
    }),
  body('movieId')
    .exists({ checkFalsy: true })
    .withMessage('movieId is required')
    .isString()
    .withMessage('movieId must be string type')
    .custom(async (movieId: string) => {
      const movieExists = await Movie.exists({ _id: movieId });
      if (movieExists) return true;
      throw new Error('Movie not found');
    }),
];

export default postCommentValidator;

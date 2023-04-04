import { body } from 'express-validator';
import { Comment } from 'database/schemas/Comment';
import { Movie } from 'database/schemas/Movie';
import { User } from 'database/schemas/User';

const deleteCommentValidator = [
  body('commentId')
    .exists({ checkFalsy: true })
    .withMessage('commentId body is required')
    .isString()
    .withMessage('commentId body must be string type')
    .custom(async (commentId: string) => {
      const commentExists = await Comment.exists({ _id: commentId });
      if (!commentExists) throw new Error('Comment not found');
      return true;
    }),
  body('movieId')
    .exists({ checkFalsy: true })
    .withMessage('movieId body is required')
    .isString()
    .withMessage('movieId body must be string type')
    .custom(async (movieId: string) => {
      const movieExists = await Movie.exists({ _id: movieId });
      if (!movieExists) throw new Error('Movie not found');
      return true;
    }),
  body('userId')
    .exists({ checkFalsy: true })
    .withMessage('movieId body is required')
    .isString()
    .withMessage('movieId body must be string type')
    .custom(async (userId: string) => {
      const userExists = await User.exists({ _id: userId });
      if (!userExists) throw new Error('User not found');
      return true;
    }),
];

export default deleteCommentValidator;

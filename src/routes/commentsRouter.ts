import { getComments } from 'controllers/comments/getComments';
import { postComment } from 'controllers/comments/postComment';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import getMovieCommentsValidator from 'validators/comments_validators/getMovieCommentsValidator';
import postCommentValidator from 'validators/comments_validators/postCommentValidator';
import schemaValidator from 'validators/schemaValidator';

export const commentsRouter = Router();

commentsRouter.get(
  '/comments/:movieId',
  auth,
  getMovieCommentsValidator,
  schemaValidator,
  getComments
);

commentsRouter.post(
  '/comments',
  auth,
  postCommentValidator,
  schemaValidator,
  postComment
);

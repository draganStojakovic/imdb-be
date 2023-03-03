import { Movie } from 'database/schemas/Movie';
import { body } from 'express-validator';

const createMovieValidator = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be string type'),
  body('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be string type'),
  body('coverImage')
    .exists({ checkFalsy: true })
    .withMessage('Cover image is required')
    .isString()
    .withMessage('Cover image must be string type'),
  body('genre')
    .exists({ checkFalsy: true })
    .withMessage('Genre is required')
    .isString()
    .withMessage('Genre must be string type'),
];

export default createMovieValidator;

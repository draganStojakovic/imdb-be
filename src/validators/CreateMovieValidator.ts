import { body } from 'express-validator';
import { URL } from 'url';
import { Movie } from 'database/schemas/Movie';

const createMovieValidator = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be string type')
    .custom(async (title: string) => {
      const movie = await Movie.count({ title });
      if (movie > 0) throw new Error('Movie already exists');
      return true;
    }),
  body('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be string type'),
  body('coverImage')
    .exists({ checkFalsy: true })
    .withMessage('Cover image is required')
    .isString()
    .withMessage('Cover image must be string type')
    .custom((coverImage: string) => {
      const url = new URL(coverImage);
      if (!url) throw new Error('Cover image must be a link');
      return true;
    })
    .withMessage('Cover image must be a link'),
  body('genre')
    .exists({ checkFalsy: true })
    .withMessage('Genre is required')
    .isString()
    .withMessage('Genre must be string type'),
];

export default createMovieValidator;

import { body, param } from 'express-validator';
import { URL } from 'url';
import { Movie } from 'database/schemas/Movie';

const updateMovieValidator = [
  param('id')
    .exists({ checkFalsy: true })
    .withMessage('Id must exist')
    .isString()
    .withMessage('Id must be of type string')
    .custom(async (id: number) => {
      const movie = await Movie.findById(id);
      if (!movie) throw new Error("Movie doesn't exist.");
      return true;
    }),
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be string type'),
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

export default updateMovieValidator;

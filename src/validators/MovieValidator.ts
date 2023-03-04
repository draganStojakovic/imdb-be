import { body } from 'express-validator';
import { URL } from 'url';
import { Movie } from 'database/schemas/Movie';

const movieValidator = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be string type')
    .custom(async (title) => {
      const movie = await Movie.findOne({ title: title });
      if (movie) throw new Error('Movie already exists');
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
    .withMessage('Genre must be string type')
    .custom((coverImage: string) => {
      const url = new URL(coverImage);
      if (!url) throw new Error('Error: Genre must be a link');
      return true;
    })
    .withMessage('Genre must be a link'),
  body('genre')
    .exists({ checkFalsy: true })
    .withMessage('Genre is required')
    .isString()
    .withMessage('Genre must be string type'),
];

export default movieValidator;
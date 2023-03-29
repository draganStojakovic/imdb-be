import { param } from 'express-validator';
import { Movie } from 'database/schemas/Movie';

const movieIdValidator = [
  param('id')
    .exists({ checkFalsy: true })
    .withMessage('ID param missing.')
    .isString()
    .withMessage('ID param must be of type string.')
    .custom(async (id) => {
      const movie = await Movie.exists({ _id: id });
      if (!movie) throw new Error('Movie not found');
      return true;
    }),
];

export default movieIdValidator;

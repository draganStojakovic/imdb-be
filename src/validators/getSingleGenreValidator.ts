import { param } from 'express-validator';
import { Genre } from 'database/schemas/Genre';

const getSingleGenreValidator = [
  param('id')
    .exists({ checkFalsy: true })
    .withMessage('ID param missing.')
    .isString()
    .withMessage('ID param must be of type string.')
    .custom(async (id) => {
      const genre = await Genre.exists({ _id: id });
      if (!genre) throw new Error('Genre not found');
      return true;
    }),
];

export default getSingleGenreValidator;

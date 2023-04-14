import { query } from 'express-validator';

const getRelatedMoviesValidator = [
  query('genres')
    .exists({ checkFalsy: true })
    .withMessage('Genres query param missing.')
    .isString()
    .withMessage('Genres query param must be of type string'),
];

export default getRelatedMoviesValidator;

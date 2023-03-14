import { query } from 'express-validator';

const getSearchedMoviesValidator = [
  query('page')
    .exists({ checkFalsy: true })
    .withMessage('Page querry param missing.'),
  query('limit')
    .exists({ checkFalsy: true })
    .withMessage('Limit querry param missing.'),
  query('search')
    .exists({ checkFalsy: true })
    .withMessage('Search querry param missing.')
    .isString()
    .withMessage('Search query must be of type string.'),
];

export default getSearchedMoviesValidator;

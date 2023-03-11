import { query } from 'express-validator';

const getMoviesValidator = [
  query('page')
    .exists({ checkFalsy: true })
    .withMessage('Page querry param missing.'),
  query('limit')
    .exists({ checkFalsy: true })
    .withMessage('Limit querry param missing.'),
];

export default getMoviesValidator;

import { query } from 'express-validator';

const moviesPaginatedValidator = [
  query('page')
    .exists({ checkFalsy: true })
    .withMessage('Page querry param missing.')
    .isString()
    .withMessage('Page querry param must be of type string'),
  query('limit')
    .exists({ checkFalsy: true })
    .withMessage('Limit querry param missing.')
    .isString()
    .withMessage('Page querry param must be of type string'),
];

export default moviesPaginatedValidator;

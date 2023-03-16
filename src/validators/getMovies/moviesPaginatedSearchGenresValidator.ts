import { query } from 'express-validator';

const moviesPaginatedSearchGenresValidator = [
  query('page')
    .exists({ checkFalsy: true })
    .withMessage('Page query param missing.')
    .isString()
    .withMessage('Page query param must be of type string'),
  query('limit')
    .exists({ checkFalsy: true })
    .withMessage('Limit query param missing.')
    .isString()
    .withMessage('Limit query param must be of type string'),
  query('search')
    .exists({ checkFalsy: true })
    .withMessage('Search query param missing.')
    .isString()
    .withMessage('Search query param must be of type string'),
  query('genres')
    .exists({ checkFalsy: true })
    .withMessage('Genres query param missing.')
    .isString()
    .withMessage('Genres query param must be of type string'),
];

export default moviesPaginatedSearchGenresValidator;

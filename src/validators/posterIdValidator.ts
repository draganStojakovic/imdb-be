import { query } from 'express-validator';

const posterIdValidator = [
  query('posterId')
    .exists({ checkFalsy: true })
    .withMessage('Poster id query param missing.')
    .isString()
    .withMessage('Poster id query param must be of type string'),
];

export default posterIdValidator;

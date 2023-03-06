import { param } from 'express-validator';

const getSingleMovieValidator = [
  param('id')
    .exists({ checkFalsy: true })
    .withMessage('ID param missing.')
    .isString()
    .withMessage('ID param must be of type string.'),
];

export default getSingleMovieValidator;

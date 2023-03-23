import { query } from 'express-validator';
import { Movie } from 'database/schemas/Movie';

const likeMovieValidator = [
  query().custom(async (values) => {
    const { movieId, userId } = values;

    if (!movieId) throw new Error('movieId is required.');
    if (!userId) throw new Error('userId is required.');

    const movie = await Movie.findById(movieId);

    if (!movie) throw new Error('Invalid movie id.');

    const movieLiked = await Movie.count({ likes: userId }).where({
      _id: movieId,
    });

    if (movieLiked) throw new Error('Movie already liked.');

    return true;
  }),
];

export default likeMovieValidator;

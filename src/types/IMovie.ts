import { IGenre } from './IGenre';

export interface IMovie {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  genres: string[];
  likes: string[];
  dislikes: string[];
  views: number;
  comments: string[];
}

export interface IMovieSanitized {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  genres: IGenre[];
  likes: [];
  dislikes: [];
  views: 0;
}

export type IMovieStrippedDown = Pick<IMovie, '_id' | 'coverImage'>;

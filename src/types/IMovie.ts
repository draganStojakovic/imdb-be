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

export type IMovieStrippedDown = Pick<IMovie, '_id' | 'coverImage'>;

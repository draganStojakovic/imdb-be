import EventEmitter from 'events';
import { sendEmail } from './sendEmail';
import { IMovieSanitized } from 'types/IMovie';
import deleteFile from './deleteFile';
import { PosterAction } from 'types/IMovie';
import incrementMovieView from './incrementMovieView';

export const emitter = new EventEmitter();

emitter.on('sendEmailEvent', (data: IMovieSanitized) => sendEmail(data));

emitter.on('fileAction', (data: PosterAction) => {
  if (data.action === 'delete') deleteFile(data.filePath);
});

emitter.on('incrementMovieView', (data: string) => {
  incrementMovieView(data);
});

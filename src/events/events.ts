import EventEmitter from 'events';
import { sendEmail } from './sendEmail';
import { IMovieSanitized } from 'types/IMovie';

export const emitter = new EventEmitter();

emitter.on('sendEmailEvent', (data: IMovieSanitized) => sendEmail(data));

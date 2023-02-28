import * as dotenv from 'dotenv';

dotenv.config();

export const HOST: string = process.env.HOST;
export const PORT: number = Number(process.env.PORT);
export const DB: string = process.env.DB;
export const SESSION: number = Number(process.env.SESSION);
export const COOKIE_SECRET: string = process.env.COOKIE_SECRET;

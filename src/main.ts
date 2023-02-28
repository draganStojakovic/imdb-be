import express from 'express';
import { HOST } from './constants/envVars';
import { PORT } from './constants/envVars';
import { COOKIE_SECRET } from './constants/envVars';
import { SESSION } from './constants/envVars';
import { connectDB } from './database/dbConn';
import mongoose from 'mongoose';
import session from 'express-session';
import Router from 'src/routes/Router';
import cors from 'cors';

connectDB();

mongoose.connection.on('open', () => {
  const app = express();

  app.use(express.json());
  app.set('trust proxy', 1);
  app.use(
    cors({
      credentials: true,
      methods: ['POST', 'GET', 'PUT'],
    })
  );

  app.use(
    session({
      saveUninitialized: false,
      resave: false,
      secret: COOKIE_SECRET,
      cookie: { maxAge: SESSION },
    })
  );

  app.use('/api', Router);

  app.listen(PORT, HOST, () => {
    console.log(`[ ready ] http://${HOST}:${PORT}`);
  });

  app.on('error', console.error);
});

import express from 'express';
import { HOST } from './app/constants/envVars';
import { PORT } from './app/constants/envVars';
import { COOKIE_SECRET } from './app/constants/envVars';
import { SESSION } from './app/constants/envVars';
import { connectDB } from './app/database/dbConn';
import mongoose from 'mongoose';
import session from 'express-session';

connectDB();

mongoose.connection.on('open', () => {
  const app = express();

  app.use(express.json());

  app.set('trust proxy', 1);

  app.use(
    session({
      secret: COOKIE_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: SESSION },
    })
  );

  app.listen(PORT, HOST, () => {
    console.log(`[ ready ] http://${HOST}:${PORT}`);
  });

  app.on('error', console.error);
});

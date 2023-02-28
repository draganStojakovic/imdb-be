import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import router from 'routes/Router';
import { connectDB } from 'database/dbConn';
import { COOKIE_SECRET, HOST, PORT, SESSION } from 'constants/envVars';

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

  app.use('/api', router);

  app.listen(PORT, HOST, () => {
    console.log(`[ ready ] http://${HOST}:${PORT}`);
  });

  app.on('error', console.error);
});

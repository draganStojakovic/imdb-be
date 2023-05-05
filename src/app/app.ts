import express from 'express';
import session from 'express-session';
import cors from 'cors';
import router from 'routes/Router';
import { COOKIE_SECRET, SESSION } from 'constants/envVars';

const createApp = () => {
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['POST', 'PUT', 'GET', 'DELETE'],
      credentials: true,
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

  app.set('trust proxy', 1);

  app.use(express.static('public'));

  app.use('/api', router);

  return app;
};

export default createApp;

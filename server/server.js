import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import apiRoomsRouter from './api/rooms/router';
import passport from 'passport';
import facebookRouter from './api/oauth/facebook/router';
import githubRouter from './api/oauth/github/router';

const app = express();
// initialize passport 
app.use(passport.initialize());

// // Routing auth
app.use('/auth/facebook',[
  facebookRouter
]);

app.use('/auth/github',[
  githubRouter
]);

app.use('/api/rooms', [
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
  apiRoomsRouter
]);

if(process.env.NODE_ENV !== 'test') {
  if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  app.use('/', express.static(path.join(__dirname, '../build')));
}

export default app;
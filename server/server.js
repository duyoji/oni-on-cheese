import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import apiRoomsRouter from './api/rooms/router';

const app = express();
app.use('/api/rooms', [
  bodyParser.json(),
  bodyParser.urlencoded({extended: true}),
  apiRoomsRouter
]);

if(process.env.NODE_ENV !== 'test') {
  if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  app.use('/', express.static(path.join(__dirname, '../build')));
}

export default app;
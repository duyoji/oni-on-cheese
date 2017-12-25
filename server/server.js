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

// Redirect to `/` when unmatch path is requested.
app.all('*', function(req, res) {
  res.redirect("http://www.mysite.com/");
});

export default app;
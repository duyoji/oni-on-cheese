import app from './server';
import {listen} from './socket';

const PORT = process.env.PORT || 9000;

app.listen(PORT);
// listen(app, PORT);
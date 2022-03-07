import app from './app';
import './db/connection';
import { PORT } from './config';

app.listen(PORT);
console.log('server on port', PORT);

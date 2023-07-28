import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/', routes);
app.use(express.static('./src/public'));

export default app;

import express, { Application } from 'express';
import router from './routes';
import morgan from 'morgan';

const app: Application = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

export default app;

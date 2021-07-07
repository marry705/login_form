import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './apiRouter';
import errorHandler from './errorHandler';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRouter);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, '../dist/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/', 'index.html'));
});

export default app;

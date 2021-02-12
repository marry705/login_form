import express from 'express';
import path from 'path';
import apiRouter from './apiRouter';

const app = express();

app.use('/api', apiRouter);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/', 'index.html'));
});

export default app;

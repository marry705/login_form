import express from 'express';
import path from 'path';
import apiRouter from './apiRouter';

const app = express();

app.use(express.static(path.join(__dirname, '../dist/')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/', 'index.html'));
});
app.use('/api', apiRouter);

export default app;

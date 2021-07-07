/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import ErrorHandler from './errorHandler';

const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (err instanceof ErrorHandler) {
    const { statusCode, message } = err;
    res.status(statusCode).send(message);
  }
  res.status(500).send(err.message);
};

export default errorHandler;

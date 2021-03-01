import express from 'express';
import { Company, User } from '../types';
import ErrorHandler from '../errorHandler/errorHandler';
import knex from '../db';

const apiRouter = express.Router();

apiRouter.route('/companies').get(
  async (req, res, next) => {
    knex<Company>('companies')
      .select('*')
      .then((companies: Company[]) => res.status(200).send(companies))
      .catch((error: Error) => next(error));
  },
);

apiRouter.route('/login').post(
  async (req, res, next) => {
    let userData = null;
    try {
      userData = JSON.parse(req.body.user);
    } catch (e) {
      userData = req.body.user;
    }

    knex<User>('users')
      .where({ email: userData.email })
      .andWhere({ password: userData.password })
      .then((currentUser: User[]) => {
        if (currentUser.length) {
          res.status(200).send(currentUser[0]);
        } else {
          throw new ErrorHandler(404, 'Not correct email or password');
        }
      })
      .catch((error: Error) => next(error));
  },
);

apiRouter.route('/user/add').post(
  async (req, res, next) => {
    let newUser: User = null;
    try {
      newUser = <User>JSON.parse(req.body.user);
    } catch (e) {
      newUser = <User>req.body.user;
    }

    knex<User>('users')
      .insert({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        companyId: newUser.companyId,
      })
      .then(() => res.status(200).send({ message: 'User was add.' }))
      .catch((error : Error) => next(error));
  },
);

apiRouter.route('/user/:id').put(
  async (req, res, next) => {
    let userData: User = null;
    try {
      userData = <User>JSON.parse(req.body.user);
    } catch (e) {
      userData = <User>req.body.user;
    }

    knex<User>('users')
      .where({ id: req.params.id })
      .update({
        email: userData.email,
        name: userData.name,
        password: userData.password,
      })
      .then(() => knex<User>('users').select('*').where({ id: req.params.id }))
      .then((currentUser: User[]) => {
        if (currentUser.length) {
          res.status(200).send(currentUser[0]);
        } else {
          throw new ErrorHandler(404, 'User Error');
        }
      })
      .catch((error: Error) => next(error));
  },
);

apiRouter.route('/user/:id').delete(
  async (req, res, next) => {
    knex<User>('users')
      .where({ id: req.params.id })
      .del()
      .then(() => res.status(200).send(`User ${req.params.id} deleted.`))
      .catch((error: Error) => next(error));
  },
);

export default apiRouter;

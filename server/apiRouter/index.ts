import express from 'express';
import { Company, User } from '../types';
import knex from '../db';

const apiRouter = express.Router();

apiRouter.route('/companies').get(
    async (req, res) => {
        knex<Company>('companies')
            .select('*')
            .then((companies: Company[]) => res.status(200).send(companies))
            .catch((error: Error) => res.status(400).send(error.message))
});

apiRouter.route('/login').post(
    async (req, res) => {
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
                    res.status(404).send({ message: 'Not correct email or password' }) 
                }
            })
            .catch((error: Error) => res.status(400).send(error.message))
});

apiRouter.route('/user/add').post(
    async (req, res) => {
        let newUser: User = null;
        try {
            newUser = <User>JSON.parse(req.body.user); 
        } catch (e) {
            newUser = <User>req.body.user;
        }

        knex<User>('users')
            .insert({ 
                'email': newUser.email,
                'name': newUser.name,
                'password': newUser.password,
                'companyId': newUser.companyId,
            })
            .then(() => res.send())
            .catch((error : Error) => res.status(500).send(error.message));
});

apiRouter.route('/user/edit').put(
    async (req, res) => {
        let userData: User = null;
        try {
            userData = <User>JSON.parse(req.body.user); 
        } catch (e) {
            userData = <User>req.body.user;
        }

        knex<User>('users')
            .where({ id: userData.id })
            .update({ email: userData.email, 
                    name: userData.name, 
                    password: userData.password, 
            })
            .then((count: number) => {
                if (count) {
                    return knex<User>('users').select('*').where({ id: userData.id });
                }
            })
            .then((currentUser: User[]) => {
                if (currentUser.length) {
                    res.status(200).send(currentUser[0]);
                } else {
                    res.status(404).send({ message: 'User Error' });
                }
            })
            .catch((error: Error) => res.status(500).send(error.message));
});

apiRouter.route('/user/delete').delete(
    async (req, res) => {
        let userData: User = null;
        try {
            userData = <User>JSON.parse(req.body.user); 
        } catch (e) {
            userData = <User>req.body.user;
        }

        knex<User>('users')
            .where({ id: userData.id }) 
            .del()
            .then(() => res.status(200).send(`User ${userData.id} deleted.`))
            .catch((error: Error) => res.status(404).send(error.message))
});

export default apiRouter;
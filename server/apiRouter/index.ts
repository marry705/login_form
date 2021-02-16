import express from 'express';
import { Company, User } from '../types';
import knex from '../db';

const apiRouter = express.Router();

apiRouter.route('/companies').get(
    async (req, res) => {
        const company: Company[] = [{ id: '0', name: 'new' }, { id: '1', name: 'new1' }, { id: '2', name: 'new2' }, { id: '3', name: 'new3' }];
        res.json(company);
});

apiRouter.route('/login').post(
    async (req, res) => {
        let userData: User = null;
        try {
            userData = <User>JSON.parse(req.body.user); 
        } catch (e) {
            userData = <User>req.body.user;
        }

        knex<User>('users').select('*')
            .where('id', userData.id) 
            .then((currentUser: User[]) => {
                console.log(currentUser);
                // res.json(currentUser[0]);
                res.send();
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

        knex<User>('users').insert({ 
                'email': newUser.email,
                'name': newUser.name,
                'password': newUser.password,
                'companyId': newUser.companyId,
            })
            .then(() => res.send())
            .catch((error : Error) => res.status(400).send(error.message))
});

apiRouter.route('/user/edit').put(
    async (req, res) => {
        let userData: User = null;
        try {
            userData = <User>JSON.parse(req.body.user); 
        } catch (e) {
            userData = <User>req.body.user;
        }

        knex<User>('users').where('id', userData.id) 
            .update({ email: userData.email, name: userData.name, 
                      password: userData.password, companyId: userData.companyId, 
            })
            .then((count: number) => {
                if (count) {
                    res.status(200).json({updated: count})
                } else {
                    res.status(404).json({message: "Record not found"})
                }
            })
            .catch((error: Error) => res.status(500).send(error.message))
});

apiRouter.route('/user/delete').delete(
    async (req, res) => {
        let userData: User = null;
        try {
            userData = <User>JSON.parse(req.body.user); 
        } catch (e) {
            userData = <User>req.body.user;
        }

        knex<User>('users').where('id', userData.id) 
            .del()
            .then(() => res.send(`Book ${userData.id} deleted.`))
            .catch((error: Error) => res.status(400).send(error.message))
});

export default apiRouter;
import express from 'express';
import { Company, User } from '../types';
// import initSqlJs from 'sqlite3';

// const db = new initSqlJs.Database('./chinook.db');

const apiRouter = express.Router();

const users: User[] = [];

apiRouter.route('/companies').get(
    (req, res) => {
        const company: Company[] = [{ id: '0', name: 'new' }, { id: '1', name: 'new1' }, { id: '2', name: 'new2' }, { id: '3', name: 'new3' }];
        res.json(company);
});

apiRouter.route('/user').post(
    (req, res) => {
        console.log(req);
        let newUser: User = null;
        // try {
        //     newUser = <User>JSON.parse(req.body.user); 
        // } catch (e) {
        //     newUser = <User>req.body.user;
        // }
        // users.push(newUser);
        // res.send();
});

apiRouter.route('/login').get(
    (req, res) => {
        let userData: User = null;
        try {
            userData = <User>JSON.parse(req.body.user); 
        } catch (e) {
            userData = <User>req.body.user;
        }
        let currentUser = users.filter((user: User) => user.email === userData.email && user.password === userData.password)[0];

        if (currentUser) res.send();
        else res.status(400).send();
});

apiRouter.route('/edit').put(
    (req, res) => {
        let userData: User = null;
        try {
            userData = <User>JSON.parse(req.body.user); 
        } catch (e) {
            userData = <User>req.body.user;
        }
        let currentUser = users.filter((user: User) => user.id === userData.id)[0];

        if (!currentUser) res.status(400).send();
});

export default apiRouter;
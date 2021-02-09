import express from 'express';
import { User, Company } from '../types';

const apiRouter = express.Router();

const users: User[] = [];

apiRouter.route('/companies').get(
    (req, res) => {
        const company: Company[] = [{ id: '0', name: 'new' }, { id: '1', name: 'new1' }, { id: '2', name: 'new2' }];
        res.json(company);
});

apiRouter.route('/user').post(
    (req, res) => {
        let newUser: User = null;
        try {
            newUser = <User>JSON.parse(req.body.user); 
        } catch (e) {
            newUser = <User>req.body.user;
        }
        users.push(newUser);
        res.send();
});

apiRouter.route('/login').get(
    (req, res) => {
        let currentUser: User = null;
        try {
            currentUser = <User>JSON.parse(req.body.user); 
        } catch (e) {
            currentUser = <User>req.body.user;
        }
        let ue = users.filter((user: User) => user.email === currentUser.email && user.password === currentUser.password)[0];

        if (ue) res.send();
        else res.status(400).send();
});

apiRouter.route('/edit').put(
    // errorCatcher(async (req, res) => {
    //   await taskService.edit(req.body);
  
    //   res.status().send();
    // })
);

export default apiRouter;
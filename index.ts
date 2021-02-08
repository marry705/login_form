const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const initSqlJs = require('sql.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

app.get('/api/company', (req, res) => {
    const company = [{ id: '0', name: 'new' }, { id: '1', name: 'new1' }, { id: '2', name: 'new2' }];
    res.json(company);
});

app.post('/api/user', (req, res) => {
  let newUser = null;
  try {
    newUser = JSON.parse(req.body.user); 
  } catch (e) {
    newUser = req.body.user;
  }
  users.push(newUser);
  console.log(users);
  res.send();
});

app.post('/api/login', (req, res) => {
  let currentUser = null;
  try {
    currentUser = JSON.parse(req.body.user); 
  } catch (e) {
    currentUser = req.body.user;
  }
  let ue = users.filter((user) => user.email === currentUser.email && user.password === currentUser.password)[0];
  if (ue) res.send();
  else res.status(400).send();
});

const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'dist/')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/', 'index.html'));
});

app.listen(port);

console.log('App is listening on port ' + port);

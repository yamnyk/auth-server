const USERS = require('../collections/users.json');
const User = require('../models/user.model');

const express = require('express');
const fs = require('fs');
const usersRoutes = express.Router();

usersRoutes.get('/', (req, resp) => {
  resp.send(USERS);
})

usersRoutes.post('/register', (req, resp) => {
  const {name, age, position, stats} = req.body;
  try {
    let newUser = USERS.find(u => (u.name === name && u.age === age && u.position === position));
    
    if (!newUser) {
      newUser = new User(name, age, position, stats);
      USERS.push(newUser);
      fs.writeFile('src/collections/users.json', JSON.stringify(USERS), err => handleUsersUpdate(err, resp));
    }
    
    resp.send({
      status: 'user successfully saved',
      data: newUser
    });
  } catch (e) {
    resp.status(400);
    resp.send(e)
  }
});

usersRoutes.get('/:id', (req, resp) => {
  resp.send(USERS.find(u => u.id === +req.params.id));
});

usersRoutes.get

module.exports = usersRoutes;

function handleUsersUpdate(err) {
  if (err) {
    resp.status(400);
    resp.send(err);
  }
  console.log('users file updated')
}
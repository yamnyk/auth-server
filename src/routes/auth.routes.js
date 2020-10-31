const USERS = require('../collections/users.json');
const User = require('../models/user.model');
const {SECRET_KEY, dbConnect} = require('../config');

const express = require('express');
const fs = require('fs');
const authRoutes = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

authRoutes.post('/register', (req, resp,) => {
  const {name, age, position, stats, email, password} = req.body;
  
  // usersCollection.findOne({email}, (err,user) => {
  //   if (!user) {
  //     usersCollection.insertOne(req.body, () => {
  //       resp.send(req.body);
  //     })
  //   } else {
  //     resp.send({
  //       message: 'this user is already exists'
  //     })
  //   }
  // })
  
  try {
    let newUser = USERS.find(u => (u.email === email && bcrypt.compareSync(password, u.password)));

    if (!newUser) {
      bcrypt.hash(password, 10, (err, hashedPass) => {
        newUser = new User(email, hashedPass, name, age, position, stats);
        USERS.push(newUser);
        fs.writeFile('src/collections/users.json', JSON.stringify(USERS), err => handleUsersUpdate(err, resp));

        resp.send({
          status: 'user successfully saved',
          data: newUser
        });
      });
    }

    resp.send({
      status: 'that user already exists'
    })

  } catch (e) {
    resp.status(400);
    resp.send(e)
  }
});

authRoutes.post('/login', (req, resp) => {
  const user = USERS.find(u => u.email === req.body.email);
  
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const payload = {
      id: user.id,
      name: user.name,
      age: user.age,
      position: user.position,
      email: user.email,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '30 days'});
    resp.send({
      token: token
    });
  } else {
    resp.status(404)
    resp.send({
      error: "wrong email or password"
    })
  }
})

module.exports = authRoutes;
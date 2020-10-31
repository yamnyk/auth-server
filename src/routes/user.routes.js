const USERS = require('../collections/users.json');
const User = require('../models/user.model');

const express = require('express');
const fs = require('fs');
const usersRoutes = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

usersRoutes.get('/', (req, resp) => {
  resp.send(USERS);
})

usersRoutes.get('/:id', (req, resp) => {
  resp.send(USERS.find(u => u.id === +req.params.id));
});

module.exports = usersRoutes;
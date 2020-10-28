const USERS = require('../collections/users.json');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (req, resp, next) => {
  if (req.params.endpoint !== 'login') {
    const token = req.headers['authorization'];
    debugger
    if(!token) {
      resp.json({
        error: 'no authorisation'
      })
    }
    const decodedUser = jwt.verify(token, config.SECRET_KEY);
    if (USERS.some(u => u.email === decodedUser.email && u.position === decodedUser.position)) {
      next();
    } else {
      resp.status(404)
      resp.json({
        error: 'wrong credentials'
      })
    }
  } else {
    next();
  }
}
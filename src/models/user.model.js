const idGenerator = require('../utils/idGenerator');

module.exports = function User(email, password, name, age, position, stats = []) {
  this.id = idGenerator();
  this.email = email;
  this.password = password;
  this.name = name;
  this.age = age;
  this.position = position;
  this.stats = stats;
  this.created = new Date();
}
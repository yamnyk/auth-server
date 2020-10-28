const idGenerator = require('../utils/idGenerator');

module.exports = function User(name, age, position, stats = []) {
  this.id = idGenerator();
  this.name = name;
  this.age = age;
  this.position = position;
  this.stats = stats;
}
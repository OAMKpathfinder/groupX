var db = require('../database');


var user={
  get: function(username, callback) {
    return db.query('SELECT id, username, password FROM users WHERE username = ?', [username], callback);
  }
};

module.exports = user;
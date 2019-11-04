var express = require('express');
var router = express.Router();
var borrow = require('../models/borrow');
const passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var isAuthenticated = require('../auth');

passport.use(new BasicStrategy(
  function(username, password, done) {
      if (!isAuthenticated(username,password)) { 
        return done(null, false); 
      }
      return done(null, username);
  }
));

router.get('/:id?', function(req, res, next) {
  if (req.params.id) {
    borrow.getById(req.params.id, function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result.rows);
      }
    });
  } else {
    borrow.get(function(err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result.rows);
      }
    });
  }
});


router.post('/', 
passport.authenticate('basic', { session: false }),
function(req, res, next) {
  borrow.add(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});

router.delete('/:id', 
passport.authenticate('basic', { session: false }),
function(req, res, next) {
  borrow.delete(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});


router.put('/:id', 
passport.authenticate('basic', { session: false }),
function(req, res, next) {
  borrow.update(req.params.id, req.body, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result.rows);
    }
  });
});
module.exports = router;
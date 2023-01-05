const express = require('express');
const router = express.Router();
const path = require('path');
const DBlogin = require('../db/connection').DBlogin;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


router.post('/login', (req, res) => {
  DBlogin();
  console.log(req.body);
  const { username, password } = req.body;


  // Use Passport to authenticate the login request
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.send({ success: false, message: info.message });
    }
    req.login(user, (error) => {
      if (error) {
        return next(error);
      }
      req.session.loggedIn = true;
      return res.send({ success: true, message: 'Log in success, redirecting you to homepage' });
    });
  });
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/login.html'));
});

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');


// Define the login route
router.post('/login', (req, res, next) => {
  console.log(req.body);
  // Authenticate the user using the local strategy
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.send({ success: false, message: 'Invalid username or password' });
    }
    req.login(user, (error) => {
      if (error) {
        return next(error);
      }
      req.session.loggedIn = true;
      return res.send({ success: true, message: 'Login success, redirecting you to homepage in 3 seconds' });
    });
  })
  
  (req, res, next);
});




router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/login.html'));
});

module.exports = router;

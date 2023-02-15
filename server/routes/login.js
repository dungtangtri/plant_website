const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');


// Define the login route
router.post('/login', (req, res, next) => {
  console.log(req.body.csrf);
  if (!req.body.csrf) {
    // Return an error if the CSRF token is missing
    return res.send({ message: 'CSRF token missing' });
  }

  // Check if the CSRF token in the request body matches the one in the session
  if (req.body.csrf !== req.csrfToken()) {
    // Return an error if the CSRF token is invalid
    return res.send({ message: 'CSRF token invalid' });
  } else {
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
        res.send({ success: true, message: 'Login success, redirecting you to homepage in 3 seconds' });
        return;
      });
    })

      (req, res, next);
  }
});




router.get('/login', (req, res) => {
  console.log(req.csrfToken());
  res.render('login', { csrfToken: req.csrfToken() });
});

module.exports = router;

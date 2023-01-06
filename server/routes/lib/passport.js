const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../../db/connection').config;
const sql = require('mssql');
const validatePassword = require('./PasswordHash').validatePassword;

passport.use(new LocalStrategy((username, password, done) => {
  // Query the database to find the user with the matching username
  sql.connect(config, (err) => {
    if (err) {
      console.log(err);
      return done(err);
    }
    const request = new sql.Request();
    request.input('username', sql.NVarChar, username);
    request.query('SELECT * FROM users WHERE username = @username', (err, result) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (result.recordset.length === 0) {
        // No user found with the given username
        return done(null, false);
      }
      // User found, now compare the hashed password stored in the database with the plain text password provided by the user
      const user = result.recordset[0];
      try {
        let valid = validatePassword(password, user.password, user.salt);
        if (valid == true) {
          // Passwords match, return the user object
          return done(null, user);
        } else {
          // Passwords don't match, return an error message
          return done(null, false);
        }
      } catch (err) {
        console.log(err);
        return done(err);
      }
    });
  });
}));


// Serialize and deserialize the user object for passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  sql.connect(config, (err) => {
    if (err) {
      console.log(err);
      return done(err);
    }
    const request = new sql.Request();
    request.input('id', sql.Int, id);
    request.query('SELECT * FROM users WHERE id = @id', (err, result) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      return done(null, result.recordset[0]);
    });
  });
});

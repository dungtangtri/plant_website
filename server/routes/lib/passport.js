const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const connection = require('../../db/connection').connection


passport.use(new LocalStrategy(
    (username, password, done) => {
      // Query the database to find the user with the matching email
      const query = `SELECT * FROM users WHERE Username = '${username}'`;
      connection.query(query, (error, results) => {
        if (error) {
          return done(error);
        }
  
        // If no user was found, return an error message
        if (results.length === 0) {
          return done(null, false, { message: 'Invalid username or password' });
        }
  
        // Retrieve the salt and hashed password from the database
        const salt = results[0].Salt;
        const hashedPassword = results[0].Password;
  
        // Generate a new hash of the password using the salt
        const newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  
        // Compare the generated hash to the hashed password in the database
        if (newHash === hashedPassword) {
          // If the hashes match, log the user in
          return done(null, results[0]);
        } else {
          // If the hashes do not match, return an error message
          return done(null, false, { message: 'Invalid email or password' });
        }
      });
    }
  ));
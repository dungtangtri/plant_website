const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../db/connection').connection;

async function DBlogin() {
  try {
    await connection.connect();
  }
  catch (error) {
    console.log(error);
    setTimeout(DBlogin, 5000);
  }
}
router.post('/login', (req, res) => {
  DBlogin();
  console.log(req.body);
  const { username, password } = req.body;


  // Query database to verify email and password
  const query = `
    SELECT *
    FROM users
    WHERE Username = '${username}' AND Password = '${password}'
  `;

  const request = connection.request();
  request.query(query, (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }
    if (result.recordset.length > 0) {
      // Email and password are correct, log in the user
      req.session.loggedIn = true;
      res.send({ success: true, message: 'Log in success, redirecting you to homepage in 3 seconds' });
    } else {
      // Email and password are incorrect, return error message
      res.send({ success: false, message: 'Invalid username or password' });
    }
  })
})

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/login.html'));
});

module.exports = router;

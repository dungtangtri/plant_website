const express = require('express');
const router = express.Router();
const path = require('path');
const sql = require('mssql');
const genPassword = require('./lib/PasswordHash').genPassword;
const connection = require('../db/connection').connection;
router.get('/register', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../client/register.html'));
});

router.post('/register', (req, res, next) => {
    console.log(req.body);
    const saltHash = genPassword(req.body.password);
    console.log(saltHash);
    const newUsername = req.body.username;
    const newSalt = saltHash.salt;
    const newPassword = saltHash.hash;

    try {
        function request(query_test) {
            connection.connect();
            const result = connection.request()
            .input('newUsername', sql.NVarChar, newUsername)
            .query(query_test);
            return result.recordset;
        }
        if (request('SELECT * FROM users WHERE username = @newUsername') == 0) {
            connection.connect().request()
            .input('newUsername', sql.NVarChar, newUsername)
            .query(`INSERT INTO users (username, password, salt) VALUES ( @newUsername , '${newPassword}', '${newSalt}'`);
            res.send({ success: true, message: 'Signing up success, redirecting you to homepage in 3 seconds' });
        }
        else {
            res.send({ success: false, message: 'Username is taken, please register with another username' });
        }

    } catch (error) {
        console.log(error);
        res.send({ success: false, message: 'Error, please register again !' });
    }
});

module.exports = router;
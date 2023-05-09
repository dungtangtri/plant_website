const express = require('express');
const router = express.Router();
const path = require('path');


// 401 : unauthorized
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.username == 'admin') {
        next();
    } else {
        res.status(401).sendFile(path.join(__dirname, "../../views/404.html"));;
    }
};

router.get('/admin', isAdmin, (req, res) => {
    res.send('Admin route ');
});

module.exports = router;
module.exports.isAdmin = isAdmin;

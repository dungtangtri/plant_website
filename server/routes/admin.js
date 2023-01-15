const express = require('express');
const router = express.Router();
const path = require('path');



const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.username == 'admin') {
        next();
    } else {
        res.status(401).sendFile(path.join(__dirname, "../../client/404.html"));;
    }
};

router.get('/admin', isAdmin, (req, res, next) => {
    res.send('Admin route ');
});



module.exports = router;
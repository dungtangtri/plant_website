const express = require('express');
const router = express.Router();

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.username == 'admin') {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
};

router.get('/admin', isAdmin, (req, res, next) => {
    res.send('Admin route ');
});



module.exports = router;
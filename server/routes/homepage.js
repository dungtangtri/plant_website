const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        let user = {
            name: req.user.username,
            status : true
        }
        res.render('index', { user: user });
    }
    catch (error) {
        console.log("Not Logged In");
        let user = {
            name: "user",
            status : false
        }
        res.render('index', { user: user })
    }
})

module.exports = router;
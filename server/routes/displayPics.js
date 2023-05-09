const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../db/connection').config;

//Saving image as binary then retrieve them
router.get('/images/:id', (req, res) => {
    const id = req.params.id;
    const connection = new sql.ConnectionPool(config, (err) => {
        const request = new sql.Request(connection);
        request.input('id', sql.NVarChar, id);
        request.query('SELECT img FROM plants_img WHERE id = @id', (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving image from database');
            } else {
                const image = result.recordset[0].img;
                const binaryData = Buffer.from(image, 'base64');
                res.contentType('image/jpeg');
                res.send(binaryData);
            }
        });
    });
});

module.exports = router;
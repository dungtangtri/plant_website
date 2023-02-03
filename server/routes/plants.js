const express = require('express');
const router = express.Router();
const sql = require('mssql');

const connection = require('../db/connection').connection;

async function searchPlants(searchTerm) {
  try {
    await connection.connect();
    const result = await connection.request()
      .input('searchTerm', sql.NVarChar, searchTerm)
      .query('SELECT * FROM plants WHERE FREETEXT(Name, @searchTerm)');
    return result.recordset;
  } catch (err) {
    console.error(err);
  }
}

router.get('/search', async (req, res) => {
  const searchTerm = req.query.q;
  const searchResults = await searchPlants(searchTerm);
  res.send(searchResults);
  console.log(req.query);
});

module.exports = router;

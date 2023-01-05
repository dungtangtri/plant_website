const sql = require('mssql');
const dotenv = require('dotenv').config();

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true
  }
};
const connection = new sql.ConnectionPool(config);

connection.on('error', (err) => {
  console.error(err);
});

async function DBlogin() {
  try {
    await connection.connect();
    console.log('Connected to the database');
  }
  catch (error) {
    console.log(error);
    setTimeout(DBlogin, 5000);
  }
};
DBlogin();

module.exports.DBlogin = DBlogin;
module.exports.config = config;
module.exports.connection = connection;

const sql = require('mssql');
const dotenv = require('dotenv').config();
const config = {
  user: process.env.DB_USERNAME ,
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

connection.connect().then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.error(err);
  setTimeout(connection, 5000);
});

module.exports = connection;

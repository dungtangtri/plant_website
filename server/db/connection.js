const sql = require('mssql');

const config = {
  user: 'dungtangtri',
  password: 'thaoTit02',
  server: 'dzung.database.windows.net',
  database: 'Ky_thuat_phan_mem_ung_dung',
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
});

module.exports = connection;

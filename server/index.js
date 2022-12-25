const express = require('express');
const app = express();
const sql = require('mssql');
const path = require('path');
const plantsRouter = require('./routes/plants');
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.use('/plants', plantsRouter);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

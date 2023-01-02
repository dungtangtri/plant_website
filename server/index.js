const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv').config();
const plantsRouter = require('./routes/plants');
const loginRouter = require('./routes/login');

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json());

app.use(express.static('client'));
app.use('/plants', plantsRouter);
app.use('/', loginRouter);








app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname,"../client/404.html"));
});

const port =  3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const MSSQLStore = require('connect-mssql-v2');
const dotenv = require('dotenv').config();
const plantsRouter = require('./routes/plants');
const loginRouter = require('./routes/login');



const config = {
  config: {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: true
    }
  }
}; 
const options = {
  table: 'sessions', // table name to store sessions in
  ttl: 1000 * 60 * 60 * 24,
  autoRemoveInterval: 1800 // check for expired sessions every 30 minutes
};

app.use(session({

  store: new MSSQLStore(config, options),
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));


app.use(express.json());
express.urlencoded({ extended: true });

app.use(express.static('client'));
app.use('/plants', plantsRouter);
app.use('/', loginRouter);








app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const express = require('express');
const session = require('express-session');
const MSSQLStore = require('connect-mssql-v2');
const app = express();
const passport = require('passport');
const path = require('path');
const dotenv = require('dotenv').config();

const DBconfig = require('./db/connection').config;
const plantsRouter = require('./routes/plants');
const loginRouter = require('./routes/login');


const options = {
  ttl: 1000 * 60 * 60 * 24,
  autoRemoveInterval: 1800, // check for expired sessions every 30 minutes
};

app.use(
  session({

    store: new MSSQLStore(DBconfig, options),
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie : {
      maxAge: 1000 * 60 * 60 * 24,
    }
  }));


app.use(express.json());
express.urlencoded({ extended: true });

app.use(express.static('client'));

require('./routes/lib/passport.js');
app.use(passport.initialize());
app.use(passport.session());

app.use('/plants', plantsRouter);
app.use('/', loginRouter);








app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

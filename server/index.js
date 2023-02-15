const express = require('express');
const session = require('express-session');
const MSSQLStore = require('connect-mssql-v2');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const passport = require('passport');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const csurf = require('csurf');


const DBconfig = require('./db/connection').config;
const plantsRouter = require('./routes/plants');
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const uploadRouter = require('./routes/uploadPics');
const displayPics = require('./routes/displayPics');
const options = {
  ttl: 1000 * 60 * 60 * 24,
  autoRemoveInterval: 1800, // check for expired sessions every 30 minutes
};


app.use(express.json());
express.urlencoded({ extended: true });

app.use(express.static('public'));
app.set('view engine', 'ejs');



var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: "Too many requests, please try again after 1 minute! "
});
app.use(limiter);

app.use(
  session({
    store: new MSSQLStore(DBconfig, options),
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    }
  }));
app.use(csurf({  }));
app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);




require('./routes/lib/passport.js');
app.use(passport.initialize());
app.use(passport.session());


app.use('/', plantsRouter);
app.use('/', loginRouter);
app.use('/', adminRouter);
app.use('/', logoutRouter);
app.use('/', registerRouter);
app.use('/', uploadRouter);
app.use('/', displayPics);

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../views/404.html"));
});

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

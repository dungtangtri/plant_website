const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const plantsRouter = require('./routes/plants');
const loginRouter = require('./routes/login');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json());

app.use(express.static('client'));
app.use('/plants', plantsRouter);
app.use('/', loginRouter);

const port =  3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

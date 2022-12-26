const express = require('express');
const app = express();
const plantsRouter = require('./routes/plants.js');

app.use(express.static('client'));
app.use('/plants', plantsRouter);

const port =  3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

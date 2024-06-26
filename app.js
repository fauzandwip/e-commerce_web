if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes'));
app.use(require('./middlewares/errorHandler'));

module.exports = app;

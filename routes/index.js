const express = require('express');

const app = express();

app.use(require('./transaccion'));

module.exports = app;
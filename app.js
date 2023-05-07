var express = require('express');
var path = require('path');
var logger = require('morgan');

require('dotenv').config();

var transactionRouter = require('./routes/transaction');
const authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/transaction', transactionRouter);
app.use('/auth', authRouter);

app.listen(3002, () => {
    console.log(`Server running on port ${3002}`);
})

module.exports = app;

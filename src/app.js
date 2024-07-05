const express = require('express');
const { default: helmet } = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init db

// init routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'WSV eCommerce'
    });
});

// handling routes

module.exports = app;

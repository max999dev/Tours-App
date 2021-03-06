const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/userRoutes');

// Middleware
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

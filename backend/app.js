const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')

//Route import
app.use(express.json());
const product = require('./routes/productRoute');
app.use("/api/v1", product);

//add error middleware for errors handling
app.use(errorMiddleware);

module.exports = app
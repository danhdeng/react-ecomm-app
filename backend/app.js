const express = require('express');
const app = express();

//Route import
app.use(express.json());
const product= require('./routes/productRoute');
app.use("/api", product);

module.exports =app
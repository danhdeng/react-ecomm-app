const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser= require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload= require('express-fileupload');
//Route import
const product = require('./routes/productRoute');
const user=require('./routes/userRoute');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use("/api/v1", product);
app.use("/api/v1", user);

//add error middleware for errors handling
app.use(errorMiddleware);

module.exports = app
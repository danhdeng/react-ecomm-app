const express = require('express');
const app = express();
const cors = require('cors');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
//Route import
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const test=require('./routes/testRoute');


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static('images'));

//app.use(fileUpload());
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", test);


//add error middleware for errors handling
app.use(errorMiddleware);

module.exports = app
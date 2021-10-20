# react-ecomm-app

Backend: NodeJS, Express, MongoDB

Frontend: React, Redux

# Data to test the product create api without user

{
    "name":"product1",
    "price":1234,
    "description": "product one description",
    "category": "mouse",
    "images":{
        "public_id": "sampleiamge",
        "url": "sampleiamgeUrl"
    }
}

# Price and Ratings filter

price[gt]
price[lt]
price[gte]
ratings[gt]
ratings[lt]
ratings[lte]

# use multer library to handle images upload to nodejs server

yarn add multer

# use built-in function uitls to show the reqeust cookie data in json format

var util = require("util");
console.log(util.inspect(req.cookies, {showHidden: false, depth: null}));
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

# execute code onliness

https://www.tutorialspoint.com/codingground.htm

# execute nodejs onliness

https://www.tutorialspoint.com/execute_nodejs_online.php

# nodemailer get the link to preview the email

 await transporter.sendMail(mailOptions).then(info=>{
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    });

# libraries for Frontend

yarn add axios react-alert react-alert-template-basic react-helmet react-redux redux redux-thunk redux-devtools-extension react-router-dom overlay-navbar

yarn add react-icons

yarn add webfontloader

# dynamic load google webfont in reactjs

 useEffect(() =>{
    webfont.load({
      google:{
        families:["Roboto", "Doroid Sans", "Chilanka"]
      },
    });
  },[]);

# bennett clippy css clippy-maker

https://bennettfeely.com/clippy/

# Browserslist: caniuse-lite is outdated. Please run to update:

npx browserslist@latest --update-db

# React Redux implementation

1. config the redux store

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({

});

let initialState = {};

const middleware = [thunk];

export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

2. add the store to the index.js file

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);




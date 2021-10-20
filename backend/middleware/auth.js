const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const jwt= require('jsonwebtoken');
var util = require("util");
exports.isAuthenticatedUser= catchAsyncErrors(async (req, res, next) => {
    //console.log(`request cookie: ${req.cookies}`);
    console.log(util.inspect(req.cookies, {showHidden: false, depth: null}));
    const token = req.cookies.ecommerce_store_token;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decodedData=jwt.verify(token, process.env.JWT_SECRET);
    req.user=await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles=(...roles)=>{
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
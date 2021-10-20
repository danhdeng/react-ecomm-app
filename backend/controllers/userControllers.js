const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendEmail=require('../utils/sendEmail');
const jwtToken= require('../utils/jwtToken');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken');

//Register a new User
exports.registerUser= catchAsyncErrors(async (req, res, next) => {
    const {name, email, password}=req.body;

    const user=await User.create({
        name,
        mail,
        password,
        avatar:{
            public_id:"",
            url:"",
        },
    });
    sendToken(user, 201, res);
});

//login User

exports.loginUser= catchAsyncErrors(async (req, res, next)=>{
    const {email, password}=req.body;

    //check if the user has email and password
    if(!email || !password){
        return new ErrorHander('Please Enter Email and Password',400);
    }

    const user=await User.findOne({email}).select("+password");
    if(!user){
        return new ErrorHandler("Invalid Email or Password",401);
    }
    const isPasswordMatched=await User.comparePassword(password);
    if(!isPasswordMatched){
        return new ErrorHandler("Invalid Email or Password",401);
    }
    sendToken(user, 200, res);
});

//logout User

exports.logoutUser= catchAsyncErrors(async (req, res, next) => {
    res.cookie("ecommerce_store_token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    
    res.status(200).json({
        success: true,
        message:"User had been logged out"
    })
});

//forgot password
exports.forgotPassword= catchAsyncErrors(async (req, res, next) => {
    const user=await User.findOne({email: req.body.email});

    if(!user){
        return new ErrorHandler("User Not Found",404);
    }

    //get resetPassword Token
    const resetToken=User.getResetPasswordToken();
    await user.save({validateBeforeSave: false});
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message=``;  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try{
        await sendEmail({
            email: user.email,
            subject: `Ecommerce store password recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message:`Email sent to ${user.email} successfully`,
        });
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500))
    }
    

})
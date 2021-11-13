const User = require('../models/userModel');
const TestUser = require('../models/testModel');
const mongoose = require('mongoose');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail');
const jwtToken = require('../utils/jwtToken');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken');
// const multer = require("multer");

exports.registerUserFunc=catchAsyncErrors(async (req, res, next) => {
    console.log("test register");
    const { name, email, password } = req.body;
    const url = req.protocol + '://' + req.get('host')
    // const user = new TestUser({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     profileImg: url + '/images/user/' + req.file.filename
    // });
    // await user.save().then(result => {
    //     res.status(201).json({
    //         message: "User registered successfully!",
    //         userCreated: {
    //             _id: result._id,
    //             profileImg: result.profileImg
    //         }
    //     })
    // }).catch(err => {
    //     console.log(err),
    //         res.status(500).json({
    //             error: err
    //         });
    // })
     const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "test_profile",
            url: url + '/images/user/' + req.file.filename
        },
    });
    sendToken(user, 201, res);
});


//Register a new User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    console.log("test register");
    const { name, email, password } = req.body;
    const url = req.protocol + '://' + req.get('host')
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "test_profile",
            url: url + '/images/user/' + req.file.filename
        },
    });
    sendToken(user, 201, res);
});

//login User

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //check if the user has email and password
    if (!email || !password) {
        return next(new ErrorHander('Please Enter Email and Password', 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    sendToken(user, 200, res);
});

//logout User

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("ecommerce_store_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "User had been logged out"
    })
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    //get resetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce store password recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
});

//Reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //create hash token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password do not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

//Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    });
})

//Update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password do not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        // TODO:remove the previous image

        //TODO: add new imageId and url
        newUserData.avatar = {
            public_id: "test_profile",
            url: "../../../images/Profile.png"
        };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

//Get all User --admin Only
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
});

//Get single user --admin Only
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    });
});

//Update User Role --admin Only
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});



//Delete  user --admin Only
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.find(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }
    const imageId = user.avatar.public_id;
    // TODO: remove images from user folder
    await user.remove();
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    });
})
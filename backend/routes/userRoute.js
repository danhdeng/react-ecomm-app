const express=require('express');
const {
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
    registerUserFunc
}=require('../controllers/userControllers');
const {isAuthenticatedUser, authorizeRoles}=require('../middleware/auth');
const router=express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// const DIR = './public/';
const DIR = './images/user/';
const User= require('../models/testModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


// router.route('/register').post(upload.single('profileImg'),registerUser);
router.post('/register', upload.single('profileImg'), registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

//routes for admin user only
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'), getAllUsers);

router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router;



const express = require('express');
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview,
    getAdminProducts,
} = require('../controllers/productController');

const multer = require('multer');
const DIR = './images/product/';
const { v4: uuidv4 } = require('uuid');


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



const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
    .route('/admin/product/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), upload.array("imgCollection",10), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route('/review')
    .put(isAuthenticatedUser, createProductReview);

router.route('/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
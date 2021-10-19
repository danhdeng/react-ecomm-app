const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures')
//admin only functions

// Create product -- admin only

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

//update product detail --admin only
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    });
});

//delete product --admin only

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
});

//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }
    res.status(200).json({
        success: true,
        product
    });
})

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const reslutPerPage = 5;
    const productCount = await Product.countDocuments();
    const apifeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(reslutPerPage);

    const products = await apifeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount
    });
});
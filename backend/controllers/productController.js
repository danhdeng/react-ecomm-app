const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures')
//admin only functions

// Create product -- admin only

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user=req.user.id;
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
    //TODO:Delete images
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


//Get products for admin --admin Only
exports.getAdminProduct= catchAsyncErrors(async (req, res, next) => {
    const products=await Product.find();
    res.status(200).json({
        success: true,
        products,
    });
})
//Create New Review or update the review
exports.createProductReview= catchAsyncErrors(async (req, res, next) => {
    const {rating, comment, productId}=req.body;

    const review={
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };
    const product =await Product.findById(productId);

    const isReviewed=product.reviews.find(
        (rev)=>rev.user.toString()===req.user._id.toString()
    );
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){
                (rev.rating=rating),(rev.comment=comment);
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    let avg=0;
    product.reviews.forEach((rev)=>{
        avg +=rev.rating;
    });
    product.ratings=avg/product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    });
});

//Delete review
exports.deleteReview= catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    const reviews=product.reviews.filter(
        (rev)=>rev._id.toString() !==req.query.id.toString()
    );
    let avg=0;
    reviews.forEach((rev)=>{
        avg += rev.rating;
    })
    if(reviews.length===0){
        ratings=0;
    }
    else{
        ratings=avg/reviews.length;
    }
    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );
    
    res.status(200).json({
        success: true,
    })
});

//Get All reviews of a product
exports.getProductReviews= catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});


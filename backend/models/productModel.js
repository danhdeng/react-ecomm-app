const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        Type: String,
        required: [true, "Please Enter Product Name"]
    },
    description: {
        Type: String,
        required: [true, "Please Enter Product Description"]
    },
    name: {
        Type: Number,
        required: [true, "Please Enter Product Price"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
    ],
    catgory: {
        Type: String,
        required: [true, "Please Enter Product Category"]
    },
    stock: {
        Type: Number,
        required: [true, "please Enter Product Stock"],
        maxLength: [4, "stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Product", productSchema)
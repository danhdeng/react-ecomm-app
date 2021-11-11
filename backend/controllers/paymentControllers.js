const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Stripe = require('stripe');

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "cad",
        metadata: {
            company: "Danvan Inc",
        },
    });
    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})
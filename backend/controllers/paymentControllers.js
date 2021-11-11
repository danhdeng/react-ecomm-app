const catchAsyncErrors = require('../middleware/catchAsyncErrors');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Stripe = require('stripe');
// const stripe = Stripe('sk_test_51JKLHHCLW3BdAjQbX6Fue8K8ALpOxRmpgSokI9KuzeRc3eJ6QHBIJhchGAi2fE2cw1AsvWOXAtBffjscgVgRSANI000kK8Y50K');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
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
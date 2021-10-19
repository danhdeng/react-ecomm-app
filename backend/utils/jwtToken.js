//Crerate web token and save it in the cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    //cookie options
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie("ecommerce_store_token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
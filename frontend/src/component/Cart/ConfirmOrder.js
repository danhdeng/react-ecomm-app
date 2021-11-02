import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MetaData } from '../layout/MetaData';
import { CheckoutSteps } from './CheckoutSteps';
import './ConfirmOrder.css';
export const ConfirmOrder = ({history}) => {
    const {shippingInfo, cartItems} =useSelector((state) => state.cartItems);

    const {user} = useSelector((state) => state.user);
    const subtotal=cartItems.reduce((acc, item) =>acc +item.quantity* item.price, 0);

    const shipppingCharges=subtotal>1000 ? 0 : 15;
    const tax=subtotal *0.13;
    const totalPrice = subtotal +tax + shipppingCharges;
    const address=`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    const processToPayment=()=>{
        const data={
            subtotal,
            shipppingCharges,
            tax,
            totalPrice,
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        history.push("/process/payment");
    };
    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div>
                <div>
                    <div className="confirmShippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmShippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>      
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>    
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {
                                cartItems && cartItems.map((item)=>(
                                    <div key={item.product}>
                                        <img src={item.image} alt="product" />
                                        <Link to={`/product/${item.prodcut}`}>
                                            {item.name}
                                        </Link>{"  "}
                                        <span>
                                            {item.quantity} X {`$${item.price}`} ={" "}
                                            <b>{`$${item.quantity * item.price}`}</b>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>      
                </div>
                {/* */}
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <p>Subtotal:</p>
                            <span>{`$${subtotal}`}</span>
                        </div>
                        <div>
                            <p>Shipping charges:</p>
                            <span>{`$${shipppingCharges}`}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>{`$${tax}`}</span>
                        </div>
                    </div>
                    <div className="orderSummaryTotal">
                            <p>Total:</p>
                            <span>{`$${totalPrice}`}</span>
                            <button onClick={processToPayment}>Process to Payment</button>
                    </div>
                </div>     
            </div>      
        </Fragment>
    )
}

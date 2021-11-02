import { Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from 'react';
import { Link } from "react-router-dom";
import "./orderSuccess.css";
export const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography>Your Order has been placed successfully</Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

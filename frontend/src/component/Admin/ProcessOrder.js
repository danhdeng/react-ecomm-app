import React, { Fragment, useEffect, useState } from 'react'
import { MetaData } from '../layout/MetaData';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import SideBar from './SideBar';
import {
    getOrderDetails,
    clearErrors,
    updateOrder
} from "../../actions/orderAction";

import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../layout/Loader/Loader';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

export const ProcessOrder = ({ history, match }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(match.params.id, myForm));
    }
    return (
        <div>

        </div>
    )
}

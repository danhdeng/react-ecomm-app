import React, { Fragment } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from "../layout/Loader/Loader";
import { MetaData } from '../layout/MetaData';
import './ProductDetails.css';

export const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    return (
        <Fragment>
            {loading} ?(<Loader />):
            (<Fragment>
                <MetaData title={`${product.name} -- ECOMMERCE`} />
            </Fragment>)
        </Fragment>
    )
}

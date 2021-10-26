import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/all';
import "./Home.css";
import { MetaData } from '../layout/MetaData';
import { ProductCard } from './ProductCard';
import { getProduct } from '../../actions/productAction';

import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

export const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);
    return (
        <Fragment>
            <MetaData title="ECOMMERCE" />
            <div className="banner">
                <p>Welcome to Dan's Ecommerce Store</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>
            <div className="container" id="container">
                {/* {products &&
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))} */}
            </div>
        </Fragment>
    )
}

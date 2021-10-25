import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/all';
import "./Home.css";
import ProductCard from './ProductCard';
import { MetaData } from '../layout/MetaData';

import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

export const Home = () => {
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
                Products Section
            </div>
        </Fragment>
    )
}

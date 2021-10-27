import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import { MetaData } from '../layout/MetaData';
import "./Home.css";
import { ProductCard } from './ProductCard';


export const Home = () => {
    const dispatch = useDispatch();
    const {loading, error, products, productsCount}=useSelector(state => state.products)
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
                {products &&
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>
        </Fragment>
    )
}

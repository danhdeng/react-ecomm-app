import axios from 'axios';
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO
} from '../constants/cartConstants';


//Add Items to shopping cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log(data);

    dispatch({
        type: ADD_TO_CART,
        payLoad: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

//Remove Items from shopping cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payLoad: id,
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));;
};

//Save Shipping information
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payLoad: data,
    });
    localStorage.setItem('shippingInfo', JSON.stringify(data));
}





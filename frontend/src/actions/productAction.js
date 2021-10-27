import axios from 'axios';
import {
    ALL_PRODUCT_FAILURE, ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS, CLEAR_ERRORS
} from '../constants/productContants';


export const getProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        const { data } = await axios.get("http://localhost:3333/api/v1/products");
        console.log(data);

        dispatch({ type: ALL_PRODUCT_SUCCESS, payLoad: data, });
    }
    catch (error) {
        console.log(error);
        dispatch({
            type: ALL_PRODUCT_FAILURE,
            payLoad: error.response.data.message
        })
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}

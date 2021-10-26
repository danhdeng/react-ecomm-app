import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAILURE,
    CLEAR_ERROR
} from '../constants/productContants';
import axios from 'axios';


export const getProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        const { data } = await axios.get("http://localhost:3333/api/v1/products");

        dispatch({ type: ALL_PRODUCT_SUCCESS, payLoad: data, });
    }
    catch (error) {
        console.log(error);
        // dispatch({
        //     type: ALL_PRODUCT_FAILURE,
        // })
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
}

import {
    ALL_PRODUCT_FAILURE, ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS, CLEAR_ERRORS
} from '../constants/productContants';

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payLoad.products,
                productsCount: action.payLoad.productsCount
            }
        case ALL_PRODUCT_FAILURE:
            return {
                loading: false,
                error: action.payLoad
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;

    }
};

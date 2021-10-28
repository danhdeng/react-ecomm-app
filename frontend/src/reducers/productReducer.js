import {
    ADMIN_PRODUCT_FAILURE, ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS, ALL_REVIEW_FAILURE, ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_RESET, DELETE_REVIEW_SUCCESS, NEW_PRODUCT_FAILURE, NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAILURE, NEW_REVIEW_REQUEST, NEW_REVIEW_RESET, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS
} from '../constants/productContants';


export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payLoad.products,
                productsCount: action.payLoad.productsCount,
                resultPerPage: action.payLoad.resultPerPage,
                filteredProductsCount: action.payLoad.filteredProductsCount,
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payLoad,
            };
        case ALL_PRODUCT_FAILURE:
        case ADMIN_PRODUCT_FAILURE:
            return {
                loading: false,
                error: action.payLoad
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payLoad.success,
                product: action.payLoad.product,
            };
        case NEW_PRODUCT_FAILURE:
            return {
                loading: false,
                error: action.payLoad,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payLoad
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payLoad
            };
        case DELETE_PRODUCT_FAILURE:
        case UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payLoad
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payLoad,
            };
        case PRODUCT_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payLoad,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payLoad
            };
        case NEW_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payLoad,
            };
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payLoad,
            };
        case ALL_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payLoad,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payLoad,
            };
        case DELETE_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payLoad,
            };
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};












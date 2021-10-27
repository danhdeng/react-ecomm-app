import axios from 'axios';
import {
    ALL_ORDERS_FAILURE, ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS, MY_ORDERS_FAILURE, MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS, ORDER_DETAILS_FAILURE, ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAILURE, UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS
} from '../constants/orderContants';

export const createOrder = (order) =>async (dispatch)=>{
    try{
        dispatch({type: CREATE_ORDER_REQUEST});
        const config={
            Headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/order/new", order, config);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payLoad: data
        });
    }
    catch(error){
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payLoad: error.response.data.message,
        });
    }
};

//My Orders
export const myOrders = () =>async (dispatch) =>{
    try{
        dispatch({type:MY_ORDERS_REQUEST});
        const { data } = await axios.get("/api/v1/orders/me");
        dispatch({
            type:MY_ORDERS_SUCCESS, 
            payLoad:data.orders
        });

    }catch(error){
        dispatch({
            type: MY_ORDERS_FAILURE,
            payLoad: error.response.data.message,
        });
    }
}

//Get All Orders (admin user only)
export const getAllOrders = () =>async (dispatch) =>{
    try{
        dispatch({ type:ALL_ORDERS_REQUEST});
        const { data } = await axios.get("/api/v1/ordres");
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payLoad: data.orders
        });
    }catch(error){
        dispatch({
            type: ALL_ORDERS_FAILURE,
            payLoad: error.response.data.message,
        });
    }
}

//Update order
export const updateOrder = (id, order) =>async (dispatch) =>{
    try{
        dispatch({ type:UPDATE_ORDER_REQUEST});
        const config={
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payLoad: data.success
        });
    }catch(error){
        dispatch({
            type: UPDATE_ORDER_FAILURE,
            payLoad: error.response.data.message,
        });
    }
};

//Delete Order
export const deleteOrder = (id) =>async (dispatch) =>{
    try{
        dispatch({ type:DELETE_ORDER_REQUEST});
        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch({type:DELETE_ORDER_SUCCESS, payload:data.success});
    }catch(error){
        dispatch({
            type: DELETE_ORDER_FAILURE,
            payLoad: error.response.data.message,
        });
    }
}

//Get Order Details
export const getOrderDetails = (id) =>async (dispatch) =>{
    try{
        dispatch({ type:ORDER_DETAILS_REQUEST});
        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch({type: ORDER_DETAILS_SUCCESS, payLoad: data.order});
    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payLoad: error.response.data.message,
        });
    }
}

//Clearing Errors
export const clearErrors = () =>async (dispatch) =>{
    dispatch({type: CLEAR_ERRORS});
}


import axios from "axios";
import {
    CLEAR_ERRORS, DELETE_USER_FAILURE,
    // RESET_PASSWORD_REQUEST,
    // RESET_PASSWORD_SUCCESS,
    // RESET_PASSWORD_FAILURE,
    // ALL_USERS_REQUEST,
    // ALL_USERS_SUCCESS,
    // ALL_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS, UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS, USER_DETAILS_FAILURE, USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS
} from "../constants/userConstants";

//Login
export const login = (email, password) =>async (dispatch) =>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const config={
            headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/login",{email, password}, config);
        dispatch({type: LOGIN_SUCCESS, data: data.user});
    }
    catch(error){
        dispatch({
            type:LOGIN_FAILURE,
            error:error.response.data.message
        })
    }
};

//Login
export const register = (userData) =>async (dispatch) =>{
    try{
        dispatch({type:REGISTER_USER_REQUEST});
        const config={
            headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/register",userData, config);
        dispatch({type: REGISTER_USER_SUCCESS, data: data.user});
    }
    catch(error){
        dispatch({
            type:REGISTER_USER_FAILURE,
            error:error.response.data.message
        })
    }
};

//Load User
export const loadUser = () =>async (dispatch) =>{
    try{
        dispatch({type:LOAD_USER_REQUEST});
        const { data } = await axios.get("/api/v1/me");
        dispatch({type: LOAD_USER_SUCCESS, data: data.user});
    }
    catch(error){
        dispatch({
            type:LOAD_USER_FAILURE,
            error:error.response.data.message
        })
    }
};

//Logout User
export const logout = () =>async (dispatch) =>{
    try{
        await axios.get("/api/v1/me/logout");
        dispatch({type:LOGOUT_SUCCESS});
    }
    catch(error){
        dispatch({
            type:LOGOUT_FAILURE,
            error:error.response.data.message
        })
    }
};

//Update User Profile 
export const updateProfile = (userData) =>async (dispatch) =>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const config={
            headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/me/update",userData, config);
        dispatch({type: UPDATE_PROFILE_SUCCESS, data: data.success});
    }
    catch(error){
        dispatch({
            type:UPDATE_PROFILE_FAILURE,
            error:error.response.data.message
        })
    }
};

//Update Password
export const updatePassword = (passwords) =>async (dispatch) =>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST});
        const config={
            headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/password/update", passwords, config);
        dispatch({type: UPDATE_PASSWORD_SUCCESS, data: data.success});
    }
    catch(error){
        dispatch({
            type:UPDATE_PASSWORD_FAILURE,
            error:error.response.data.message
        })
    }
};

//Forgot Password
export const forgotPassword = (email) =>async (dispatch) =>{
    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const config={
            headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/password/forgot", email, config);
        dispatch({type: FORGOT_PASSWORD_SUCCESS, data: data.message});
    }
    catch(error){
        dispatch({
            type:FORGOT_PASSWORD_FAILURE,
            error:error.response.data.message
        })
    }
};

//Get User Details
export const getUserDetails = (id) =>async (dispatch) =>{
    try{
        dispatch({type:USER_DETAILS_REQUEST});
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);
        dispatch({type: USER_DETAILS_SUCCESS, data: data.user});
    }
    catch(error){
        dispatch({
            type:USER_DETAILS_FAILURE,
            error:error.response.data.message
        })
    }
};


//Update User Information
export const updateUser = (id,userData) =>async (dispatch) =>{
    try{
        dispatch({type:UPDATE_USER_REQUEST});
        const config={
            headers:{
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/admin/user/${id}`,userData, config);
        dispatch({type: UPDATE_USER_SUCCESS, data: data.user});
    }
    catch(error){
        dispatch({
            type:UPDATE_USER_FAILURE,
            error:error.response.data.message
        })
    }
};


//Delete User

export const deleteUser = (id) =>async (dispatch) =>{
    try{
        dispatch({type:DELETE_USER_REQUEST});
    
        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch({type: DELETE_USER_SUCCESS, data: data.success});
    }
    catch(error){
        dispatch({
            type: DELETE_USER_FAILURE,
            error:error.response.data.message
        })
    }
};








// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
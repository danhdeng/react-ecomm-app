import React, { Fragment, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/userAction";
import "./LoginSignUp.css";


export const LoginSignUp = () => {
    const dispatch = useDispatch();
    const alert=useAlert();
    const {error, loading, isAuthenticated }=useSelector((state) => state.user);

    const loginTab=useRef(null);
    const registerTab=useRef(null);
    const switchTab=useRef(null);
    
    const [loginEmail, setLoginEmail]=useState('');
    const [loginPassword, setLoginPassword]=useState('');

    const [user, setUser]=useState({
        name: "", 
        email: "", 
        password: "",
    });

    const {name, email, password}=user;

    const [avatar, setAvator]=useState("/Profiel.png");

    const [avatarPreview, setAvatorPreview]=useState("/Profiel.png");

    const loginSubmit= (e) =>{
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const registerSubmit= (e) =>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password", avatar);
        dispatch(register(myForm));
    }
    
    return (
        <Fragment>
            
        </Fragment>
    )
}

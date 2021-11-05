import MailOutlineIcon from "@material-ui/icons/MailOutline";
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { Loader } from '../layout/Loader/Loader';
import { MetaData } from '../layout/MetaData';
import './ForgotPassword.css';

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState('');

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);
    return (
        <Fragment>
            {loading ? (<Loader />) :
                (
                    <Fragment>
                        <MetaData title="Forget Password" />
                        <div className="forgotPasswordContainer">
                            <div className="forgotPasswordBox">
                                <h2 className="forgotPasswordHeading">Forgot Password</h2>
                                <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit} >
                                    <div className="forgotPasswordEmail" >
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            placeholder='Email'
                                            required
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type='submit'
                                        value='send'
                                        class="forgotPasswordButton"
                                    />
                                </form>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}
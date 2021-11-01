import React, { Fragment, useEffect, useState } from 'react'
import './resetPassword.css';
import { Loader } from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { MetaData } from '../layout/MetaData';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

export const ResetPassword = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, success, loading } = useSelector((state) => state.resetPassword);
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmedPassword", confirmedPassword);
        dispatch(resetPassword(match.params.token, myForm));
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password updated successfully");
            history.push('/login');

        }
    }, [dispatch, error, alert, history, success]);
    return (
        <Fragment>
            {
                loading ? (<Loader />) :
                    (
                        <Fragment>
                            <MetaData title="Change Password" />
                            <div className="resetPasswordContainer">
                                <div className="resetPasswordBox">
                                    <h2 className="resetPasswordHeading">Update Profile</h2>

                                    <form
                                        className="resetPasswordForm"
                                        onSubmit={resetPasswordSubmit}
                                    >
                                        <div>
                                            <LockOpenIcon />
                                            <input
                                                type="password"
                                                placeholder="New Password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="loginPassword">
                                            <LockIcon />
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                        <input
                                            type="submit"
                                            value="Update"
                                            className="resetPasswordBtn"
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

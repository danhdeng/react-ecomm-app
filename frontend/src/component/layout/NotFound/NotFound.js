import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
export const NotFound = () => {
    return (
        <div className="PageNotFound">
            <ErrorIcon />
            <Typography>Page Not Found</Typography>
            <Link to="/">Home</Link>
        </div>
    );
};

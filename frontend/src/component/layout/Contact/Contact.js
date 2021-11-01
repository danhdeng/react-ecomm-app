import { Button } from '@material-ui/core';
import React from 'react';
import './Contact.css';
export const Contact = () => {
    return (
        <div className="contactContainer">
            <a className="mainBtn" href="mailto:subarudev@gmail.com">
                <Button>Contact: subarudev@gmail.com</Button>
            </a>   
        </div>
    )
}

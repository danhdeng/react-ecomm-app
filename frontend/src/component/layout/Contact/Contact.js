import { Button } from '@material-ui/core';
import React from 'react';
import './Contact.css';
export const Contact = () => {
    return (
        <div className="contactContainer">
      <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
                <Button>Contact: subarudev@gmail.com</Button>
            </a>   
        </div>
    )
}

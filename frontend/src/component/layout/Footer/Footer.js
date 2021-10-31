import React from 'react';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import "./Footer.css";

export const Footer = () => {
    let year = new Date().getFullYear();
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Andriod and IOS mobile phone</p>
                <img src={playStore} alt="Playstore" />
                <img src={appStore} alt="Appstore" />
            </div>
            <div className="midFooter">
                <h1>Dan ECOMMERCE Store.</h1>
                <p>Copyrights {year} &copy; My Ecommerce Store</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://www.instagram.com">instagram</a>
                <a href="http://www.youtube.com">Youtube</a>
                <a href="http://www.facebook.com">Facebook</a>
            </div>
        </footer>
    )
}
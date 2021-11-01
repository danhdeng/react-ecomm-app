import { Avatar, Button, Typography } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instgram';
import YouTubeIcon from '@material-ui/icons/YouTubeIcon';
import React from 'react';
import './aboutSection.css';

export const About = () => {
    const visitInstagram =() => {
        window.location="https//www.instagram.com/";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">Aboutn Us</Typography>
                <div>
                    <div>
                        <Avatar 
                            style={{width:"10vmax", height:"10vmax", margin: "2vmax 0"}}
                            src=""
                            alt="Founder"
                         />
                         <Typography>Dan Deng</Typography>
                         <Button onClick={visitInstagram} color="primary">Visit Instgram</Button>
                        <span>
                            this is a sample website implemented with MERM Stack
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a
              href="https://www.youtube.com/channel/UCO7afj9AUo0zV69pqEYhcjw"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

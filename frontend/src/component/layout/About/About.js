import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
const About = () => {
    const visitInstagram = () => {
        window.location = "https://instagram.com/mohitmehra5609";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar variant = "rounded"
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/mohit786/image/upload/v1656081129/mypic/mst_azxg5n.jpg"
                            alt="Founder"
                        />
                        <Typography>Mohit Mehra</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample E-commerce wesbite made by Mohit Mehra. All the
                            things are made for learning , there is no actual product in the
                            website
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a href="https://instagram.com/mohitmehra5609" target="blank">
                            <LinkedInIcon className="youtubeSvgIcon" />
                        </a>

                        <a href="https://instagram.com/mohitmehra5609" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

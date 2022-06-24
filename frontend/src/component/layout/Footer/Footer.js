import React from "react";
import playStore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import "./Footer.css"


const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Available on Android and Ios Devices</p>
        <img src={playStore} alt="playStore" />
        <img src={appstore} alt="appStore" />
      </div>

      <div className="midFooter">
        <h1>MOHIT STORE</h1>
        <p>Quality Matters For Us</p>
        <p> Copyright 2022 &copy; Mohit Mehra</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us on</h4>
        <a href="http://instagram.com/mohitmehra5609">Instagram</a>
        <a href="http://instagram.com/mohitmehra5609">Facebook</a>
        <a href="http://instagram.com/mohitmehra5609">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;

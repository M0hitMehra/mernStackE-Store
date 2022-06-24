import React, { useState } from "react";
import { ReactNavbar } from "overlay-navbar";
import { FaShoppingCart, FaSearch, FaRegUserCircle } from "react-icons/fa";
import logo from "../../../images/logo.png";
import "./Header.css";

import { useNavigate } from "react-router-dom";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "150px",
  logoHeight: "100px",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  searchIconUrl: "/search",
};

const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <>
      {/* <!-- Style 4 Start --> */}
      <nav className="style-4">
        <ul className="menu-4">
          <li>
            <a href="/" data-hover="Home">
              Home
            </a>
          </li>
          <li>
            <a href="/products" data-hover="Products">
              Products
            </a>
          </li>
        
          <li>
            <form
              data-hover="Search"
              className="HsearchBox"
              onSubmit={searchSubmitHandler}

            >
              <input
              style={{ color: 'black'}}
                type="text"
                placeholder="Search A Product...."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="Submit" defaultValue="Search" />
            </form>
          </li>

          <li>
            <a href="/contact" data-hover="Contact">
              Contact
            </a>
          </li>
          <li>
            <a href="/about" data-hover="About Us">
              About Us
            </a>
          </li>
         
        </ul>
      </nav>
      {/* <!-- Style 4 End --> */}

      <ReactNavbar
        logo={logo}
        cartIcon={true}
        CartIconElement={FaShoppingCart}
        searchIcon={true}
        SearchIconElement={FaSearch}
        profileIcon={true}
        ProfileIconElement={FaRegUserCircle}
        {...options}
      />
    </>
  );
};

export default Header;

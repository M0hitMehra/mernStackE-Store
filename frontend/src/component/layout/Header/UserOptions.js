import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Backdrop } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
    const { cartItems } = useSelector((state) => state.cart);

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: <ShoppingCartIcon  style={{color : cartItems.length>0 ?"tomato": "unset"}} />,
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashBoard,
        });
    }

    function dashBoard() {
        navigate(`/admin/dashboard`);
    }

    function orders() {
        navigate(`/orders`);
    }

    function account() {
        navigate(`/account`);
    }

    function cart() {
        navigate(`/cart`);
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                style={{ zIndex: "11" }}
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                        alt="Profile"
                    />
                }
            >
                {options.map((item, i) => (
                    <SpeedDialAction
                        key={i}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </>
    );
};

export default UserOptions;

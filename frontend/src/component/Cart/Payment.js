import React, { useEffect, useRef } from "react";
import CheckOutSteps from "./CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/productAction";
import { createOrder } from "../../actions/orderAction";

const Payment = () => {
    const navigate = useNavigate();

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount:Math.round(orderInfo.totalPrice*100)
    }

    const order = { 
        shippingInfo,orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;
            if (!stripe && !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }

                    dispatch(createOrder(order))

                    navigate(`/success`);
                } else {
                    alert.error("Unexpected Error While Processing Payment");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
    
      
    }, [alert , dispatch ,error]);
    

    return (
        <>
            <MetaData title="Payment" />
            <CheckOutSteps activeStep={2} />
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon />
                    <CardNumberElement className="paymentInput" />
                </div>
                <div>
                    <EventIcon />
                    <CardExpiryElement className="paymentInput" />
                </div>
                <div>
                    <VpnKeyIcon />
                    <CardCvcElement className="paymentInput" />
                </div>

                <input
                    type="submit"
                    value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                    ref={payBtn}
                    className="paymentFormBtn"
                />
            </form>
        </>
    );
};

export default Payment;

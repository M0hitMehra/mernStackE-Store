import "./App.css";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import DashBoardRoute from "./component/Route/DashBoardRoute";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/NotFound/NotFound";
import About from "./component/layout/About/About";
import Contact from "./component/layout/ContactUs/Contact";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Oswald"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) =>e.preventDefault());

  return (
    <Router>
      
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route
          exact
          path="/account"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          exact
          path="/me/update"
          element={<ProtectedRoute element={<UpdateProfile />} />}
        />

        <Route
          exact
          path="/password/update"
          element={<ProtectedRoute element={<UpdatePassword />} />}
        />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />

        <Route exact path="/login" element={<LoginSignUp />} />

        <Route exact path="/cart" element={<Cart />} />

        <Route
          exact
          path="/shipping"
          element={<ProtectedRoute element={<Shipping />} />}
        />

        <Route
          exact
          path="/order/confirm"
          element={<ProtectedRoute element={<ConfirmOrder />} />}
        />

        {stripeApiKey && (
          <Route
            exact
            path="/process/payement"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute element={<Payment />} />{" "}
              </Elements>
            }
          />
        )}

        <Route
          exact
          path="/success"
          element={<ProtectedRoute element={<OrderSuccess />} />}
        />

        <Route
          exact
          path="/orders"
          element={<ProtectedRoute element={<MyOrders />} />}
        />

        <Route
          exact
          path="/order/:id"
          element={<ProtectedRoute element={<OrderDetails />} />}
        />

        <Route
          exact
          path="/admin/dashboard"
          element={<DashBoardRoute isAdmin={true} element={<Dashboard />} />}
        />

        <Route
          exact
          path="/admin/products"
          element={<DashBoardRoute isAdmin={true} element={<ProductList />} />}
        />

        <Route
          exact
          path="/admin/product"
          element={<DashBoardRoute isAdmin={true} element={<NewProduct />} />}
        />

        <Route
          exact
          path="/admin/product/:id"
          element={
            <DashBoardRoute isAdmin={true} element={<UpdateProduct />} />
          }
        />

        <Route
          exact
          path="/admin/orders"
          element={<DashBoardRoute isAdmin={true} element={<OrderList />} />}
        />

        <Route
          exact
          path="/admin/order/:id"
          element={<DashBoardRoute isAdmin={true} element={<ProcessOrder />} />}
        />

        <Route
          exact
          path="/admin/users"
          element={<DashBoardRoute isAdmin={true} element={<UsersList />} />}
        />

        <Route
          exact
          path="/admin/user/:id"
          element={<DashBoardRoute isAdmin={true} element={<UpdateUser />} />}
        />

        <Route
          exact
          path="/admin/reviews"
          element={
            <DashBoardRoute isAdmin={true} element={<ProductReviews />} />
          }
        />

        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />


        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

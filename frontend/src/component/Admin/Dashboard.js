import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import {  getAdminProduct } from "../../actions/productAction";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  } from 'chart.js';
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
  );

const Dashboard = () => {
  const dispatch = useDispatch();
  const {  products } = useSelector((state) => state.products);
  const {  orders } = useSelector((state) => state.allOrders);
  const {  users } = useSelector((state) => state.allUsers);




  useEffect(() => {
   
    dispatch(getAdminProduct())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  
    
  }, [dispatch, ])
  

  let outofStock =0;
  products && products.forEach((item)=>{
    if(item.Stock===0){
      outofStock += 1;
    }
  })

  let totalAmount = 0
  orders && orders.forEach((item)=>{
    totalAmount += item.totalPrice
  })

  const lineState = {
    labels: ["Initial Amount" , "Amount Earned" ],
    datasets:[{
      label: "Total Amount",
      backgroundColor:["tomato"],
      hoverBackgroundColor:["rgb(197,72,49)"], 
      data: [0 ,totalAmount],
    }]
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets:[{
        backgroundColor:["#00A6B4" , "#680084"],
        hoverBackgroundColor:["#4B5000" ,"#35014F"],
        data:[outofStock,products.length - outofStock ]
    }]
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardConatiner">
        <Typography className="h11" component="h1" style={{ 
          color:" rgba(0, 0, 0, 0.733)" ,
          // marginTop:"5vmax",
          font: `300 2rem "Roboto"` ,
          textAlign: "center" ,
          width: "50%" ,
          padding: "1.5rem ",
          margin: "auto" ,
          display: "flex" ,
          alignItems: "center" ,
          justifyContent: "center" ,
        }}>
          Dashboard
        </Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

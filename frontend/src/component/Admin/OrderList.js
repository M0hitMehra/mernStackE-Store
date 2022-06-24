

import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { deleteOrder, getAllOrders ,clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";


const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { error, orders } = useSelector((state) => state.allOrders);
    const {error:deleteError , isDeleted} = useSelector((state) => state.order)

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    useEffect(() => {
      if(error) {
        alert.error(error)
        dispatch(clearErrors())
      }

      if(deleteError) {
        alert.error(deleteError)
        dispatch(clearErrors())
      }

      if(isDeleted) {
        alert.success("Order Deleted successfully")
        navigate(`/admin/orders`)
        dispatch({type: DELETE_ORDER_RESET})

    }

      dispatch(getAllOrders())
    
      
    }, [dispatch, error, alert,deleteError ,navigate,isDeleted ])
    

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params)=>{
                return params.getValue(params.id ,"status" ) === "Delivered" ? "greenColor" :"redColor"
            }
        },
        {
            field: "itemsQty",
            headerName: "items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() =>deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];
    orders &&
    orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });

    return(
    <>
    <MetaData title={`All ORDERS - ADMIN`}/>
    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer" >
            <h1 id="productListHeading">All Orders</h1>
            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight />
        </div>
    </div>
    </>)
};

export default OrderList;

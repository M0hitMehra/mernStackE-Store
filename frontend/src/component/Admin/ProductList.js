import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminProduct ,deleteProduct} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";


const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();


    const { error, products } = useSelector((state) => state.products);
    const {error:deleteError , isDeleted} = useSelector((state) => state.product)

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
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
        alert.success("Product Deleted successfully")
        navigate(`/admin/dashboard`)
        dispatch({type: DELETE_PRODUCT_RESET})

    }

      dispatch(getAdminProduct())
    
      
    }, [dispatch, error, alert,deleteError ,navigate,isDeleted ])
    

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
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
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() =>deleteProductHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];
    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });

    return(
    <>
    <MetaData title={`All Products - ADMIN`}/>
    <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer" >
            <h1 id="productListHeading">All Products</h1>
            <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight />
        </div>
    </div>
    </>)
};

export default ProductList;

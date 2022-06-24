import React from "react";
// import {} from "react-router"
import { Navigate, } from "react-router-dom";
import { useSelector } from "react-redux";
// import Profile from "../User/Profile";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ element }) => {
  const { loading, isAuthenticated,  } = useSelector((state) => state.user);

  
 

  return (
    <>
      {loading === false ? (
        isAuthenticated ===false ? (
          <Navigate to="/login" replace />
        ) : (
          element
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProtectedRoute;

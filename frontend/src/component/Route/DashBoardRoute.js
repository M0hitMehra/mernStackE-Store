import React from "react";
// import {} from "react-router"
import { Navigate, } from "react-router-dom";
import { useSelector } from "react-redux";
// import Profile from "../User/Profile";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({isAdmin , element }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  
  const check = () =>{
   
   
    
    if(isAdmin === true && user.role === "admin"){
      console.log(1)
      return element
    }
    else{
      console.log(2)

      return ( <Navigate to="/login" replace />)
    }


  }


  return (
    <>
      {loading === false? (
        isAuthenticated ===false ? (
          <Navigate to="/login" replace />
        ) : (
         check() 
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProtectedRoute;

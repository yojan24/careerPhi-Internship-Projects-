import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useVerifyTokenQuery } from "../../Redux/api/userApiSlice";
function Protected() {
  const { data, error, isLoading } = useVerifyTokenQuery();

  if (isLoading) {
    return <h1>..Loading.....</h1>;
  }
  if (data?.isValid) {
    return <Outlet />;
  } else if (error || !data) {
    return <Navigate to="/" replace />;
  }
}

export default Protected;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ Component }) => {
    const user = useSelector((state) => state.auth.user);
    return user ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;

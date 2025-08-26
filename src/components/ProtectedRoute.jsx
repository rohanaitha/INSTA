import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("jwt_token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

export default ProtectedRoute;

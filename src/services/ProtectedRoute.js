import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CheckRestaurant from "./CheckRestaurant";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("user");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // const hasRestaurant = CheckRestaurant();
    // if (!hasRestaurant) {
    //   navigate("/register-restaurant");
    //   return;
    // }
  }, [navigate, token]);

  return token ? children : navigate("/login");
}

export default ProtectedRoute;
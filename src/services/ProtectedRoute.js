import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClienteService from "./ClientService";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const token = localStorage.getItem("user");

  useEffect(() => {
    const verifyAccess = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      const RestauranteId = await ClienteService.getRestauranteId();

      if (!RestauranteId) {
        navigate("/register-restaurant");
      } else {
        setHasAccess(true);
      }

      setLoading(false);
    };

    verifyAccess();
  }, [navigate, token]);

  if (loading) {
    return <div>Verificando acesso...</div>;
  }

  return hasAccess ? children : null;
}

export default ProtectedRoute;
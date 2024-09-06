import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [jwt, setJwt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setJwt(user.jwt);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <div>w
        <h1>Dashboard</h1>
        {jwt ? <p>JWT do usuário: {jwt}</p> : <p>Carregando...</p>}
      </div>
      <a href="/">Voltar</a>
    </div>
  );
}

export default Dashboard;
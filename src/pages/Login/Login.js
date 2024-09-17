import React, { useState, useEffect } from "react";
import "./Login.css";
import img_login from "../../assets/img_login.jpg";
import logo from "../../assets/Logotipo.svg";
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import clearJwt from "../../services/ClearJwt";
import ClienteService from "../../services/ClientService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    clearJwt();
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await AuthService.login(username, password);
      console.log("Login bem-sucedido:", response);

      const hasRestaurant = await ClienteService.getRestauranteId();

      if (hasRestaurant) {
        navigate("/orders");
      } else {
        navigate("/register-restaurant");
      }
    } catch (err) {
      setError(err.message);
      setPassword("");
    }
  };

  return (
    <div className="main-login">
      <div className="left">
        <img src={img_login} alt="background" className="background" />
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="right">
        <div className="login-container">
          <h2>Fazer Login</h2>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleLogin}>
            <div>
              <label>E-mail</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="lg-form-buttons">
              <button type="submit">Entrar</button>

              <span>Não tem conta? <Link to="/register">Cadastre-se</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
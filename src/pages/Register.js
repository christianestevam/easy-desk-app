import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import logo from "../assets/Logotipo.svg";
import AuthService from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import clearJwt from "../services/ClearJwt";

import Login from "./Login";

function Register(){
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    clearJwt();
  }, []);

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const registerRequest = {
        nome: formData.name,
        cnpjCpf: formData.document,
        telefone: formData.phone,
        email: formData.email,
        senha: formData.password,
      };
      
      const response = await AuthService.register(registerRequest);
      console.log("Registro bem-sucedido:", response);
      
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return(
    <div className="main-register">

      <div className="left">
        <h1>Cadastre-se</h1>
        <h3>e simplifique seus pedidos!</h3>
        <img src={logo} alt="logo" className="logo-small" />
      </div>

      <div className="right">
        <div className="register-container">
          <h2>Insira seus dados</h2>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>CNPJ/CPF</label>
              <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Telefone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Senha</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                Finalizar Cadastro
              </button>

              <button type="button" className="login-btn" onClick={() => navigate("/login")}>
                <Link to="/login">Login</Link>
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";
import logo from "../../assets/Logotipo.svg";

import AuthService from "../../services/AuthService";
import clearJwt from "../../services/ClearJwt";

function Register(){
  useEffect(() => {
    clearJwt();
  }, []);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    document: "",
    phone: "",
    email: "",
    password: "",
  });

  // Função para formatar CPF ou CNPJ
  const formatDocument = (value) => {
    value = value.replace(/\D/g, ""); // Remove tudo que não é dígito

    if (value.length <= 11) {
      // Formatação CPF
      return value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (value.length <= 14) {
      // Formatação CNPJ
      return value
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,4})/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    return value;
  };

  // Função para formatar telefone no formato (00) 00000-0000
  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não for número
      .replace(/(\d{2})(\d)/, "($1) $2") // Coloca parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen
      .replace(/(-\d{4})\d+?$/, "$1"); // Limita o número
  };

  // Função para remover formatação e deixar apenas os números
  const removeFormatting = (value) => {
    return value.replace(/\D/g, ""); // Remove tudo que não é número
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "document") {
      formattedValue = formatDocument(value); // Aplica a formatação de CPF ou CNPJ
    }

    if (name === "phone") {
      formattedValue = formatPhone(value); // Aplica a formatação de telefone
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    try {
      const registerRequest = {
        nome: formData.name,
        cnpjCpf: removeFormatting(formData.document), // Remove formatação
        telefone: removeFormatting(formData.phone), // Remove formatação
        email: formData.email,
        senha: formData.password,
      };
      
      const response = await AuthService.register(registerRequest);
      console.log("Registro bem-sucedido:", response);
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="main-register">
      <div className="left">
        <h1>Cadastre-se</h1>
        <h3>e simplifique seus pedidos!</h3>
        <img src={logo} alt="logo" className="logo-small" />
      </div>

      <div className="right">
        <div className="register-container">
          <h2>Insira seus dados</h2>

          {errorMessage && <div className="error-box">{errorMessage}</div>}

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

              <span>Já tem conta? <Link to="/login">Faça Login</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

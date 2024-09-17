import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RegisterRestaurant from "../../services/RegisterRestaurant";

import "./RegisterRestaurantForm.css";

function RegisterRestaurantForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [restaurantData, setRestaurantData] = useState({
    nome: "",
    cnpj: "",
    telefone: "",
    endereco: {
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: ""
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["logradouro", "numero", "complemento", "bairro", "cidade", "estado", "cep"].includes(name)) {
      setRestaurantData((prevData) => ({
        ...prevData,
        endereco: {
          ...prevData.endereco,
          [name]: value,
        },
      }));
    } else {
      setRestaurantData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await RegisterRestaurant.register(restaurantData);
      console.log("Registro de restaurante bem-sucedido:", response);
      navigate("/orders");
    } catch (error) {
      setErrorMessage("Erro ao cadastrar restaurante: " + error);
    }
  };

  return (
    <div className="register-restaurant-container">
      <h2 className="register-title">Cadastrar Restaurante</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Nome do Restaurante:
          <input
            type="text"
            name="nome"
            value={restaurantData.nome}
            onChange={handleChange}
            className="form-input"
          />
        </label>

        <label className="form-label">
          CNPJ:
          <input
            type="text"
            name="cnpj"
            value={restaurantData.cnpj}
            onChange={handleChange}
            className="form-input"
          />
        </label>

        <label className="form-label">
          Telefone:
          <input
            type="text"
            name="telefone"
            value={restaurantData.telefone}
            onChange={handleChange}
            className="form-input"
          />
        </label>

        <h3 className="form-section-title">Endereço</h3>

        <label className="form-label">
          Logradouro:
          <input
            type="text"
            name="logradouro"
            value={restaurantData.endereco.logradouro}
            onChange={handleChange}
            className="form-input"
          />
        </label>

        <label className="form-label">
          Bairro:
          <input
            type="text"
            name="bairro"
            value={restaurantData.endereco.bairro}
            onChange={handleChange}
            className="form-input"
          />
        </label>

        <label className="form-label">
          Cidade:
          <input
            type="text"
            name="cidade"
            value={restaurantData.endereco.cidade}
            onChange={handleChange}
            className="form-input"
          />
        </label>

        <div className="form-row">
          <label className="form-label">
            Número:
            <input
              type="text"
              name="numero"
              value={restaurantData.endereco.numero}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label className="form-label">
            Complemento:
            <input
              type="text"
              name="complemento"
              value={restaurantData.endereco.complemento}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Estado:
            <input
              type="text"
              name="estado"
              value={restaurantData.endereco.estado}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label className="form-label">
            CEP:
            <input
              type="text"
              name="cep"
              value={restaurantData.endereco.cep}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>

        <button className="submit-button" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterRestaurantForm;
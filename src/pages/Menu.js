import React, { useState, useEffect } from "react";
import "../styles/Menu.css";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import ClienteService from "../services/ClientService";
import EditMenu from "../components/EditMenu/EditMenu";

const Menu = () => {
  const [cardapio, setCardapio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.jwt;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restauranteId = await ClienteService.getRestauranteId(token);

        if (restauranteId) {
          const response = await axios.get(
            `http://localhost:8080/api/cardapios/restaurante/${restauranteId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setCardapio(response.data);
        } else {
          setErrorMessage("Restaurante não encontrado.");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setCardapio(null);
        } else {
          setErrorMessage(
            "Erro ao buscar cardápio: " +
              (error.response?.data?.message || error.message)
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="menu">
      <Sidebar />

      <div className="menu-content">
        {loading ? (
          <p>Carregando...</p>
        ) : errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : !cardapio ? (
            <Link className="mn-button" to="/register-menu">Cadastrar cardápio</Link>
        ) : (
          <div>
            <h2>Gerenciar cardápio</h2>
            <EditMenu cardapio={cardapio} token={token} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
import React, { useState } from "react";
import CardapioService from "../../services/CardapioService";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterMenuForm.css";

function RegisterMenuForm() {
  const navigate = useNavigate();
  const [restauranteId, setRestauranteId] = useState(null);
  const [itens, setItens] = useState([
    {
      nome: "",
      descricao: "",
      preco: 0,
      categoria: "",
      disponibilidade: true,
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.jwt;

  const addItem = () => {
    setItens([
      ...itens,
      {
        nome: "",
        descricao: "",
        preco: 0,
        categoria: "",
        disponibilidade: true,
      },
    ]);
  };

  const removeItem = (index) => {
    setItens(itens.filter((item, i) => i !== index));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItens = itens.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setItens(updatedItens);
  };

  const handleCheckboxChange = (index) => {
    const updatedItens = itens.map((item, i) =>
      i === index ? { ...item, disponibilidade: !item.disponibilidade } : item
    );
    setItens(updatedItens);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardapioData = {
      restauranteId,
      itens,
    };

    try {
      await CardapioService.createCardapio(cardapioData, token);
      navigate("/orders");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register-menu-form">
      <Link className="back-button" to="/orders">
        Voltar
      </Link>

      <h2>Cadastrar Cardápio</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="items-container">
          {itens.map((item, index) => (
            <div key={index} className="item-group">

              <button
                type="button"
                className="remove-item-button"
                onClick={() => removeItem(index)}
              >
                &times;
              </button>

              <h3>Item {index + 1}</h3>
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  value={item.nome}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </label>

              <label>
                Descrição:
                <input
                  type="text"
                  name="descricao"
                  value={item.descricao}
                  onChange={(e) => handleItemChange(index, e)}
                />
              </label>

              <div className="preco-categoria">
                <label>
                  Preço (R$):
                  <input
                    type="number"
                    name="preco"
                    value={item.preco}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </label>

                <label>
                  Categoria:
                  <select
                    name="categoria"
                    value={item.categoria}
                    onChange={(e) => handleItemChange(index, e)}
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="VEGETARIANO">Vegetariano</option>
                    <option value="BEBIDA">Bebida</option>
                    <option value="HAMBURGUER">Hamburguer</option>
                    <option value="PIZZA">Pizza</option>
                    <option value="PRATOS_EXECUTIVOS">Pratos Executivos</option>
                  </select>
                </label>
              </div>

              <label className="checkbox-label">
                Disponibilidade:
                <input
                  type="checkbox"
                  checked={item.disponibilidade}
                  onChange={() => handleCheckboxChange(index)}
                />
              </label>
            </div>
          ))}
        </div>

        <button className="rmf-button" type="button" onClick={addItem}>
          +
        </button>
        <button type="submit">Cadastrar Cardápio</button>
      </form>
    </div>
  );
}

export default RegisterMenuForm;

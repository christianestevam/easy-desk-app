import React, { useState } from "react";
import config from "../../config";
import axios from "axios";
import ClienteService from "../../services/ClientService";
import "./EditMenu.css";

const EditMenu = ({ cardapio }) => {
  const [itens, setItens] = useState(cardapio.itens || []);
  const [errorMessage, setErrorMessage] = useState("");

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItens = itens.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setItens(updatedItens);
  };

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
    setItens(itens.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("user"))?.jwt;
    const restauranteId = await ClienteService.getRestauranteId(token);

    const cardapioData = {
      restauranteId: restauranteId.id,
      itens,
    };

    try {
      await axios.put(`${config.backendUrl}/cardapio/${cardapio.id}`, cardapioData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert("Cardápio atualizado com sucesso!");
      window.location.reload();
    } catch (error) {
      setErrorMessage(
        "Erro ao atualizar cardápio: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="edit-menu">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <button type="submit">Salvar alterações</button>
        <div className="edit-menu-content">
          {itens.map((item, index) => (
            <div key={index} className="item-group">
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

              <label>
                Preço:
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

              <label>
                Disponibilidade:
                <select
                  name="disponibilidade"
                  value={item.disponibilidade}
                  onChange={(e) => handleItemChange(index, e)}
                >
                  <option value={true}>Disponível</option>
                  <option value={false}>Indisponível</option>
                </select>
              </label>

              <button className="edit-menu-remove-button" type="button" onClick={() => removeItem(index)}>
                Remover
              </button>
            </div>
          ))}

          <button className="edit-menu-add-button" type="button" onClick={addItem}>
            Adicionar Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMenu;
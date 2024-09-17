import React, { useEffect, useState } from 'react';
import './NewOrder.css';
import TableService from '../../services/TableService';
import CardapioService from '../../services/CardapioService';

function NewOrder({ isOpen, onClose, onSubmit }) {
  const [mesas, setMesas] = useState([]);
  const [itens, setItens] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [serviceFee, setServiceFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isOpen) {
      TableService.getTables()
        .then(response => {
          const mesasDisponiveis = response.filter(mesa => mesa.disponibilidade);
          setMesas(mesasDisponiveis);
        })
        .catch(error => console.error("Erro ao buscar mesas:", error));
    }
  }, [isOpen]);

  useEffect(() => {
    CardapioService.getCardapio()
      .then(response => {
        if (response) {
          setItens(response.itens);
        } else {
          setItens([]);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar itens:", error);
        setItens([]);
      });
  }, []);

  useEffect(() => {
    const itemTotal = selectedItems.reduce((acc, itemId) => {
      const item = itens.find((i) => i.id === itemId);
      return item ? acc + item.preco : acc;
    }, 0);
    setTotalPrice(itemTotal + parseFloat(serviceFee));
  }, [selectedItems, serviceFee, itens]);

  const handleAddItem = (itemId) => {
    if (!isNaN(itemId) && !selectedItems.includes(itemId)) {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter(id => id !== itemId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newOrderData = {
      mesaId: parseInt(e.target.tableNumber.value),
      nomeConsumidor: e.target.customerName.value,
      itens: selectedItems,
      taxaServico: parseFloat(serviceFee),
      observacao: e.target.notes.value
    };

    onSubmit(newOrderData);
  };

  const handleServiceFeeChange = (e) => {
    setServiceFee(e.target.value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Novo Pedido</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Número da mesa:
            <select name="tableNumber" required>
              <option value="">Selecione uma mesa</option>
              {mesas.map((mesa) => (
                <option key={mesa.numeroMesa} value={mesa.id}>
                  Mesa {mesa.numeroMesa}
                </option>
              ))}
            </select>
          </label>

          <label>
            Nome do Consumidor:
            <input type="text" name="customerName" required />
          </label>

          <label>
            Itens:
            <div className="item-selection">
              <select onChange={(e) => handleAddItem(parseInt(e.target.value))}>
                <option value="">Selecione um item</option>
                {itens.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome} - R$ {item.preco.toFixed(2)}
                  </option>
                ))}
              </select>
              <div className="selected-items">
                {selectedItems.map((itemId) => {
                  const item = itens.find((i) => i.id === itemId);
                  return (
                    <div key={itemId} className="selected-item">
                      <span>{item.nome} - R$ {item.preco.toFixed(2)}</span>
                      <button type="button" onClick={() => handleRemoveItem(itemId)}>Remover</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </label>

          <label>
            Taxa de Serviço:
            <input
              type="number"
              step="0.01"
              name="serviceFee"
              value={serviceFee}
              onChange={handleServiceFeeChange}
              required
            />
          </label>

          <label>
            Observações:
            <input type="text" name="notes" />
          </label>

          <div className="order-total">
            <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
          </div>

          <div className="modal-buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewOrder;
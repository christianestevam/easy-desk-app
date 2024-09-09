import React from 'react';
import './NewOrder.css';

function NewOrder({ isOpen, onClose, onSubmit }) {
  if(!isOpen){
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Novo Pedido</h2>

        <form onSubmit={onSubmit}>
          <label>
            Número da mesa:
            <input type="number" name="tableNumber" required />
          </label>

          <label>
            Itens:
            <input type="text" name="items" required />
          </label>

          <label>
            Preço:
            <input type="number" step="0.01" name="price" required />
          </label>

          <label>
            Observações:
            <input type="text" name="notes" />
          </label>

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
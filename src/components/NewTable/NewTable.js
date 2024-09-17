import React from "react";
import "./NewTable.css";

function NewTable({ isOpen, onClose, onSubmit }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nova Mesa</h2>

        <form onSubmit={onSubmit}>
          <label>
            Número da Mesa:
            <input type="number" name="tableNumber" required />
          </label>

          <label>
            Disponível:
            <input type="checkbox" name="available" />
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

export default NewTable;
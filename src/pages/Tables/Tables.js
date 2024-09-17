import React, { useState, useEffect } from "react";
import "./Tables.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import NewTable from "../../components/NewTable/NewTable";
import TableService from "../../services/TableService";

function Tables() {
  const [tables, setTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.jwt;

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const mesas = await TableService.getTables(token);
        setTables(mesas);
      } catch (error) {
        console.error("Erro ao buscar mesas:", error);
      }
    };

    fetchTables();
  }, [token]);

  const handleNewTable = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveTable = async (tableId) => {
    try {
      await TableService.deleteTable(tableId);
      setTables(tables.filter(table => table.id !== tableId));
    } catch (error) {
      console.error("Erro ao deletar mesa:", error);
    }
  };

  const toggleAvailability = async (tableId, currentAvailability, index) => {
    try {
      const updatedAvailability = !currentAvailability;
      await TableService.updateTableAvailability(tableId, updatedAvailability);

      const updatedTables = [...tables];
      updatedTables[index].disponibilidade = updatedAvailability;
      setTables(updatedTables);
    } catch (error) {
      console.error("Erro ao atualizar disponibilidade da mesa:", error);
    }
  };

  const handleSaveTable = async (e) => {
    e.preventDefault();
    const newTable = {
      numeroMesa: parseInt(e.target.tableNumber.value, 10),
      disponibilidade: e.target.available.checked,
    };

    try {
      const createdTable = await TableService.createTable(newTable, token);
      setTables([...tables, createdTable]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar mesa:", error);
    }
  };

  return (
    <div className="tables">
      <Sidebar />

      <div className="tables-content">
        <h1>Mesas</h1>

        <button className="tables-content-ntbtn" onClick={handleNewTable}>
          Criar nova mesa
        </button>

        <div className="table-list">
          {tables.map((table, index) => (
            <div key={table.numeroMesa} className="table-item">
              <div className="table-header">
                <p>Mesa {table.numeroMesa}</p>
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemoveTable(table.id)}
                >
                  x
                </button>
              </div>

              <div className="table-body">
                <p>{table.disponibilidade ? "Disponível" : "Indisponível"}</p>
              
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={table.disponibilidade} 
                    onChange={() => toggleAvailability(table.id, table.disponibilidade, index)} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <NewTable
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSaveTable}
        />
      </div>
    </div>
  );
}

export default Tables;
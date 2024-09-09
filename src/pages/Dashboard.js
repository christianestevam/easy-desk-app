import React, { useState } from "react";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import Order from "../components/Order";
import NewOrder from "../components/NewOrder/NewOrder";

function Dashboard() {

  const [orders, setOrders] = useState([
    {
      id: 1,
      tableNumber: 1,
      itens: ["coxinha", "refrigerante"],
      price: 12.99,
      status: "pronto",
      notes: "nenhuma observação",
    },
    {
      id: 2,
      tableNumber: 3,
      itens: ["pastel", "caldo de cana"],
      price: 17.99,
      status: "preparando",
      notes: "",
    },
    {
      id: 3,
      tableNumber: 5,
      itens: ["água", "doces"],
      price: 10.99,
      status: "analise",
      notes: "nenhuma observação 2",
    },
    {
      id: 4,
      tableNumber: 1,
      itens: ["água", "salgado", "açúcar"],
      price: 1.99,
      status: "completo",
      notes: "Quero tudo",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      id: orders.length + 1,
      tableNumber: e.target.tableNumber.value,
      itens: e.target.items.value.split(","),
      price: parseFloat(e.target.price.value),
      status: "preparando",
      notes: e.target.notes.value,
    };
    setOrders([...orders, newOrder]);
    setIsModalOpen(false);
  };

  return(
    <div className="dashboard">
      
      <Sidebar />

      <div className="dashboard-content">

        <h1>Meus pedidos</h1>

        <button onClick={handleNewOrder}>Novo pedido</button>

        <div className="order-list">
          {orders.map((order) => (
            <Order order={order} />
          ))}
        </div>

        <NewOrder
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSaveOrder}
        />
        
      </div>
    </div>
  );
}

export default Dashboard;
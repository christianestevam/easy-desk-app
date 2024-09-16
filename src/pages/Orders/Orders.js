import React, { useState, useEffect } from "react";
import "./Orders.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Order from "../../components/Order/Order";
import NewOrder from "../../components/NewOrder/NewOrder";
import OrderService from "../../services/OrderService";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await OrderService.getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleNewOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveOrder = async (newOrderData) => {
    try {
      const createdOrder = await OrderService.createOrder(newOrderData);
      setOrders([...orders, createdOrder]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);
    }
  };

  const handleOrderUpdate = () => {
    fetchOrders();
  };

  const openOrders = orders.filter((order) => order.status === "ABERTO");
  const inPreparationOrders = orders.filter((order) => order.status === "EM_PREPARACAO");
  const closedOrders = orders.filter((order) => order.status === "PRONTO");

  return (
    <div className="orders">
      <Sidebar />

      <div className="orders-content">
        <h1>Meus Pedidos</h1>

        <button onClick={handleNewOrder}>Novo Pedido</button>

        <div className="orders-columns">
          <div className="orders-column-1">
            <h2>Aberto</h2>
            {openOrders.map((order) => (
              <div key={order.id}>
                <Order order={order} onOrderUpdate={handleOrderUpdate} />
              </div>
            ))}
          </div>

          <div className="orders-column-2">
            <h2>Em Preparação</h2>
            {inPreparationOrders.map((order) => (
              <div key={order.id}>
                <Order order={order} onOrderUpdate={handleOrderUpdate} />
              </div>
            ))}
          </div>

          <div className="orders-column-3">
            <h2>Pronto</h2>
            {closedOrders.map((order) => (
              <div key={order.id}>
                <Order order={order} onOrderUpdate={handleOrderUpdate} />
              </div>
            ))}
          </div>
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

export default Orders;
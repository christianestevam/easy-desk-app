import React from 'react';
import "./Order.css";
import OrderService from "../../services/OrderService";

const Order = ({ order, onOrderUpdate }) => {

  const handleCloseOrder = async () => {
    try {
      await OrderService.closeOrder(order.id);
      console.log(`Pedido ${order.id} fechado com sucesso.`);
      onOrderUpdate();
    } catch (error) {
      console.error('Erro ao fechar o pedido:', error);
    }
  };

  const handleAdvanceOrder = async () => {
    let nextStatus = '';

    switch (order.status) {
      case 'ABERTO':
        nextStatus = 'EM_PREPARACAO';
        break;
      case 'EM_PREPARACAO':
        nextStatus = 'PRONTO';
        break;
      case 'PRONTO':
        try {
          await OrderService.closeOrder(order.id);
          console.log(`Pedido ${order.id} fechado com sucesso.`);
          onOrderUpdate();
        } catch (error) {
          console.error('Erro ao fechar o pedido:', error);
        }
        return;
      default:
        nextStatus = 'ABERTO';
    }

    try {
      await OrderService.changeOrderStatus(order.id, nextStatus);
      console.log(`Status do pedido ${order.id} alterado para ${nextStatus}.`);
      onOrderUpdate();
    } catch (error) {
      console.error('Erro ao avançar o status do pedido:', error);
    }
  };

  return (
    <div className='order'>

      <div className='order-content'>
        
        <div className='order-info'>
          <p>Pedido #{order.id}</p>
          <p>Mesa: {order.numeroMesa}</p>
        </div>

        <p>Nome: {order.nomeConsumidor}</p>
        <p>Total: R$ {order.total}</p>
      </div>

      <div className='order-buttons'>
        <button className='order-button-remove' onClick={handleCloseOrder}>X</button>
        <button className='order-button-change' onClick={handleAdvanceOrder}>Avançar</button>
      </div>
    </div>
  );
};

export default Order;
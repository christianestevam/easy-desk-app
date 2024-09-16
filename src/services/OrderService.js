import axios from "axios";

const OrderService = {
  async createOrder(orderData) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.post("http://localhost:8080/api/comanda", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      throw new Error("Erro ao cadastrar pedido: " + errorMessage);
    }
  },

  async getOrders() {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.get("http://localhost:8080/api/comanda", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
      
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      throw new Error("Erro ao buscar pedidos: " + errorMessage);
    }
  },

  async closeOrder(orderId) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.put(
        `http://localhost:8080/api/comanda/${orderId}/fechar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      throw new Error("Erro ao fechar pedido: " + errorMessage);
    }
  },

  async changeOrderStatus(orderId, newStatus) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.put(
        `http://localhost:8080/api/comanda/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      throw new Error("Erro ao avançar status do pedido: " + errorMessage);
    }
  },
};

export default OrderService;
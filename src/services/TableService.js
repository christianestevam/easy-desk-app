import axios from "axios";
import config from "../config";

const TableService = {
  
  async getTables() {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.get(
        `${config.backendUrl}/mesa`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : error.message;
      throw new Error("Erro ao buscar mesas: " + errorMessage);
    }
  },

  async createTable(newTable) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.post(
        `${config.backendUrl}/mesa`,
        newTable,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : error.message;
      throw new Error("Erro ao salvar mesa: " + errorMessage);
    }
  },

  async deleteTable(tableId) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.delete(
        `${config.backendUrl}/mesa/${tableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : error.message;
      throw new Error("Erro ao deletar mesa: " + errorMessage);
    }
  },

  async updateTableAvailability(tableId, disponibilidade) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.put(
        `${config.backendUrl}/mesa/${tableId}/disponibilidade`,
        { disponibilidade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : error.message;
      throw new Error("Erro ao atualizar disponibilidade da mesa: " + errorMessage);
    }
  },
};

export default TableService;
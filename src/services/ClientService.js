import axios from "axios";
import config from "../config";

const ClienteService = {

  async getRestauranteId(){
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.get(`${config.backendUrl}/cliente`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.restaurante;

    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : error.message;
      throw new Error("Erro ao buscar restaurante: " + errorMessage);
    }
  },
  
};

export default ClienteService;
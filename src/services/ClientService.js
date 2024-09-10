import axios from "axios";

const ClienteService = {
  async getRestauranteId(token) {
    try {
      const response = await axios.get("http://localhost:8080/api/cliente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const restaurante = response.data.restaurantes && response.data.restaurantes.length > 0
        ? response.data.restaurantes[0]
        : null;

      return restaurante ? restaurante.id : null;

    } catch (error) {
      const errorMessage = error.response && error.response.data
        ? error.response.data.message
        : error.message;
      throw new Error("Erro ao buscar restaurante: " + errorMessage);
    }
  },
};

export default ClienteService;
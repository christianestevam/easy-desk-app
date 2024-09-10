import axios from "axios";

const API_URL = 'http://localhost:8080/api';

const CheckRestaurant = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.jwt;

    if (!token) {
      throw new Error("Token JWT não encontrado. Faça login.");
    }

    const response = await axios.get(`${API_URL}/cliente`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { restaurantes } = response.data;
    return restaurantes && restaurantes.length > 0;

  } catch (error) {
    console.error("Erro ao verificar restaurante:", error);
    return false;
  }
};

export default CheckRestaurant;
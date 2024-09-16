import axios from "axios";

const API_URL = "http://localhost:8080/api";

const register = async (restaurantData) => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.jwt;

    if (!token) {
      throw new Error("Token JWT não encontrado. Faça login.");
    }

    const response = await axios.post(
      `${API_URL}/restaurante`,
      restaurantData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

const RegisterRestaurant = {
  register,
};

export default RegisterRestaurant;
import axios from 'axios';

const CardapioService = {

  async createCardapio(cardapioData) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.jwt;

      if (!token) {
        throw new Error("Token não encontrado.");
      }

      const response = await axios.post('http://localhost:8080/api/cardapio', cardapioData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar cardápio: ' + error.response.data.message);
    }
  },

  async getCardapio(){
    const token = JSON.parse(localStorage.getItem("user"))?.jwt;
    
    const response = await axios.get(`http://localhost:8080/api/cardapio`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

};

export default CardapioService;
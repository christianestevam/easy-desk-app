import axios from 'axios';

const CardapioService = {
  async createCardapio(cardapioData, token) {

    try {
      const response = await axios.post('http://localhost:8080/api/cardapios', cardapioData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar cardápio: ' + error.response.data.message);
    }
  }
};

export default CardapioService;
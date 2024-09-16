import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const login = async (username, password) => {
  try{
    const response = await axios.post(`${API_URL}/authenticate`, {username, password});
    if(response.data.jwt){
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }catch(error){
    throw new Error('E-mail ou senha incorretos.');
  }
};

const register = async (registerRequest) => {
  try{
    const response = await axios.post(`${API_URL}/register`, registerRequest);
    return response.data;
  }catch(error){
    throw new Error('Erro ao registrar: ' + error.response.data.message || 'Erro desconhecido');
  }
};

const AuthService = {
  login,
  register
};

export default AuthService;
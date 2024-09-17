import axios from 'axios';
import config from '../config';

const login = async (username, password) => {
  try{
    const response = await axios.post(`${config.backendUrl}/auth/login`, {username, password});
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
    const response = await axios.post(`${config.backendUrl}/auth/registro`, registerRequest);
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
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/authenticate';

const login = async (username, password) => {
  try{
    const response = await axios.post(API_URL, { username, password });
    if(response.data.jwt){
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }catch(error){
    throw new Error('E-mail ou senha incorretos.');
  }
};

const AuthService = {
  login,
};

export default AuthService;
import ClientService from '../src/services/ClientService';
import axios from 'axios';

jest.mock('axios');

describe('ClientService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should get restaurant ID successfully', async () => {
    const responseData = { restaurante: 123 };
    axios.get.mockResolvedValue({ data: responseData });

    localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

    const result = await ClientService.getRestauranteId();
    expect(result).toEqual(123);
  });

  it('should throw an error if token is not found', async () => {
    localStorage.removeItem('user');
    await expect(ClientService.getRestauranteId()).rejects.toThrow('Token não encontrado.');
  });

  it('should throw an error if request fails', async () => {
    const errorMessage = 'Request failed';
    axios.get.mockRejectedValue({ response: { data: { message: errorMessage } } });

    localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

    await expect(ClientService.getRestauranteId()).rejects.toThrow('Erro ao buscar restaurante: ' + errorMessage);
  });

  it('should throw an error if request fails without response data', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

    await expect(ClientService.getRestauranteId()).rejects.toThrow('Erro ao buscar restaurante: ' + errorMessage);
  });
});
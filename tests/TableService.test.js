import TableService from '../src/services/TableService';
import axios from 'axios';

jest.mock('axios');

describe('TableService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('getTables', () => {
    it('should get tables successfully', async () => {
      const responseData = [{ id: 1, name: 'Table 1' }];
      axios.get.mockResolvedValue({ data: responseData });

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      const result = await TableService.getTables();
      expect(result).toEqual(responseData);
    });

    it('should throw an error if token is not found', async () => {
      localStorage.removeItem('user');
      await expect(TableService.getTables()).rejects.toThrow('Token não encontrado.');
    });

    it('should throw an error if request fails', async () => {
      const errorMessage = 'Request failed';
      axios.get.mockRejectedValue({ response: { data: { message: errorMessage } } });

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      await expect(TableService.getTables()).rejects.toThrow('Erro ao buscar mesas: ' + errorMessage);
    });

    it('should throw an error if request fails without response data', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValue(new Error(errorMessage));

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      await expect(TableService.getTables()).rejects.toThrow('Erro ao buscar mesas: ' + errorMessage);
    });
  });

  describe('createTable', () => {
    it('should create table successfully', async () => {
      const newTable = { name: 'New Table' };
      const responseData = { id: 1, ...newTable };
      axios.post.mockResolvedValue({ data: responseData });

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      const result = await TableService.createTable(newTable);
      expect(result).toEqual(responseData);
    });

    it('should throw an error if token is not found', async () => {
      localStorage.removeItem('user');
      await expect(TableService.createTable({ name: 'New Table' })).rejects.toThrow('Token não encontrado.');
    });

    it('should throw an error if request fails', async () => {
      const errorMessage = 'Request failed';
      axios.post.mockRejectedValue({ response: { data: { message: errorMessage } } });

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      await expect(TableService.createTable({ name: 'New Table' })).rejects.toThrow('Erro ao salvar mesa: ' + errorMessage);
    });

    it('should throw an error if request fails without response data', async () => {
      const errorMessage = 'Network Error';
      axios.post.mockRejectedValue(new Error(errorMessage));

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      await expect(TableService.createTable({ name: 'New Table' })).rejects.toThrow('Erro ao salvar mesa: ' + errorMessage);
    });
  });

  describe('deleteTable', () => {
    it('should delete table successfully', async () => {
      const responseData = { success: true };
      axios.delete.mockResolvedValue({ data: responseData });

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      const result = await TableService.deleteTable(1);
      expect(result).toEqual(responseData);
    });

    it('should throw an error if token is not found', async () => {
      localStorage.removeItem('user');
      await expect(TableService.deleteTable(1)).rejects.toThrow('Token não encontrado.');
    });

    it('should throw an error if request fails', async () => {
      const errorMessage = 'Request failed';
      axios.delete.mockRejectedValue({ response: { data: { message: errorMessage } } });

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      await expect(TableService.deleteTable(1)).rejects.toThrow('Erro ao deletar mesa: ' + errorMessage);
    });

    it('should throw an error if request fails without response data', async () => {
      const errorMessage = 'Network Error';
      axios.delete.mockRejectedValue(new Error(errorMessage));

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      await expect(TableService.deleteTable(1)).rejects.toThrow('Erro ao deletar mesa: ' + errorMessage);
    });
  });

  describe('updateTableAvailability', () => {
    it('should update table availability successfully', async () => {
      const responseData = { success: true };
      axios.put.mockResolvedValue({ data: responseData });

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      const result = await TableService.updateTableAvailability(1, true);
      expect(result).toEqual(responseData);
    });

    it('should throw an error if token is not found', async () => {
      localStorage.removeItem('user');
      await expect(TableService.updateTableAvailability(1, true)).rejects.toThrow('Token não encontrado.');
    });

    it('should throw an error if request fails', async () => {
      const errorMessage = 'Request failed';
      axios.put.mockRejectedValue({ response: { data: { message: errorMessage } } });

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      await expect(TableService.updateTableAvailability(1, true)).rejects.toThrow('Erro ao atualizar disponibilidade da mesa: ' + errorMessage);
    });

    it('should throw an error if request fails without response data', async () => {
      const errorMessage = 'Network Error';
      axios.put.mockRejectedValue(new Error(errorMessage));

      localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

      await expect(TableService.updateTableAvailability(1, true)).rejects.toThrow('Erro ao atualizar disponibilidade da mesa: ' + errorMessage);
    });
  });
});
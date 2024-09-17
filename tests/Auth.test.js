import AuthService from '../src/services/AuthService';
import axios from 'axios';

jest.mock('axios');

describe('AuthService', () => {
  beforeEach(() => {
    // Mock localStorage.setItem
    jest.spyOn(localStorage, 'setItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('login', () => {
    it('should login successfully and store user data', async () => {
      const userData = { jwt: 'dummy-token', username: 'testuser' };
      axios.post.mockResolvedValue({ data: userData });

      const result = await AuthService.login('testuser', 'password');
      expect(result).toEqual(userData);
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(userData));
    });

    it('should throw an error if credentials are incorrect', async () => {
      axios.post.mockRejectedValue(new Error('E-mail ou senha incorretos.'));

      await expect(AuthService.login('testuser', 'wrongpassword')).rejects.toThrow('E-mail ou senha incorretos.');
    });
  });
});
import OrderService from '../src/services/OrderService';
import axios from 'axios';

jest.mock('axios');

describe('OrderService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should create an order successfully', async () => {
    const orderData = { id: 1, item: 'Pizza', quantity: 2 };
    const responseData = { success: true, orderId: 1 };
    axios.post.mockResolvedValue({ data: responseData });

    localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

    const result = await OrderService.createOrder(orderData);
    expect(result).toEqual(responseData);
  });

  it('should throw an error if token is not found', async () => {
    localStorage.removeItem('user');
    await expect(OrderService.createOrder({})).rejects.toThrow('Token não encontrado.');
  });

  it('should get orders successfully', async () => {
    const responseData = [{ id: 1, item: 'Pizza', quantity: 2 }];
    axios.get.mockResolvedValue({ data: responseData });

    localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

    const result = await OrderService.getOrders();
    expect(result).toEqual(responseData);
  });

  it('should throw an error if token is not found when getting orders', async () => {
    localStorage.removeItem('user');
    await expect(OrderService.getOrders()).rejects.toThrow('Token não encontrado.');
  });

  it('should close an order successfully', async () => {
    const orderId = 1;
    const responseData = { success: true };
    axios.put.mockResolvedValue({ data: responseData });

    localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

    const result = await OrderService.closeOrder(orderId);
    expect(result).toEqual(responseData);
  });

  it('should throw an error if token is not found when closing an order', async () => {
    localStorage.removeItem('user');
    await expect(OrderService.closeOrder(1)).rejects.toThrow('Token não encontrado.');
  });

  it('should change order status successfully', async () => {
    const orderId = 1;
    const newStatus = 'completed';
    const responseData = { success: true };
    axios.put.mockResolvedValue({ data: responseData });

    localStorage.setItem('user', JSON.stringify({ jwt: 'dummy-token' }));

    const result = await OrderService.changeOrderStatus(orderId, newStatus);
    expect(result).toEqual(responseData);
  });

  it('should throw an error if token is not found when changing order status', async () => {
    localStorage.removeItem('user');
    await expect(OrderService.changeOrderStatus(1, 'completed')).rejects.toThrow('Token não encontrado.');
  });
});
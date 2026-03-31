import axios from 'axios';

const API_URL = 'https://canteen-preorder-system.onrender.com/api';
const getMyOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/orders/mine`, config);
  return response.data;
};

const getOrderById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/orders/${id}`, config);
  return response.data;
};

const orderService = {
  getMyOrders,
  getOrderById,
};

export default orderService;

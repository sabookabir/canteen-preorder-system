import axios from 'axios';

const API_URL = 'https://canteen-preorder-system.onrender.com/api';
const getMenuItems = async () => {
  const response = await axios.get(`${API_URL}/menu`);
  return response.data;
};

const menuService = {
  getMenuItems,
};

export default menuService;

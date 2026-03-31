import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getMenuItems = async () => {
  const response = await axios.get(`${API_URL}/menu`);
  return response.data;
};

const menuService = {
  getMenuItems,
};

export default menuService;

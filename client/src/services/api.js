import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust if needed

export const fetchProgress = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/progress`);
    return response.data;
  } catch (error) {
    console.error('Error fetching progress:', error);
    throw error;
  }
};

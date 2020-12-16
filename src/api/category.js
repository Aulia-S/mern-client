import axios from 'axios';
import { URL } from './URL'

export const createCategory = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await axios.post(`${URL}/api/category`, formData, config);

  return response;
}
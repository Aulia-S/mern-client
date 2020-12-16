import axios from 'axios';
import { URL } from './URL' 

export const signup = async data => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${URL}/api/auth/signup`, data, config);

  return response;
}

export const signin = async data => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${URL}/api/auth/signin`, data, config);

  return response;
}
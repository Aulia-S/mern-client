import axios from 'axios';

const URL = 'http://localhost:5000'

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
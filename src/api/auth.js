import axios from 'axios';

const URL = 'http://localhost:5000'

const signup = async data => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${URL}/api/auth/signup`, data, config);

  return response;
}

export { signup };
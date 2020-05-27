import axios from 'axios';

export const createAPI = () => {
  return axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });
};

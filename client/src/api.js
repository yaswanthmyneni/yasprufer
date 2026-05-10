import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export { api };

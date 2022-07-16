import axios from 'axios';
import store from './src/store';
export const API = axios.create({ baseURL: "http://localhost:8080" });
API.interceptors.request.use(
  (config) => {
    /* Connect to Vue State */
    console.log(store);
    let token = store.getters["user/token"]["token"];
    token = token ? `Bearer ${token}` : "";
    console.log('token', token);
    /* const { user } = store.getState();
    const token = user.token ? `Bearer ${user.token}` : ""; */
    config.headers = {
      Authorization: token,
      ...config.headers,
      accept: "/",
    };
    return config;
  },
  (err) => err
);

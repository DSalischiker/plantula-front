import axios from 'axios';
export const API = axios.create({ baseURL: "http://localhost:8080" });
API.interceptors.request.use(
  (config) => {
    /* cONNECT TO VUE sTATE */
    /* const { user } = store.getState();
    const token = user.token ? `Bearer ${user.token}` : ""; */
    config.headers = {
      //Authorization: token,
      ...config.headers,
      accept: "/",
    };
    return config;
  },
  (err) => err
);

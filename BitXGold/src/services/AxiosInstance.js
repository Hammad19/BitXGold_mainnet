import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  //baseURL: `http://localhost:4000`,
  baseURL: `https://api.bitx.gold`,
  //baseURL: `https://ill-veil-colt.cyclic.app`,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();

  const token = state.auth.auth.idToken;
  if (token) {
    config.headers["authorization"] = token;
  }
  return config;
});

export default axiosInstance;
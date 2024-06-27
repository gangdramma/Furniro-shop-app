import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const http = axios.create({ baseURL: "https://dummyjson.com" });

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) toast.error(error.response?.data);
    return Promise.reject(error);
  }
);

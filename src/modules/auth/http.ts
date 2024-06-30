import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { session } from "../../service/session";

export const http = axios.create({
  baseURL: "https://limitless-peak-31978-868db4faa179.herokuapp.com",
});

http.interceptors.request.use((request) => {
  const token = session.get();

  if (token) {
    request.headers = {
      ...request.headers,
      ["Authorization"]: token,
    } as any;
  }

  return request;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) toast.error(error.response?.data);
    return Promise.reject(error);
  }
);

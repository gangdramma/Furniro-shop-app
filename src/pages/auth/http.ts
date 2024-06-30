import axios from "axios";
const BASE_URL = "https://limitless-peak-31978-868db4faa179.herokuapp.com";

export const http = axios.create({
  baseURL: BASE_URL,
});

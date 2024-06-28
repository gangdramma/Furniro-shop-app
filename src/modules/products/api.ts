import { http } from "../../service";

export const getProducts = () => {
  return http.get("/products?limit=130");
};

export const getSingleProduct = (productId: number) => {
  return http.get(`/products/${productId}`);
};

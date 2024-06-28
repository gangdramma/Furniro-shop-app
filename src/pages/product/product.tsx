import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import * as Api from "../../modules/products/api";
import * as Mapper from "../../modules/products/mappers";
import * as Types from "../../modules/products/types";
import "../../assets/styles/products.scss";

const Products = () => {
  const [products, setProducts] = useState<Types.IEntity.IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await Api.getProducts();
      const mappedProducts = response.data.products.map((item: any) =>
        Mapper.mapProduct(item)
      );
      setProducts(mappedProducts);
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const memoizedProducts = useMemo(() => {
    return products.map((product) => (
      <li key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img src={product.images[0]} alt="" />
        </Link>
        <h2>{product.title}</h2>
      </li>
    ));
  }, [products]);

  return <div>{loading ? <Loader /> : <ul>{memoizedProducts}</ul>}</div>;
};

export default Products;

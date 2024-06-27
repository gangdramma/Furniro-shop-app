import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Api from "../../modules/products/api";
import * as Mapper from "../../modules/products/mappers";
import * as Types from "../../modules/products/types";

const Products = () => {
  const [products, setProducts] = useState<Types.IEntity.IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await Api.getProducts();
      const mappedProducts = response.data.products.map((item: any) =>
        Mapper.mapProduct(item)
      );
      setProducts(mappedProducts);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const memoizedProducts = useMemo(() => {
    return products.map((product) => (
      <li key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img src={product.thumbnail} alt="" />
        </Link>
        <h2>{product.title}</h2>
      </li>
    ));
  }, [products]);

  return (
    <div>
      <ul>{memoizedProducts}</ul>
    </div>
  );
};

export default Products;

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as Api from "../../modules/products/api";
import * as Mapper from "../../modules/products/mappers";
import * as Types from "../../modules/products/types";

const Single = () => {
  const { productId } = useParams<{ productId: any }>();
  const [product, setProduct] = useState<Types.IEntity.IProduct | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await Api.getSingleProduct(productId);
      const mappedProduct = Mapper.mapProduct(response.data);
      setProduct(mappedProduct);
    } catch (error) {
      toast.error("Failed to fetch product");
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <li key={product.id}>
        <img src={product.thumbnail} alt={product.title} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
      </li>
    </div>
  );
};

export default Single;

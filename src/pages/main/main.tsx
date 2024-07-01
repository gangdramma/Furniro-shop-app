import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../assets/styles/main.scss";
import { IMain } from "./types";
import Footer from "../../components/footer";

const Main: React.FC = () => {
  const [products, setProducts] = useState<IMain.Product[]>([]);

  useEffect(() => {
    axios
      .get<IMain.ProductResponse>("https://dummyjson.com/products?limit=5")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching the products data: ", error);
      });
  }, []);

  return (
    <>
      <div className="carousel-container">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={false}
          interval={1000}
          showIndicators={true}
        >
          {products.map((product) => (
            <div key={product.id} className="carousel-item">
              <img
                src={product.images[0]}
                alt={product.title}
                className="carousel-image"
              />
              {/* <div className="product-info">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div> */}
            </div>
          ))}
        </Carousel>
      </div>
      <Footer />
    </>
  );
};

export default Main;

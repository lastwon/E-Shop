import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ProductItem from "./ProductItem";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "../styles/products.css";

const ProductsList = ({ products }) => {
  return (
    <div className="products" id="products">
      <Splide
        className="product__slider"
        options={{ perPage: 4, gap: "15px", pagination: false, perMove: 1 }}
      >
        {products.map((product) => (
          <SplideSlide key={product.id}>
            <ProductItem product={product} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default ProductsList;

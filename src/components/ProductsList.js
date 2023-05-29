import React from "react";
import ProductItem from "./ProductItem";

import "../styles/products.css";

const ProductsList = ({ products }) => {
  return (
    <div className="products" id="products">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;

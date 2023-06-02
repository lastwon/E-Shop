import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";

import ProductsList from "./ProductsList";

import "../styles/products.css";
import Countdown from "./Countdown";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Fetch products data from Chec and stores in the products data object.
   * https://commercejs.com/docs/sdk/products
   */
  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
        console.log(products.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  return (
    <>
      <div className="spacer"></div>
      <div className="main-container">
        <Countdown />
        <ProductsList products={products} />
        <div className="spacer"></div>
      </div>
    </>
  );
};

export default Products;

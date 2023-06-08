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

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.log("There was an error fetching the products", error);
    }
  };

  return (
    <div className="main-container">
      <div className="spacer"></div>
      <Countdown />
      <ProductsList products={products} />
      <div className="spacer"></div>
    </div>
  );
};

export default Products;

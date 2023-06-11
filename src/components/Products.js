import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import ProductItem from "./ProductItem";
import Countdown from "./Countdown";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);

      const categoriesSet = new Set();
      data.forEach((product) => {
        product.categories.forEach((category) => {
          categoriesSet.add(category.name);
        });
      });
      const categoriesArray = Array.from(categoriesSet);
      setCategories(categoriesArray);

      console.log(data);
    } catch (error) {
      console.log("There was an error fetching the products", error);
    }
  };

  const desiredCategories = ["Computers", "Phones"];

  return (
    <div className="main-container">
      <div className="spacer"></div>
      {categories
        .filter((category) => desiredCategories.includes(category))
        .map((category) => (
          <div key={category}>
            <h2 className="category__title">{category}</h2>
            <div className="products" id="products">
              <Splide
                className="product__slider"
                options={{
                  perPage: 4,
                  gap: "15px",
                  pagination: false,
                  perMove: 1,
                }}
              >
                {products
                  .filter((product) =>
                    product.categories.find((cat) => cat.name === category)
                  )
                  .map((product) => (
                    <SplideSlide key={product.id}>
                      <ProductItem product={product} />
                    </SplideSlide>
                  ))}
              </Splide>
            </div>
            <div className="spacer"></div>
          </div>
        ))}
    </div>
  );
};

export default Products;

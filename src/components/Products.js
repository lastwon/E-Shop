import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
import ProductItem from "./ProductItem";
import Countdown from "./Countdown";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";

import { banners } from "./Banners";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await commerce.products.list({ limit: 100 });
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

    fetchProducts();
  }, []);

  const desiredCategories = ["Sale", "TOP", "Computers", "Phones", "Perfumes"];

  return (
    <div className="main-container">
      <div className="spacer"></div>
      {categories
        .filter((category) => desiredCategories.includes(category))
        .sort((a, b) => {
          if (a === "Sale") return -1;
          if (b === "Sale") return 1;
          return 0;
        })
        .map((category, index) => (
          <div key={category}>
            {banners.slice(index, index + 1).map((banner) => (
              <div key={banner.id} className="home-banners">
                <div className="banner1">
                  <Link to={`/${banner.link}`}>
                    <img src={banner.img} alt="" />
                  </Link>
                </div>
                <div className="banner2">
                  <Link to={`/${banner.link2}`}>
                    <img src={banner.img2} alt="" />
                  </Link>
                </div>
              </div>
            ))}
            <div className="spacer"></div>
            {category === "Sale" ? <Countdown /> : ""}
            {category === "Computers" ? (
              <h2 className="category__title">Laptops</h2>
            ) : (
              ""
            )}
            {category === "Phones" ? (
              <h2 className="category__title">Mobile phones</h2>
            ) : (
              ""
            )}
            {category === "TOP" ? (
              <h2 className="category__title">TOP products</h2>
            ) : (
              ""
            )}
            {category === "Perfumes" ? (
              <h2 className="category__title">Perfumes and cosmetics</h2>
            ) : (
              ""
            )}
            <div className="products" id="products">
              <Splide
                className="product__slider"
                options={{
                  perPage: 4,
                  gap: "15px",
                  pagination: false,
                  perMove: 1,
                  breakpoints: {
                    1225: {
                      perPage: 3,
                      gap: "15px",
                    },
                    860: {
                      perPage: 2,
                      gap: "15px",
                    },
                    600: {
                      perPage: 1,
                    },
                  },
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

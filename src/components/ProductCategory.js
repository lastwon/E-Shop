import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";

import Nav from "./Nav";
import Footer from "./Footer";

import { CiDeliveryTruck } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import greenCircle from "../images/green-circle.svg";
import priceFront from "../images/priceFront.svg";
import Unitsleft from "./Unitsleft";
import ProductCategoryCurrent from "./ProductCategoryCurrent";

const ProductCategory = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatPrice = (price) => {
    const [integerPart, decimalPart] = price.toString().split(".");
    if (decimalPart === "00") {
      return <span>{integerPart}</span>;
    } else {
      return (
        <>
          <span>{integerPart}</span>
          {decimalPart && (
            <>
              <span>.</span>
              <sup className="product__price-decimal">{decimalPart}</sup>
            </>
          )}
        </>
      );
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await commerce.products.list({
          category_slug: [params.productCategory],
        });
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error retrieving products:", error);
      }
    };

    fetchProducts();
  }, [params.productCategory]);

  return (
    <>
      <Nav />
      <div className="main-container">
        <div className="spacer"></div>
        <div className="category__title">
          <span>{capitalizeFirstLetter(params.productCategory)}</span>
        </div>
        <div className="products" id="products">
          {product ? (
            <ProductCategoryCurrent product={product} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="spacer"></div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCategory;

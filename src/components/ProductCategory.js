import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../lib/commerce";

import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import banner4 from "../images/banner4.jpg";
import banner5 from "../images/banner5.jpg";
import banner6 from "../images/tvs.jpg";
import banner7 from "../images/tvs2.jpg";
import banner8 from "../images/perfume1.jpg";
import banner9 from "../images/perfume2.jpg";
import banner10 from "../images/garden1.jpg";
import banner11 from "../images/garden2.jpg";
import banner12 from "../images/furniture1.jpg";
import banner13 from "../images/furniture2.jpg";
import banner14 from "../images/sports1.jpg";
import banner15 from "../images/toys1.webp";
import banner16 from "../images/toys2.webp";
import banner17 from "../images/footwear2.jpg";

import Nav from "./Nav";
import Footer from "./Footer";
import ProductCategoryCurrent from "./ProductCategoryCurrent";
import Loader from "./Loader";

const ProductCategory = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const [loader, setLoader] = useState(false);

  const bannerImages = {
    phones: [banner1, banner2],
    computers: [banner3, banner4, banner5],
    electronics: [banner6, banner7],
    perfumes: [banner8, banner9],
    garden: [banner10, banner11],
    furniture: [banner12, banner13],
    sports: [banner14],
    toys: [banner15, banner16],
    footwear: [banner17],
  };

  const categoryBanners =
    params.productCategory in bannerImages ? (
      <div className={`${params.productCategory}__banners`}>
        {bannerImages[params.productCategory].map((banner, index) => (
          <div key={index} className="banner__container">
            <img src={banner} alt="bannerIMG" />
          </div>
        ))}
      </div>
    ) : null;

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
        setLoader(true);
        const response = await commerce.products.list({
          category_slug: [params.productCategory],
        });
        setProduct(response.data);
        setLoader(false);
      } catch (error) {
        console.log("Error retrieving products:", error);
      }
    };

    fetchProducts();
  }, [params.productCategory]);

  if (loader) {
    return (
      <>
        <Nav />
        <div className="main-container">
          <div className="spacer"></div>
          <div className="loader-pc">
            <Loader />
          </div>
          <div className="spacer"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="main-container">
        <div className="spacer"></div>
        <div className="category__title-name">
          <span>
            {capitalizeFirstLetter(params.productCategory)} (
            {product && product.length})
          </span>
          {categoryBanners}
        </div>
        <div className="products__category">
          {product && <ProductCategoryCurrent product={product} />}
        </div>
        <div className="spacer"></div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCategory;

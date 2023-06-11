import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../lib/commerce";

import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import banner4 from "../images/banner4.jpg";
import banner5 from "../images/banner5.jpg";

import Nav from "./Nav";
import Footer from "./Footer";
import ProductCategoryCurrent from "./ProductCategoryCurrent";
import Loader from "./Loader";

const ProductCategory = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const [loader, setLoader] = useState(false);

  const phoneBanners =
    params.productCategory === "phones" ? (
      <div className="phone__banners">
        <div>
          <img src={banner1} alt="" />
        </div>
        <div>
          <img src={banner2} alt="" />
        </div>
      </div>
    ) : (
      ""
    );

  const computerBanners =
    params.productCategory === "computers" ? (
      <div className="computers__banners">
        <div>
          <img src={banner3} alt="" />
        </div>
        <div>
          <img src={banner4} alt="" />
        </div>
        <div>
          <img src={banner5} alt="" />
        </div>
      </div>
    ) : (
      ""
    );

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
        console.log(response.data);
        setLoader(false);
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
          {phoneBanners}
          {computerBanners}
        </div>
        <div className="products__category" id="products">
          {product && <ProductCategoryCurrent product={product} />}
        </div>
        {loader && (
          <div className="loader">
            <Loader />
          </div>
        )}
        <div className="spacer"></div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCategory;

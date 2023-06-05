import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../lib/commerce";
import greenCircle from "../images/green-circle.svg";
import { CiDeliveryTruck } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import Unitsleft from "./Unitsleft";

import "../styles/productDetail.css";

import Nav from "./Nav";
import Footer from "./Footer";
import SimilarProducts from "./SimilarProducts";

const ProductDetails = () => {
  const params = useParams();
  const [productInfo, setProductInfo] = useState(null);

  const getProduct = async () => {
    try {
      const product = await commerce.products.retrieve(params.productName);
      setProductInfo(product);
      console.log(product);
    } catch (error) {
      console.error("Error retrieving product:", error);
    }
  };

  const removeTags = (text) => {
    const desc = productInfo.description;
    let plainText = desc.replace(/<p>/g, "");
    plainText = plainText.replace(/<\/p>/g, "");
    return plainText;
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Nav />
      {productInfo && (
        <div className="main-container">
          <div className="product__category">
            <img src={greenCircle} alt="green-circle" />
            <span>{productInfo.categories[0].name}</span>
          </div>
          <div className="product__name">{productInfo.name}</div>
          <div className="product__general">
            <div className="rating">
              <AiFillStar
                className="star"
                style={{ height: "100%", width: "auto", paddingRight: "5px" }}
              />
              <span>0.0</span>
            </div>
            <div className="delivery">
              <CiDeliveryTruck
                style={{ height: "100%", width: "auto", paddingRight: "5px" }}
              />
              <span>0-2 W/D</span>
            </div>
            <Unitsleft product={productInfo} />
          </div>
          <div className="image">
            <img src={productInfo.image.url} alt={productInfo.name} />
          </div>
          <div className="description">
            <h3>Description</h3>
            <span>{removeTags(productInfo.description)}</span>
          </div>
          <div className="similar__goods">
            <h3>Similar goods</h3>
            <SimilarProducts product={productInfo} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;

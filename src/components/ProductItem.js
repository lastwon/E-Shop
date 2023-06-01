import React, { Component } from "react";
import { stripHtml } from "string-strip-html";

import { CiDeliveryTruck } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import greenCircle from "../images/green-circle.svg";
import priceFront from "../images/priceFront.svg";
import Unitsleft from "./Unitsleft";

const ProductItem = ({ product }) => {
  const { result } = stripHtml(product.description);

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

  return (
    <div className="product__card">
      <div className="image__container">
        <img
          className="product__image"
          src={product.image?.url}
          alt={product.name}
        />
      </div>
      <div className="product__info">
        {/*<div className="product__category">
          <img src={greenCircle} alt="green-circle" />
          <span>{product.category}</span>
  </div>*/}
        <div className="product__name">
          <a href="">{product.name}</a>
        </div>
      </div>
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
        <Unitsleft product={product} />
      </div>
      <div className="product__price">
        <img src={priceFront} alt="price-front" />
        <div className="product__mid__price">
          <span>{formatPrice(product.price.raw)} €</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

import React from "react";
import { stripHtml } from "string-strip-html";

import greenCircle from "../images/green-circle.svg";
import priceFront from "../images/priceFront.svg";

const ProductItem = ({ product }) => {
  const { result } = stripHtml(product.description);

  const formatPrice = (price) => {
    const [integerPart, decimalPart] = price.toString().split(".");
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
  };

  return (
    <div className="product__card">
      <div className="image__container">
        <img
          className="product__image"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="product__info">
        <div className="product__category">
          <img src={greenCircle} alt="green-circle" />
          <span>{product.category}</span>
        </div>
        <div className="product__name">
          <a href="">{product.title}</a>
        </div>
      </div>
      <div className="product__price">
        <img src={priceFront} alt="price-front" />
        <div className="product__mid__price">
          <span>{formatPrice(product.price)} €</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

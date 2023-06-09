import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import greenCircle from "../images/green-circle.svg";
import priceFront from "../images/priceFront.svg";
import Unitsleft from "./Unitsleft";

const ProductCategoryCurrent = ({ product }) => {
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
    <>
      {product.map((productItem) => (
        <div className="product__card" key={productItem.id}>
          <div className="image__container">
            <Link to={`/${productItem.id}`}>
              <img
                className="product__image"
                src={productItem.image?.url}
                alt={productItem.name}
              />
            </Link>
          </div>
          <div className="product__info">
            {productItem.categories &&
              productItem.categories.map((category) => (
                <div key={category.id} className="product__category">
                  <img src={greenCircle} alt="green-circle" />
                  <span>{category.name}</span>
                </div>
              ))}
            <div className="product__name">
              <a href="">{productItem.name}</a>
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
            <Unitsleft product={productItem} />
          </div>
          <div className="product__price">
            <img src={priceFront} alt="price-front" />
            <div className="product__mid__price">
              {productItem.price && (
                <span>{formatPrice(productItem.price.raw)} €</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCategoryCurrent;

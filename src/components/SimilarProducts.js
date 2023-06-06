import React from "react";
import { Link } from "react-router-dom";

import "../styles/products.css";

import { CiDeliveryTruck } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import greenCircle from "../images/green-circle.svg";
import priceFront from "../images/priceFront.svg";
import Unitsleft from "./Unitsleft";
import Stock from "./Stock";

const SimilarProducts = ({ product, formatPrice }) => {
  const { related_products } = product;

  return (
    <div className="products" id="products">
      {related_products.map((related) => (
        <div key={related.id} className="product__card">
          <div className="image__container">
            <Link to={`/${product.id}`}>
              <img
                className="product__image"
                src={related.image?.url}
                alt={related.name}
              />
            </Link>
          </div>
          <div className="product__info">
            <div key={related.id} className="product__name">
              <a href="">{related.name}</a>
            </div>
          </div>
          <div className="product__general">
            <div className="rating">
              <AiFillStar
                className="star"
                style={{
                  height: "100%",
                  width: "auto",
                  paddingRight: "5px",
                }}
              />
              <span>0.0</span>
            </div>
            <div className="delivery">
              <CiDeliveryTruck
                style={{
                  height: "100%",
                  width: "auto",
                  paddingRight: "5px",
                }}
              />
              <span>0-2 W/D</span>
            </div>
            <Stock stockLevel={related.quantity} />
          </div>
          <div className="product__price">
            <img src={priceFront} alt="price-front" />
            <div className="product__mid__price">
              <span>{formatPrice(related.price.raw)} €</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimilarProducts;

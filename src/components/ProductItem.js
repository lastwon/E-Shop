import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { commerce } from "../lib/commerce";

import { CiDeliveryTruck } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import greenCircle from "../images/green-circle.svg";
import priceFront from "../images/priceFront.svg";
import Unitsleft from "./Unitsleft";

const ProductItem = ({ product }) => {
  const { isAuthenticated } = useAuth0();

  // Function to retrieve or create a cart
  const getOrCreateCart = async () => {
    try {
      await commerce.cart.retrieve().then((cart) => console.log(cart));
    } catch (error) {
      // Handle any errors that occur
      console.error("Error retrieving or creating cart:", error);
    }
  };

  // Function to add a product to the cart
  const addToCart = async (productId, quantity) => {
    try {
      // Add the product to the cart
      commerce.cart
        .add(productId, quantity)
        .then((response) => console.log(response));
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Usage: Retrieve or create a cart and add a product to it
  const initialize = async () => {
    // Retrieve or create a cart
    const cart = await getOrCreateCart();
    addToCart(product.id, 1);
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
        {product.categories.map((category) => (
          <div key={category.id} className="product__category">
            <img src={greenCircle} alt="green-circle" />
            <span>{category.name}</span>
          </div>
        ))}
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
          <button onClick={() => initialize()}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

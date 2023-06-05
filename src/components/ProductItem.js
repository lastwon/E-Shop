import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { commerce } from "../lib/commerce";
import Notification from "./Notification";

import { CiDeliveryTruck } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import greenCircle from "../images/green-circle.svg";
import priceFront from "../images/priceFront.svg";
import Unitsleft from "./Unitsleft";

const ProductItem = ({ product }) => {
  const { isAuthenticated } = useAuth0();
  const [notification, setNotification] = useState("");

  const getOrCreateCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();
      console.log(cart);
    } catch (error) {
      console.error("Error retrieving or creating cart:", error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await commerce.cart.add(productId, quantity);
      console.log(response);
      setNotification("Added to the cart!");
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

  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(() => {
        setNotification("");
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [notification]);

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
        </div>
        {!isAuthenticated ? (
          ""
        ) : (
          <button onClick={() => initialize()}>+</button>
        )}
      </div>
      {notification && <Notification notification={notification} />}
    </div>
  );
};

export default ProductItem;

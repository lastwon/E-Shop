import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

import "../styles/cart.css";

import Nav from "./Nav";
import Footer from "./Footer";
import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getCartContent();
  }, []);

  const getCartContent = async () => {
    try {
      const cartData = await commerce.cart.retrieve();
      setCart(cartData);
      console.log(cartData);
    } catch (error) {
      console.error("Error retrieving cart content", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="main-container">
        <div className="spacer"></div>
        {cart && <CartItem cart={cart} />}{" "}
        {/* Render CartItem only if cart is not null */}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

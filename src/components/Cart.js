import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

import "../styles/cart.css";

import Nav from "./Nav";
import Footer from "./Footer";
import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCartContent();
  }, []);

  const getCartContent = async () => {
    setLoading(true);
    try {
      const cartData = await commerce.cart.retrieve();
      setCart(cartData);
    } catch (error) {
      console.error("Error retrieving cart content", error);
    }
    setLoading(false);
  };

  const handleUpdateCart = async () => {
    setLoading(true);
    try {
      const cartData = await commerce.cart.retrieve();
      setCart(cartData);
    } catch (error) {
      console.error("Error updating cart", error);
    }
    setLoading(false);
  };

  const handleSubtract = async (line_item_id, item_quantity) => {
    try {
      await commerce.cart.update(line_item_id, { quantity: item_quantity - 1 });
      handleUpdateCart();
    } catch (error) {
      console.error("Error subtracting item from cart", error);
    }
  };

  const handleAdd = async (line_item_id, item_quantity) => {
    try {
      await commerce.cart.update(line_item_id, { quantity: item_quantity + 1 });
      handleUpdateCart();
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="main-container">
        <div className="spacer"></div>
        {loading
          ? "loading..."
          : cart && (
              <CartItem
                cart={cart}
                handleSubtract={handleSubtract}
                handleAdd={handleAdd}
                loading={loading}
              />
            )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

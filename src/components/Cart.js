import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";
import "../styles/cart.css";

import Nav from "./Nav";
import Footer from "./Footer";
import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loadingItems, setLoadingItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    handleUpdateCart();
  }, []);

  const handleUpdateCart = async () => {
    setLoadingCart(true);
    try {
      const cartData = await commerce.cart.retrieve();
      setCart(cartData);
    } catch (error) {
      console.error("Error updating cart", error);
    }
    setLoadingCart(false);
  };

  const handleSubtract = async (line_item_id, item_quantity) => {
    setLoadingItems((prevLoadingItems) => [...prevLoadingItems, line_item_id]);
    try {
      await commerce.cart.update(line_item_id, { quantity: item_quantity - 1 });
      handleUpdateCart();
    } catch (error) {
      console.error("Error subtracting item from cart", error);
    } finally {
      setLoadingItems((prevLoadingItems) =>
        prevLoadingItems.filter((id) => id !== line_item_id)
      );
    }
  };

  const handleAdd = async (line_item_id, item_quantity) => {
    setLoadingItems((prevLoadingItems) => [...prevLoadingItems, line_item_id]);
    try {
      await commerce.cart.update(line_item_id, { quantity: item_quantity + 1 });
      handleUpdateCart();
    } catch (error) {
      console.error("Error adding item to cart", error);
    } finally {
      setLoadingItems((prevLoadingItems) =>
        prevLoadingItems.filter((id) => id !== line_item_id)
      );
    }
  };

  const handleRemoveFromCart = async (line_item_id) => {
    setLoadingItems((prevLoadingItems) => [...prevLoadingItems, line_item_id]);
    try {
      await commerce.cart.remove(line_item_id);
      handleUpdateCart();
    } catch (error) {
      console.error("Error removing item from cart", error);
    } finally {
      setLoadingItems((prevLoadingItems) =>
        prevLoadingItems.filter((id) => id !== line_item_id)
      );
    }
  };

  return (
    <>
      <Nav />
      <div className="main-container">
        <div className="spacer"></div>
        {cart && (
          <CartItem
            cart={cart}
            handleSubtract={handleSubtract}
            handleAdd={handleAdd}
            handleRemove={handleRemoveFromCart}
            loadingItems={loadingItems}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

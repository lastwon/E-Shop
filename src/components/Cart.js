import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { commerce } from "../lib/commerce";
import "../styles/cart.css";

import Nav from "./Nav";
import Footer from "./Footer";
import CartItem from "./CartItem";
import CartCheckout from "./CartCheckout";
import Notification from "./Notification";
import Loader from "./Loader";

const Cart = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [cart, setCart] = useState(null);
  const [loadingItems, setLoadingItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      handleUpdateCart();
    }
  }, [isAuthenticated]);

  const handleUpdateCart = async () => {
    setLoadingCart(true);
    try {
      let cartData = await commerce.cart.retrieve();

      // Retrieve each item in the cart
      for (let item of cartData.line_items) {
        // Retrieve the product associated with the item
        const product = await commerce.products.retrieve(item.product_id);

        // If item quantity is greater than available quantity, update the item quantity
        if (item.quantity > product.inventory.available) {
          await commerce.cart.update(item.id, {
            quantity: product.inventory.available,
          });
          setNotification("Item quantity adjusted to available stock!");
        }
      }

      // Refresh the cart data after potentially updating quantities
      cartData = await commerce.cart.retrieve();

      setCart(cartData);
    } catch (error) {
      console.error("Error updating cart", error);
    } finally {
      setLoadingCart(false);
    }
  };

  const handleSubtract = async (line_item_id, item_quantity) => {
    setLoadingItems((prevLoadingItems) => [...prevLoadingItems, line_item_id]);
    try {
      await commerce.cart.update(line_item_id, { quantity: item_quantity - 1 });
      handleUpdateCart();
      setNotification("Successfully updated!");
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
      setNotification("Successfully updated!");
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
      setNotification("Product successfully removed!");
    } catch (error) {
      console.error("Error removing item from cart", error);
    } finally {
      setLoadingItems((prevLoadingItems) =>
        prevLoadingItems.filter((id) => id !== line_item_id)
      );
    }
  };

  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(() => {
        setNotification("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [notification]);

  if (!isAuthenticated) {
    return loginWithRedirect();
  }
  if (loadingCart) {
    return (
      <>
        <Nav />
        <div className="spacer"></div>
        <div className="main-container">
          <div className="loader-pc">
            <Loader />
          </div>
        </div>
        <div className="spacer"></div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="main-container">
        <div className="spacer"></div>
        <div className="cart__content">
          {cart && (
            <CartItem
              cart={cart}
              handleSubtract={handleSubtract}
              handleAdd={handleAdd}
              handleRemove={handleRemoveFromCart}
              loadingItems={loadingItems}
            />
          )}
          <div className="cart__checkout">
            {cart && <CartCheckout cart={cart} />}
            {notification && <Notification notification={notification} />}
          </div>
        </div>
        <div className="spacer"></div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

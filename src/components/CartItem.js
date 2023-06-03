import React from "react";
import { commerce } from "../lib/commerce";

import "../styles/cart.css";

const CartItem = ({ cart, handleSubtract, handleAdd, loading }) => {
  const { line_items } = cart;

  return (
    <>
      <div className="cart__item">
        <strong className="cart__title">Cart</strong>
        {line_items.map((item) => (
          <div key={item.id} className="cart__details">
            <div className="img__AndName">
              <div className="cart__image">
                <img src={item.image.url} alt={item.name} />
              </div>
              <span className="cart__name">{item.name}</span>
            </div>
            <span className="cart__price">
              <button
                onClick={() => {
                  handleSubtract(item.id, item.quantity);
                }}
              >
                -
              </button>
              {loading ? "Loading" : item.quantity}
              <button onClick={() => handleAdd(item.id, item.quantity)}>
                +
              </button>
            </span>
            <span className="cart__subtotal">{item.line_total.raw} €</span>
          </div>
        ))}
      </div>
      <div className="spacer"></div>
    </>
  );
};

export default CartItem;

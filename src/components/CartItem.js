import React from "react";

import "../styles/cart.css";

const CartItem = ({ cart }) => {
  const { line_items } = cart;

  return (
    <>
      <div className="cart__item">
        <strong className="cart__title">Cart</strong>
        {line_items.map((item) => (
          <div key={item.id} className="cart__details">
            <div className="cart__image">
              <img src={item.image.url} alt={item.name} />
            </div>
            <span className="cart__name">{item.name}</span>
            <span className="cart__price">
              {/*THIS WHERE WILL BE AMOUNT OF PRODUCTS, WHERE U CAN ADD OR MINUS*/}
            </span>
            <span className="cart__subtotal">
              Subtotal: {item.line_total.raw} €
            </span>
          </div>
        ))}
      </div>
      <div className="spacer"></div>
    </>
  );
};

export default CartItem;

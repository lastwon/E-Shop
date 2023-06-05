import React from "react";

import "../styles/cart.css";

import { MdKeyboardArrowRight } from "react-icons/md";

const CartCheckout = ({ cart }) => {
  const { total_items, subtotal, hosted_checkout_url } = cart;
  return (
    <div className="cart__info">
      <span>
        <b>{total_items}</b> Goods and price with delivery:
      </span>
      <span>
        <b>{subtotal.raw} €</b>
      </span>
      <div className="button__box">
        <a href={hosted_checkout_url}>
          Order <MdKeyboardArrowRight />
        </a>
      </div>
    </div>
  );
};

export default CartCheckout;

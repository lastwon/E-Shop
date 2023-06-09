import React from "react";
import { commerce } from "../lib/commerce";

import "../styles/cart.css";
import Loader from "./Loader";

const CartItem = ({
  cart,
  handleSubtract,
  handleAdd,
  handleRemove,
  loadingItems,
}) => {
  const { line_items } = cart;

  const handleAddItem = async (itemId, productId, currentQuantity) => {
    const currentProduct = await commerce.products.retrieve(productId);
    const { inventory } = currentProduct;
    if (currentQuantity < inventory.available) {
      handleAdd(itemId, currentQuantity);
    } else {
      console.log("cant add more items");
    }
  };

  return (
    <>
      {line_items.length > 0 ? (
        <div className="cart__item">
          <strong className="cart__title">Cart ({line_items.length})</strong>
          {line_items.map((item) => {
            const isLoading = loadingItems.includes(item.id);

            return (
              <div key={item.id} className="cart__details">
                <div className="img__AndName">
                  <div className="cart__image">
                    <img src={item.image.url} alt={item.name} />
                  </div>
                  <span className="cart__name">{item.name}</span>
                </div>
                <span className="cart__price">
                  <button
                    onClick={() => handleSubtract(item.id, item.quantity)}
                  >
                    -
                  </button>
                  {isLoading ? (
                    <div className="loaderr">
                      <Loader />
                    </div>
                  ) : (
                    item.quantity
                  )}
                  <button
                    onClick={() =>
                      handleAddItem(item.id, item.product_id, item.quantity)
                    }
                  >
                    +
                  </button>
                </span>
                <span className="cart__subtotal">{item.line_total.raw} €</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="cart__remove__item"
                ></button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="cart__item">
          <div className="empty">
            <h1>Cart is empty...</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;

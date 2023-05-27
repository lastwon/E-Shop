import React from "react";

import "../styles/nav.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillShopping } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { BsCart } from "react-icons/bs";

const Nav = () => {
  return (
    <nav>
      <a className="burger" href="">
        <GiHamburgerMenu
          style={{ width: "25px", height: "25px", padding: "5px" }}
        />
        <span>All products</span>
      </a>
      <a className="logo" href="">
        <AiFillShopping
          style={{ width: "25px", height: "25px", marginRight: "4.3px" }}
        />
        <span>Shope</span>
      </a>
      <form className="search-container" method="GET" action="/search/">
        <input
          className="search-bar"
          type="text"
          autoComplete="off"
          placeholder="Search"
        />
        <button className="search-go" type="submit">
          <AiOutlineSearch style={{ width: "21px", height: "auto" }} />
        </button>
      </form>
      <div className="reg-login">
        <a href="">
          <BiUser
            style={{
              width: "32px",
              height: "auto",
              padding: "8px 5px 10px 5px",
              color: "#212121",
            }}
          />
          <span className="register">
            <span>Registration</span>
            <span>Login</span>
          </span>
        </a>
      </div>
      <div className="wishlist-container">
        <a href="">
          <AiOutlineHeart
            style={{
              width: "32px",
              height: "auto",
              padding: "8px 5px 10px 5px",
              color: "#212121",
            }}
          />
          <span className="wishlist">
            <span>Liked</span>
            <span>Goods</span>
          </span>
        </a>
      </div>
      <div className="help-container">
        <a href="">
          <BiHelpCircle
            style={{
              width: "32px",
              height: "auto",
              padding: "8px 5px 10px 5px",
              color: "#212121",
            }}
          />
          <span className="help-text">
            <span>Shope</span>
            <span>Help</span>
          </span>
        </a>
      </div>
      <div className="shopping-container">
        <a href="">
          <BsCart
            style={{
              width: "32px",
              height: "auto",
              padding: "8px 5px 10px 5px",
              color: "#212121",
            }}
          />
          <span className="cart-text">
            <span>Shopping</span>
            <span>Cart</span>
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Nav;

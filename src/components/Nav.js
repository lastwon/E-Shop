import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";

import "../styles/nav.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillShopping } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import Hit from "./Hit";

const Nav = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [pressed, setPressed] = useState(false);

  const searchClient = algoliasearch(
    "LBQ1DEZ1S0",
    "41c0e35604acac1cf429ef02c8d0ed55"
  );

  const handleSearchBoxClick = () => {
    setPressed(true);
  };

  const handleSearchBoxBlur = () => {
    setPressed(false);
  };

  return (
    <nav>
      <a className="burger" href="">
        <GiHamburgerMenu
          style={{ width: "25px", height: "25px", padding: "5px" }}
        />
        <span>All products</span>
      </a>
      <Link className="logo" to="/">
        <AiFillShopping
          style={{ width: "25px", height: "25px", marginRight: "4.3px" }}
        />
        <span>Shope</span>
      </Link>
      {searchClient && (
        <InstantSearch searchClient={searchClient} indexName="products">
          <SearchBox
            className="search"
            onClick={handleSearchBoxClick}
            onBlur={handleSearchBoxBlur}
          />
          {pressed && <Hits hitComponent={Hit} />}
        </InstantSearch>
      )}
      <div className="reg-login">
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>
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
          </button>
        ) : (
          <button onClick={() => logout()}>
            <BiLogOut
              style={{
                width: "32px",
                height: "auto",
                padding: "8px 5px 10px 5px",
                color: "#212121",
              }}
            />
            <span className="register">
              <span>Logout</span>
            </span>
          </button>
        )}
      </div>
      <div className="wishlist-container">
        <Link to="goods">
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
        </Link>
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
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>
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
          </button>
        ) : (
          <Link to="/cart">
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
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;

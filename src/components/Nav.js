import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";
import { commerce } from "../lib/commerce";

import "../styles/nav.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillShopping } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import backToTop from "../images/back-to-top.webp";
import Hit from "./Hit";
import CategoriesSide from "./CategoriesSide";

const Nav = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [pressed, setPressed] = useState(false);
  const [side, setSide] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_CLIENT_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_ID
  );

  const handleLogout = async () => {
    await commerce.cart.delete();
    logout();
  };

  const handleSearchBoxClick = () => {
    setPressed(true);
  };

  const handleSearchBoxBlur = () => {
    // Delay setting pressed to false
    setTimeout(() => {
      setPressed(false);
    }, 100);
  };

  const handleSideOpen = () => {
    setSide(true);
  };

  const handleSideClose = () => {
    setTimeout(() => {
      setSide(false);
    }, 100);
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <img
        className={`scroll-to-top${showScrollToTop ? " show" : ""}`}
        src={backToTop}
        alt="Back-to-top"
        onClick={handleTop}
      />
      <nav>
        <button
          className="burger"
          onClick={handleSideOpen}
          onBlur={handleSideClose}
        >
          <GiHamburgerMenu
            style={{ width: "25px", height: "25px", padding: "5px" }}
          />
          <span>All products</span>
        </button>
        {side ? <CategoriesSide side={handleSideClose} /> : ""}
        <Link className="logo" to="/" onClick={handleTop}>
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
            <button onClick={handleLogout}>
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
        <div className="help-container">
          <Link to={"/help"}>
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
          </Link>
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
    </>
  );
};

export default Nav;

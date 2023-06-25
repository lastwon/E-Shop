import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/side.css";

import { BiUser } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import AllCategoriesSide from "./AllCategoriesSide";

const CategoriesSide = ({ side }) => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  return (
    <>
      <div className="categories__side__menu">
        <div className="top-bar">
          <div className="login-message">
            <BiUser
              style={{
                width: "32px",
                height: "auto",
                padding: "8px 5px 10px 5px",
                color: "#fff",
              }}
            />
            {!isAuthenticated ? (
              <Link onClick={() => loginWithRedirect()}>
                Hello, <u>log in here!</u>
              </Link>
            ) : (
              <Link to={"/"}>Hello, {user.nickname}!</Link>
            )}
          </div>
          <div className="top-bar-quit">
            <AiOutlineClose
              style={{
                width: "30px",
                height: "auto",
                color: "#fff",
              }}
              onClick={side}
            />
          </div>
        </div>
        <div className="categories-bar">
          <AllCategoriesSide side={side} />
        </div>
      </div>
      <div className="backdrop"></div>
    </>
  );
};

export default CategoriesSide;

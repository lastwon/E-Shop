import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

import "../styles/products.css";

const Notification = ({ notification }) => {
  return (
    <>
      <div className="notification">
        <div className="notification-container">
          <p className="notification-text">
            <strong>
              <AiOutlineCheckCircle style={{ width: "25px", height: "25px" }} />{" "}
              {notification}
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default Notification;

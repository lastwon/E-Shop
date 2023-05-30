import React from "react";

import "../styles/footer.css";

import arrowright from "../images/arrow-right.svg";
import question from "../images/questionmark.svg";
import phone from "../images/phone.svg";
import { AiOutlineShopping } from "react-icons/ai";
import board from "../images/board.svg";

const Footer = () => {
  return (
    <div className="main-container">
      <div className="footer__links">
        <ul>
          <li>
            <img src={question} alt="questionmark" />
            <h5>Help</h5>
            <img className="arrow" src={arrowright} alt="arrowright" />
          </li>
          <li>
            <img src={phone} alt="phone" />
            <h5>Contacts</h5>
            <img className="arrow" src={arrowright} alt="arrowright" />
          </li>
          <li>
            <AiOutlineShopping style={{ width: "22px", height: "22px" }} />
            <h5>Shope</h5>
            <img className="arrow" src={arrowright} alt="arrowright" />
          </li>
          <li>
            <img src={board} alt="questionmark" />
            <h5>For business</h5>
            <img className="arrow" src={arrowright} alt="arrowright" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

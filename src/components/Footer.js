import React from "react";

import "../styles/footer.css";

import arrowright from "../images/arrow-right.svg";
import question from "../images/questionmark.svg";
import phone from "../images/phone.svg";
import { AiOutlineShopping } from "react-icons/ai";
import board from "../images/board.svg";
import person from "../images/ask-person.svg";
import dpd from "../images/delivery-dpd-new.webp";
import zero from "../images/leasing-footer.svg";
import google from "../images/google-play.webp";
import apple from "../images/appstore.svg";
import fb from "../images/fb-icon.svg";
import insta from "../images/instagram-icon.svg";
import you from "../images/youtube-icon.svg";
import linkedin from "../images/linkedin-icon.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="main-container">
      <div className="footer__links">
        <ul>
          <li>
            <Link to={"/"}>
              <img src={question} alt="questionmark" />
              <h5>Help</h5>
              <img className="arrow" src={arrowright} alt="arrowright" />
            </Link>
          </li>
          <li>
            <Link to={"/contacts"}>
              <img src={phone} alt="phone" />
              <h5>Contacts</h5>
              <img className="arrow" src={arrowright} alt="arrowright" />
            </Link>
          </li>
          <li>
            <Link to={"/about"}>
              <AiOutlineShopping
                style={{
                  width: "22px",
                  height: "22px",
                  paddingRight: "17px",
                  color: "black",
                }}
              />
              <h5>Shope</h5>
              <img className="arrow" src={arrowright} alt="arrowright" />
            </Link>
          </li>
          <li>
            <Link to={"/business"}>
              <img src={board} alt="questionmark" />
              <h5>For business</h5>
              <img className="arrow" src={arrowright} alt="arrowright" />
            </Link>
          </li>
        </ul>
        <div className="question">
          <img src={person} alt="person" />
          <p className="footer__title">Have questions</p>
          <span className="footer__text">
            Our specialists are ready to help
          </span>
          <div className="button-line">
            <span>+37065555555</span>
          </div>
          <div className="button-line">
            <span>contact@shope.lt</span>
          </div>
        </div>
        <div className="question" style={{ background: "#91DBCB" }}>
          <img
            src={dpd}
            alt="person"
            style={{ width: "100%", height: "155px", right: "0" }}
          />
          <p className="footer__title">Free delivery</p>
          <span className="footer__text">
            When ordering Shope goods to a DPD postal machine
          </span>
        </div>
        <div className="question" style={{ background: "#BBEED9" }}>
          <img
            src={zero}
            alt="person"
            style={{ height: "165px", right: "0" }}
          />
          <p className="footer__title">Leasing costs nothing</p>
          <span className="footer__text">
            When buying goods from €70 to 10 months
          </span>
        </div>
      </div>
      <div className="spacer"></div>
      <div className="footer__end">
        <div className="footer__left">
          <img src={google} alt="google-play" />
          <img src={apple} alt="apple-pay" />
        </div>
        <div className="footer__right">
          <div className="footer__socials">
            <img src={fb} alt="facebook" />
            <img src={insta} alt="instagram" />
            <img src={you} alt="youtube" />
            <img src={linkedin} alt="linkedin" />
          </div>
          <span>
            Shope &copy; {currentYear} All rights reserved | Shope
            <sup>&trade;</sup>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

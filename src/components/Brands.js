import React from "react";

import "../styles/brand.css";

import apple from "../images/apple.webp";
import asus from "../images/asus.webp";
import barbie from "../images/barbie.webp";
import bosch from "../images/bosch.webp";
import dell from "../images/dell.webp";
import dyson from "../images/dyson.webp";
import garmin from "../images/garmin.webp";
import Hasbro from "../images/Hasbro.webp";
import jbl from "../images/jbl.webp";
import Jura from "../images/Jura.webp";
import kamado from "../images/kamado.webp";
import karcher from "../images/karcher.webp";
import lego from "../images/lego.webp";
import lenovo from "../images/lenovo.webp";
import marshall from "../images/marshall.webp";
import miele from "../images/miele.jpg";
import samsung from "../images/samsung.webp";
import sense from "../images/sense.webp";
import xiaomi from "../images/xiaomi.webp";
import zipro from "../images/zipro.webp";

const Brands = () => {
  const brandImages = [
    apple,
    asus,
    barbie,
    bosch,
    dell,
    dyson,
    garmin,
    Hasbro,
    jbl,
    Jura,
    kamado,
    karcher,
    lego,
    lenovo,
    marshall,
    miele,
    samsung,
    sense,
    xiaomi,
    zipro,
  ];

  return (
    <div className="main-container">
      <div className="brand">
        <div className="for-desktop">
          <h4>Brands</h4>
        </div>
        <ul className="brand-logo">
          {brandImages.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`Brand ${index + 1}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Brands;

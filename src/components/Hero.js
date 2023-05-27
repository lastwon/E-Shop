import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/hero.css";

import { CiDiscount1 } from "react-icons/ci";

import gif1 from "../images/1.gif";
import gif2 from "../images/2.gif";
import gif3 from "../images/3.gif";

const Hero = () => {
  const images = [gif1, gif2, gif3];
  const style = {
    color: "red",
    fontSize: "45px",
  };
  const category = [
    {
      id: 1,
      icon: <CiDiscount1 style={style} />,
      title: "Discounts",
      background: "#FAE2CA",
    },
    {
      id: 2,
      icon: <CiDiscount1 style={style} />,
      title: "Sale",
      background: "#F3D3C8",
    },
    {
      id: 3,
      icon: <CiDiscount1 style={style} />,
      title: "Phones, foto and video",
      background: "#F3E2B6",
    },
    {
      id: 4,
      icon: <CiDiscount1 style={style} />,
      title: "Computers and components",
      background: "#CBE9C3",
    },
    {
      id: 5,
      icon: <CiDiscount1 style={style} />,
      title: "Electronics",
      background: "#D1D7ED",
    },
    {
      id: 6,
      icon: <CiDiscount1 style={style} />,
      title: "Perfumes and cosmetics",
      background: "#E1BFCD",
    },
    {
      id: 7,
      icon: <CiDiscount1 style={style} />,
      title: "Garden goods, tools",
      background: "#EEDCDC",
    },
    {
      id: 8,
      icon: <CiDiscount1 style={style} />,
      title: "Furniture and home interior",
      background: "#F3D3C8",
    },
    {
      id: 9,
      icon: <CiDiscount1 style={style} />,
      title: "Sports, free time",
      background: "#FAE2CA",
    },
    {
      id: 10,
      icon: <CiDiscount1 style={style} />,
      title: "Toys",
      background: "#DFE9E0",
    },
    {
      id: 11,
      icon: <CiDiscount1 style={style} />,
      title: "Clothing, footwear",
      background: "#DCEEF0",
    },
    {
      id: 12,
      icon: <CiDiscount1 style={style} />,
      title: "All categories",
      background: "#F1E6DB",
    },
  ];
  return (
    <section className="hero">
      <div className="container">
        <Slider autoplay={true} autoplaySpeed={4500} dots={true} arrows={false}>
          {images.map((image, index) => (
            <div className="images" key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="category">
        <ul>
          {category.map((categ) => (
            <li
              key={categ.id}
              style={{ backgroundColor: `${categ.background}` }}
            >
              {categ.icon}
              <h6>{categ.title}</h6>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;

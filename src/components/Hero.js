import React from "react";

import "../styles/hero.css";

import { MdOutlineDiscount } from "react-icons/md";
import { TbDiscount } from "react-icons/tb";
import { GiSmartphone } from "react-icons/gi";
import { MdComputer } from "react-icons/md";
import { GiLockers } from "react-icons/gi";
import { TbPerfume } from "react-icons/tb";
import { GiGardeningShears } from "react-icons/gi";
import { TbSofa } from "react-icons/tb";
import { BiBasketball } from "react-icons/bi";
import { MdOutlineToys } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import Slides from "./Slides";

const Hero = () => {
  const style = {
    color: "#212121",
    fontSize: "45px",
  };
  const category = [
    {
      id: 1,
      icon: <MdOutlineDiscount style={style} />,
      title: "Discounts",
      background: "#FAE2CA",
    },
    {
      id: 2,
      icon: <TbDiscount style={style} />,
      title: "Sale",
      background: "#F3D3C8",
    },
    {
      id: 3,
      icon: <GiSmartphone style={style} />,
      title: "Phones, foto and video",
      background: "#F3E2B6",
    },
    {
      id: 4,
      icon: <MdComputer style={style} />,
      title: "Computers and components",
      background: "#CBE9C3",
    },
    {
      id: 5,
      icon: <GiLockers style={style} />,
      title: "Electronics",
      background: "#D1D7ED",
    },
    {
      id: 6,
      icon: <TbPerfume style={style} />,
      title: "Perfumes and cosmetics",
      background: "#E1BFCD",
    },
    {
      id: 7,
      icon: <GiGardeningShears style={style} />,
      title: "Garden goods, tools",
      background: "#EEDCDC",
    },
    {
      id: 8,
      icon: <TbSofa style={style} />,
      title: "Furniture and home interior",
      background: "#F3D3C8",
    },
    {
      id: 9,
      icon: <BiBasketball style={style} />,
      title: "Sports, free time",
      background: "#FAE2CA",
    },
    {
      id: 10,
      icon: <MdOutlineToys style={style} />,
      title: "Toys",
      background: "#DFE9E0",
    },
    {
      id: 11,
      icon: <GiClothes style={style} />,
      title: "Clothing, footwear",
      background: "#DCEEF0",
    },
    {
      id: 12,
      icon: <RxHamburgerMenu style={style} />,
      title: "All categories",
      background: "#F1E6DB",
    },
  ];
  return (
    <section className="hero">
      <Slides />
      <div className="category">
        <ul>
          {category.map((categ) => (
            <li
              key={categ.id}
              style={{ backgroundColor: `${categ.background}` }}
            >
              <a href="">
                {categ.icon}
                <h6>{categ.title}</h6>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;

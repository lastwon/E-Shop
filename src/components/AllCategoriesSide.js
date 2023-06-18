import React from "react";
import { Link } from "react-router-dom";

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
import { BsSunrise } from "react-icons/bs";

const AllCategoriesSide = ({ side }) => {
  const style = {
    color: "#212121",
    fontSize: "33px",
  };
  const categorys = [
    {
      id: 1,
      icon: <MdOutlineDiscount style={style} />,
      title: "Discounts",
      background: "#FAE2CA",
      category: "discounts",
    },
    {
      id: 2,
      icon: <TbDiscount style={style} />,
      title: "Sale",
      background: "#F3D3C8",
      category: "sale",
    },
    {
      id: 3,
      icon: <GiSmartphone style={style} />,
      title: "Phones, foto and video",
      background: "#F3E2B6",
      category: "phones",
    },
    {
      id: 4,
      icon: <MdComputer style={style} />,
      title: "Computers and components",
      background: "#CBE9C3",
      category: "computers",
    },
    {
      id: 5,
      icon: <GiLockers style={style} />,
      title: "Electronics",
      background: "#D1D7ED",
      category: "electronics",
    },
    {
      id: 6,
      icon: <TbPerfume style={style} />,
      title: "Perfumes and cosmetics",
      background: "#E1BFCD",
      category: "perfumes",
    },
    {
      id: 7,
      icon: <GiGardeningShears style={style} />,
      title: "Garden goods, tools",
      background: "#EEDCDC",
      category: "garden",
    },
    {
      id: 8,
      icon: <TbSofa style={style} />,
      title: "Furniture and home interior",
      background: "#F3D3C8",
      category: "furniture",
    },
    {
      id: 9,
      icon: <BiBasketball style={style} />,
      title: "Sports, free time",
      background: "#FAE2CA",
      category: "sports",
    },
    {
      id: 10,
      icon: <MdOutlineToys style={style} />,
      title: "Toys",
      background: "#DFE9E0",
      category: "toys",
    },
    {
      id: 11,
      icon: <GiClothes style={style} />,
      title: "Clothing, footwear",
      background: "#DCEEF0",
      category: "footwear",
    },
    {
      id: 12,
      icon: <BsSunrise style={style} />,
      title: "TOP",
      background: "#F1E6DB",
      category: "top",
    },
  ];

  return (
    <ul className="category-lines">
      {categorys.map((category) => (
        <li className="category-line" key={category.id}>
          <Link to={`/category/${category.category}`} onClick={side}>
            <span style={{ background: `${category.background}` }}>
              {category.icon}
            </span>
            <span>{category.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AllCategoriesSide;

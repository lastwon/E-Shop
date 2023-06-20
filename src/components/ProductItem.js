import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
import { CiDeliveryTruck } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";

import greenCircle from "../images/green-circle.svg";
import priceFront from "../images/priceFront.svg";
import Unitsleft from "./Unitsleft";
import Loader from "./Loader";

const ProductItem = ({ product }) => {
  const [productInfo, setProductInfo] = useState({});
  const [loader, setLoader] = useState(false);
  const [rating, setRating] = useState({});

  const formatPrice = (price) => {
    const formattedPrice = price.toFixed(2); // Limit to 2 decimal places
    const [integerPart, decimalPart] = formattedPrice.split(".");

    return (
      <>
        <span>{integerPart}</span>
        {decimalPart !== "00" && (
          <>
            <span>.</span>
            <sup className="product__price-decimal">{decimalPart}</sup>
          </>
        )}
      </>
    );
  };

  const ratingData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/${id}`);
      let sum = 0;
      let commentCount = 0;
      response.data.forEach((element) => {
        sum += element.rating;
        if (element.comment) {
          commentCount++;
        }
      });

      const avgRating =
        response.data.length > 0 ? sum / response.data.length : 0.0;
      setRating((oldRatings) => ({
        ...oldRatings,
        [id]: {
          average: avgRating,
          comments: commentCount,
        },
      })); // Set the average rating for this product id
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductData = async () => {
    setLoader(true);
    try {
      const fetchedProduct = await commerce.products.retrieve(product.id);
      ratingData(product.id);
      const productWithVariations = {
        ...product,
        variations: fetchedProduct.variant_groups,
      };
      setProductInfo([productWithVariations]);
      setLoader(false);
    } catch (error) {
      console.error("Error retrieving product:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (loader) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="product__card">
      <div className="image__container">
        <Link to={`/${product.id}`}>
          <img
            className="product__image"
            src={product.image?.url}
            alt={product.name}
          />
        </Link>
        {product.categories.map((category) => (
          <div key={category.id} className="top__title">
            {category.name === "TOP" ? <span>TOP</span> : ""}
          </div>
        ))}
      </div>
      <div className="product__info">
        <div className="product__categories">
          {product.categories.map((category) => (
            <div key={category.id} className="product__category">
              <img src={greenCircle} alt="green-circle" />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
        <div className="product__name">
          <Link to={`/${product.id}`}>{product.name}</Link>
        </div>
        <div className="product__variation">
          <ul className="variation__list">
            {productInfo.length > 0 &&
              productInfo[0].variations.map((variation) => (
                <li key={variation.id}>
                  {variation.name}
                  <span>{variation.options[0].name}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="product__general">
        <div className="rating">
          <AiFillStar
            className="star"
            style={{ height: "100%", width: "auto", paddingRight: "5px" }}
          />
          <span>
            {rating[product.id] ? rating[product.id].average.toFixed(1) : "0.0"}{" "}
            {rating[product.id] && rating[product.id].comments === 0 ? (
              ""
            ) : (
              <>({rating[product.id] && rating[product.id].comments})</>
            )}
          </span>
        </div>
        <div className="delivery">
          <CiDeliveryTruck
            style={{ height: "100%", width: "auto", paddingRight: "5px" }}
          />
          <span>0-2 W/D</span>
        </div>
        <Unitsleft product={product} />
      </div>
      <div className="product__price">
        <img src={priceFront} alt="price-front" />
        <div className="product__mid__price">
          <span>{formatPrice(product.price.raw)} €</span>
        </div>
        {product.price.raw > 70 ? (
          <div className="leasing__info">
            <span>{formatPrice(product.price.raw / 10)}</span>
            <span>€/month</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductItem;

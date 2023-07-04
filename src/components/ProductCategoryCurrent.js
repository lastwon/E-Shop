import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";
import axios from "axios";

import { AiFillStar } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import greenCircle from "../images/green-circle.svg";
import priceFront from "../images/priceFront.svg";

import Unitsleft from "./Unitsleft";

const ProductCategoryCurrent = ({ product }) => {
  const [productInfo, setProductInfo] = useState([]);
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
      const response = await axios.get(
        `https://e-shope-60kk.onrender.com/${id}`
      );
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

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productsData = await Promise.all(
          product.map(async (productItem) => {
            const fetchedProduct = await commerce.products.retrieve(
              productItem.id
            );
            ratingData(productItem.id);
            return {
              ...productItem,
              variations: fetchedProduct.variant_groups,
              // Add variations to the product item
            };
          })
        );
        setProductInfo(productsData);
      } catch (error) {
        console.error("Error retrieving products:", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <>
      {productInfo.map((productItem) => (
        <div className="product__card" key={productItem.id}>
          <div className="image__container">
            <Link to={`/${productItem.id}`}>
              <img
                className="product__image"
                src={productItem.image?.url}
                alt={productItem.name}
              />
            </Link>
            {productItem.categories.map((category) => (
              <div key={category.id} className="top__title">
                {category.name === "TOP" ? <span>TOP</span> : ""}
              </div>
            ))}
          </div>
          <div className="product__info">
            <div className="product__categories">
              {productItem.categories &&
                productItem.categories.map((category) => (
                  <div key={category.id} className="product__category">
                    <img src={greenCircle} alt="green-circle" />
                    <span>{category.name}</span>
                  </div>
                ))}
            </div>
            <div className="product__name">
              <Link to={`/${productItem.id}`}>{productItem.name}</Link>
            </div>
            <div className="product__variation">
              <ul className="variation__list">
                {productItem.variations &&
                  productItem.variations.map((variation) => (
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
                {rating[productItem.id]
                  ? rating[productItem.id].average.toFixed(1)
                  : "0.0"}{" "}
                {rating[productItem.id] &&
                rating[productItem.id].comments === 0 ? (
                  ""
                ) : (
                  <>
                    ({rating[productItem.id] && rating[productItem.id].comments}
                    )
                  </>
                )}
              </span>
            </div>
            <div className="delivery">
              <CiDeliveryTruck
                style={{ height: "100%", width: "auto", paddingRight: "5px" }}
              />
              <span>0-2 W/D</span>
            </div>
            <Unitsleft product={productItem} />
          </div>
          <div className="product__price">
            <img src={priceFront} alt="price-front" />
            <div className="product__mid__price">
              {productItem.price && (
                <span>{formatPrice(productItem.price.raw)} €</span>
              )}
            </div>
            {productItem.price.raw > 70 ? (
              <div className="leasing__info">
                <span>{formatPrice(productItem.price.raw / 10)}</span>
                <span>€/month</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCategoryCurrent;

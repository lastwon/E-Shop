import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import axios from "axios";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "../styles/products.css";

import { CiDeliveryTruck } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import priceFront from "../images/priceFront.svg";
import Stock from "./Stock";
import Loader from "./Loader";

const SimilarProducts = ({ product, formatPrice }) => {
  const { related_products } = product;
  const [productInfo, setProductInfo] = useState([]);
  const [loader, setLoader] = useState(false);
  const [rating, setRating] = useState({});

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
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      setLoader(true);
      try {
        const productsWithVariations = await Promise.all(
          related_products.map(async (related) => {
            const fetchedProduct = await commerce.products.retrieve(related.id);
            ratingData(related.id);
            const productWithVariations = {
              ...related,
              variations: fetchedProduct.variant_groups,
            };
            setLoader(false);
            return productWithVariations;
          })
        );
        setProductInfo(productsWithVariations);
      } catch (error) {
        console.error("Error retrieving product:", error);
        setLoader(false);
      }
    };

    fetchProductData();
  }, [product, related_products]);

  if (loader) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="products" id="products">
      <Splide
        className="product__slider"
        options={{ perPage: 4, gap: "15px", pagination: false, perMove: 1 }}
      >
        {productInfo.map((related) => (
          <SplideSlide key={related.id} className="product__card">
            <div className="image__container">
              <Link to={`/${related.id}`}>
                <img
                  className="product__image"
                  src={related.image?.url}
                  alt={related.name}
                />
              </Link>
            </div>
            <div className="product__info">
              <div className="product__name">
                <a href="">{related.name}</a>
              </div>
              {/* Render variations */}
              {related.variations && (
                <div className="product__variation">
                  <ul className="variation__list">
                    {related.variations.map((variation) => (
                      <li key={variation.id}>
                        {variation.name}
                        <span>{variation.options[0].name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="product__general">
              <div className="rating">
                <AiFillStar
                  className="star"
                  style={{
                    height: "100%",
                    width: "auto",
                    paddingRight: "5px",
                  }}
                />
                <span>
                  {rating[related.id]
                    ? rating[related.id].average.toFixed(1)
                    : "0.0"}{" "}
                  {rating[related.id] && rating[related.id].comments === 0 ? (
                    ""
                  ) : (
                    <>({rating[related.id] && rating[related.id].comments})</>
                  )}
                </span>
              </div>
              <div className="delivery">
                <CiDeliveryTruck
                  style={{
                    height: "100%",
                    width: "auto",
                    paddingRight: "5px",
                  }}
                />
                <span>0-2 W/D</span>
              </div>
              <Stock stockLevel={related.quantity} />
            </div>
            <div className="product__price">
              <img src={priceFront} alt="price-front" />
              <div className="product__mid__price">
                <span>{formatPrice(related.price.raw)} €</span>
              </div>
              {product.price.raw > 70 ? (
                <div className="leasing__info">
                  <span>{formatPrice(related.price.raw / 10)}</span>
                  <span>€/month</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SimilarProducts;

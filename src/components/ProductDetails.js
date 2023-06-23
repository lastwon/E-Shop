import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { commerce } from "../lib/commerce";
import greenCircle from "../images/green-circle.svg";
import { CiDeliveryTruck } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";
import priceFront from "../images/priceFront.svg";
import { BsCart } from "react-icons/bs";
import Unitsleft from "./Unitsleft";
import Notification from "./Notification";

import "../styles/productDetail.css";

import Nav from "./Nav";
import Footer from "./Footer";
import SimilarProducts from "./SimilarProducts";
import Loader from "./Loader";
import CommentForm from "./CommentForm";

const ProductDetails = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const params = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState("");
  const [loader, setloader] = useState(false);
  const [rating, setRating] = useState([]);

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

  const removeTags = (text) => {
    const desc = productInfo.description;
    let plainText = desc.replace(/<p>/g, "");
    plainText = plainText.replace(/<\/p>/g, "");
    return plainText;
  };

  const handlePrice = (e) => {
    const inputValue = parseInt(e.target.value);

    if (!isNaN(inputValue)) {
      let newQuantity = inputValue;

      if (newQuantity < 1) {
        newQuantity = 1;
      } else if (productInfo && newQuantity > productInfo.inventory.available) {
        newQuantity = productInfo.inventory.available;
      }

      setQuantity(newQuantity);
      setPrice(newQuantity * productInfo.price.raw);
    } else {
      setQuantity();
      setPrice(0);
    }
  };

  const note = () => {
    setNotification("Comment added successfully!");
  };

  const incrementQuantity = () => {
    if (quantity < productInfo.inventory.available) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setPrice((prevPrice) => (quantity + 1) * productInfo.price.raw);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setPrice((prevPrice) => (quantity - 1) * productInfo.price.raw);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await commerce.cart.add(productId, quantity);
      setNotification("Added to the cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const ratingData = async () => {
    await axios
      .get(`http://localhost:8081/${params.productName}`)
      .then((res) => {
        setRating(res.data);
      })
      .catch((err) => console.log(err));
  };

  const calculateAverageRating = () => {
    if (rating.length === 0) {
      return 0;
    }

    const totalRating = rating.reduce(
      (sum, comment) => sum + comment.rating,
      0
    );
    return totalRating / rating.length;
  };

  const averageRating = calculateAverageRating();

  useEffect(() => {
    const getProduct = async () => {
      setloader(true);
      try {
        const product = await commerce.products.retrieve(params.productName);
        setProductInfo(product);
        setPrice(product.price.raw);
        window.scrollTo(0, 0);
        setloader(false);
      } catch (error) {
        console.error("Error retrieving product:", error);
      }
    };
    getProduct();
    ratingData();
  }, [params.productName]);

  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(() => {
        setNotification("");
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [notification]);

  if (loader) {
    return (
      <>
        <Nav />
        <div className="spacer"></div>
        <div className="main-container">
          <div className="loaderr">
            <Loader />
          </div>
        </div>
        <div className="spacer"></div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="spacer"></div>
      {productInfo && (
        <div className="main-container">
          <div className="current__product__info">
            <div className="current__product__all">
              <div className="product__categories">
                {productInfo.categories.map((category) => (
                  <div className="product__category" key={category.id}>
                    <img src={greenCircle} alt="green-circle" />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
              <div className="product__name">{productInfo.name}</div>
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
                    {averageRating.toFixed(1)} ({rating.length})
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
                <Unitsleft product={productInfo} />
              </div>
              <div className="image">
                <img src={productInfo.image.url} alt={productInfo.name} />
              </div>
              <div className="description">
                <h3>Description</h3>
                <span>{removeTags(productInfo.description)}</span>
              </div>
              <CommentForm note={note} />
            </div>
            <div className="current__product__pay">
              <div className="product__both__prices">
                <div className="product__price">
                  <img src={priceFront} alt="price-front" />
                  <div className="product__mid__price">
                    <span>{formatPrice(productInfo.price.raw)} €</span>
                  </div>
                </div>
                {productInfo.price.raw > 70 ? (
                  <div className="product__leasing__price">
                    <span className="leasing__text">
                      Leasing without increase
                    </span>
                    <span>
                      <b>
                        {formatPrice(productInfo.price.raw / 10)} € x 10 months
                      </b>
                    </span>
                    <span className="product__or">or</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
              <div className="select__quantity">
                <span className="quantity__text">Select quantity</span>
                <div className="number__input">
                  <button
                    className="quantity__down"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="quantity"
                    min={1}
                    max={productInfo.inventory.available}
                    value={quantity}
                    onChange={handlePrice}
                  />
                  <button className="quantity__up" onClick={incrementQuantity}>
                    +
                  </button>
                </div>
              </div>
              {isAuthenticated ? (
                <button
                  onClick={() => addToCart(productInfo.id, quantity)}
                  className="add__to__cart"
                >
                  <BsCart
                    style={{
                      width: "25px",
                      height: "auto",
                      color: "#fff",
                    }}
                  />
                  Add to cart <b>{price} €</b>
                </button>
              ) : (
                <button
                  onClick={() => loginWithRedirect()}
                  className="add__to__cart"
                >
                  <BsCart
                    style={{
                      width: "25px",
                      height: "auto",
                      color: "#fff",
                    }}
                  />
                  Add to cart <b>{price} €</b>
                </button>
              )}
              {notification && <Notification notification={notification} />}
            </div>
          </div>
          <div className="spacer"></div>
          <div className="similar__goods">
            <div className="description">
              <h3
                style={{
                  paddingLeft: "20px",
                  paddingTop: "20px",
                  background: "#fff",
                }}
              >
                Similar goods
              </h3>
            </div>
            <SimilarProducts formatPrice={formatPrice} product={productInfo} />
          </div>
        </div>
      )}
      <div className="spacer"></div>
      <Footer />
    </>
  );
};

export default ProductDetails;

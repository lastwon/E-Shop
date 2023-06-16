import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/nav.css";

const Hit = ({ hit }) => {
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

  useEffect(() => {
    console.log(hit.id);
  }, []);

  return (
    <div className="search__product__card">
      <div className="search__product__info" key={hit.id}>
        <div className="product__name">
          <Link to={`/${hit.id}`}>{hit.name}</Link>
        </div>
        <div className="price">
          <span>{formatPrice(hit.price.raw)} €</span>
        </div>
      </div>
    </div>
  );
};

export default Hit;

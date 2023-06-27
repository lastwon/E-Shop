import React from "react";

const Plans = ({ plan }) => {
  const { id, tag, price, recommend, services } = plan;
  return (
    <div className="card" key={id}>
      <div className="card-top">
        <div className="card-title">
          <strong>{tag}</strong>
        </div>
        <div className="card-price">
          <sup>€</sup>
          <h4>{price}</h4>
        </div>
        <div className="price-info">(price excluding VAT)</div>
        <div className="billed">
          workstation price calculated <b>monthly</b>
        </div>
      </div>
      <div className="card-purpose">{recommend}</div>
      <div className="features">
        <ul>
          {services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Plans;

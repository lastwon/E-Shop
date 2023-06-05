import React from "react";

import { CiDeliveryTruck } from "react-icons/ci";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const Stock = ({ stockLevel }) => {
  if (stockLevel === null) {
    return (
      <div className="stock red">
        <BsFillExclamationCircleFill
          style={{ height: "100%", width: "auto", paddingRight: "5px" }}
        />
        <span>Loading stock level...</span>
      </div>
    );
  }

  if (stockLevel <= 0) {
    return (
      <div className="stock red">
        <BsFillExclamationCircleFill
          style={{ height: "100%", width: "auto", paddingRight: "5px" }}
        />
        <span>
          <b>Out of Stock</b>
        </span>
      </div>
    );
  }

  if (stockLevel < 5) {
    return (
      <div className="stock red">
        <BsFillExclamationCircleFill
          style={{ height: "100%", width: "auto", paddingRight: "5px" }}
        />
        <span>
          Left only: <b>{stockLevel} unit</b>
          {stockLevel === 1 ? "" : "s"}
        </span>
      </div>
    );
  }

  return (
    <div className="stock">
      <CiDeliveryTruck
        style={{ height: "100%", width: "auto", paddingRight: "5px" }}
      />
      <span>Left only: 5+ units</span>
    </div>
  );
};

export default Stock;

import React, { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

import Nav from "./Nav";
import Footer from "./Footer";

import "../styles/help.css";

const Help = () => {
  const [sections, setSections] = useState([
    {
      title: "About Us",
      content:
        "SHOPE is a rapidly growing e-commerce platform designed to offer a seamless shopping experience to customers across the globe. With a broad array of products ranging from electronics and home appliances to office solutions and various technical equipment, SHOPE aims to cater to the diverse needs of both individuals and businesses.",
      expanded: false,
    },
    {
      title: "Payment",
      content:
        "At SHOPE, we understand that smooth and secure payment processing is a crucial part of your online shopping experience. We have integrated Commerce.js as our main e-commerce platform, providing you with a seamless, efficient, and safe payment process. Commerce.js supports a variety of popular payment gateways, including Chio, which ensures your transactions are secure, quick, and easy. Chio is a well-established payment system trusted by millions of users worldwide for its robust security measures and user-friendly interface.",
      expanded: false,
    },
    {
      title: "Delivery Service",
      content:
        "At SHOPE, we know that prompt and reliable delivery is a key part of your online shopping experience. That's why we're committed to ensuring your purchases reach you as quickly and safely as possible. We have partnered with reputable courier services that provide fast and efficient delivery across the globe. Once your order is confirmed and processed, you will receive a tracking number that allows you to monitor the progress of your delivery in real-time. We offer several shipping options to cater to your needs, whether you need expedited shipping or are looking for the most economical option.",
      expanded: false,
    },
    {
      title: "Products",
      content:
        "At SHOPE, we understand that a detailed product description is crucial in helping you make an informed purchasing decision. We make every effort to provide comprehensive and accurate descriptions for all our products. However, in rare cases where a product description may be missing, it does not reflect the quality or value of the product. These items are as reliable and high-performing as the rest of our catalog. The absence of a product description could be due to the product being new, exclusive, or rare, and detailed information might not be readily available. In such instances, we encourage you to contact our customer service team for more information. Our dedicated team of professionals is always ready to provide additional details, answer any questions, or address any concerns you may have about a product. Your satisfaction is our top priority at SHOPE. We're committed to ensuring that you have all the information you need to make the best purchase for your needs.",
      expanded: false,
    },
  ]);

  const handleExpand = (index) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].expanded = !updatedSections[index].expanded;
      return updatedSections;
    });
  };

  return (
    <>
      <Nav />
      <div className="spacer"></div>
      <div className="main-container">
        <div className="help">
          <h2>Useful information</h2>
          {sections.map((section, index) => (
            <div className="help-content" key={index}>
              <h3 onClick={() => handleExpand(index)}>
                {section.title}
                {!section.expanded ? (
                  <IoIosArrowDropdown />
                ) : (
                  <IoIosArrowDropup />
                )}
              </h3>
              {section.expanded && <p>{section.content}</p>}
            </div>
          ))}
        </div>
      </div>
      <div className="spacer"></div>
      <Footer />
    </>
  );
};

export default Help;

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import gif1 from "../images/delivery-dpd-new.webp";
import gif2 from "../images/leasing-footer.svg";
import gif3 from "../images/ask-person.svg";

const Slides = () => {
  const slides = [
    {
      id: 1,
      image: gif1,
      text: "Free delivery",
      text2: "for Shope goods when ordering at a DPD post machine",
    },
    {
      id: 2,
      image: gif2,
      text: "Leasing costs nothing",
      text2: "when buying goods from 70€ to 10 months",
    },
    {
      id: 3,
      image: gif3,
      text: "Hundreds of sellers",
      text2: "are already selling on Shope. Join too.",
    },
  ];

  return (
    <div className="container">
      <Splide
        options={{
          type: "loop",
          autoplay: true,
          arrows: false,
          pauseOnHover: true,
        }}
      >
        {slides.map((slide, index) => (
          <SplideSlide key={slide.id} className="slider__content">
            <div>
              <span>{slide.text}</span>
              <p>{slide.text2}</p>
            </div>
            <img src={slide.image} alt={`Slide ${slide.id}`} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Slides;

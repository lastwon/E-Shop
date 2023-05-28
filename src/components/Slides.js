import React, { useState, useEffect } from "react";

import gif1 from "../images/1.gif";
import gif2 from "../images/2.gif";

const Slides = () => {
  const slides = [
    {
      id: 1,
      image: gif1,
      text: "Slide 1",
    },
    {
      id: 2,
      image: gif2,
      text: "Slide 2",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="container">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? "active" : ""}`}
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
            transition: "transform 0.5s ease-in-out",
            width: "100%",
          }}
        >
          <img src={slide.image} alt={`Slide ${slide.id}`} />
          <p>{slide.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Slides;

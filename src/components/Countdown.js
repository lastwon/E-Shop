import React, { useState, useEffect } from "react";

import "../styles/products.css";

const Countdown = () => {
  const targetDate = new Date("2023-06-13T23:00:00"); // Replace with your target date and time
  const [countdown, setCountdown] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = targetDate - Date.now();
      setCountdown(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return (
    <>
      <div className="countdown">
        <span>Only this week</span>
        <div className="timmer">
          {`${formatTime(days)} d. ${formatTime(hours)}:${formatTime(
            minutes
          )}:${formatTime(seconds)}`}
        </div>
      </div>
      <div className="spacer"></div>
    </>
  );
};

export default Countdown;

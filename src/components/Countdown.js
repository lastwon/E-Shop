import React, { useState, useEffect } from "react";

import "../styles/products.css";

const Countdown = () => {
  const initialTargetDate = new Date("2023-06-25T23:59:45"); // Replace with your initial target date and time
  const [targetDate, setTargetDate] = useState(initialTargetDate);
  const [countdown, setCountdown] = useState(targetDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = targetDate - Date.now();
      setCountdown(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
        setTargetDate(getNextWeekTargetDate(targetDate)); // Reset target date to next week
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [targetDate]);

  const getNextWeekTargetDate = (currentDate) => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    return nextWeek;
  };

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
        <div className="timer">
          {`${formatTime(days)} d. ${formatTime(hours)}:${formatTime(
            minutes
          )}:${formatTime(seconds)}`}
        </div>
      </div>
    </>
  );
};

export default Countdown;

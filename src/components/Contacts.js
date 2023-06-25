import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import emailjs from "emailjs-com";

import Notification from "./Notification";

import "../styles/contacts.css";

const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs
      .send(
        "service_lqwxdml",
        "template_fitdxo8",
        {
          name,
          email,
          comment,
        },
        "jwjxPHD80Ix4ym_sS"
      )
      .then((response) => {
        setNotification("Send successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });

    // Clear the form fields
    setName("");
    setEmail("");
    setComment("");
  };

  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(() => {
        setNotification("");
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <>
      <Nav />
      <div className="spacer"></div>
      <div className="main-container">
        <div className="contacts">
          {notification && <Notification notification={notification} />}
          <form onSubmit={handleSubmit}>
            <div className="form-top">
              <h3>Write to us:</h3>
            </div>
            <div className="form-full-name">
              <span>Name</span>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-full-name">
              <span>E-mail</span>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-comment">
              <span>Question</span>
              <textarea
                id="comment"
                name="comment"
                placeholder="Ask something..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button className="leave-feedback" type="submit">
              Ask a question
            </button>
          </form>
        </div>
      </div>
      <div className="spacer"></div>
      <Footer />
    </>
  );
};

export default Contacts;

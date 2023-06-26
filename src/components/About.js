import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

import "../styles/about.css";

const About = () => {
  return (
    <>
      <Nav />
      <div className="main-container">
        <div className="spacer"></div>
        <div className="about">
          <div className="about-more">
            <h1>about</h1>
            <p>
              SHOPE - a network of order-based stores where you can place orders
              and pick up a vast array of computer and home appliance goods at
              online prices. We sit in the middle, offering a balance between
              large shopping centers and online stores. SHOPE collaborates with
              major tech suppliers and manufacturers from both within Lithuania
              and abroad. Having a wide array of suppliers and products, we can
              precisely select and deliver products that meet every client's
              needs straight from the manufacturers' warehouses. The SHOPE team
              is growing, young, vigorous, and constantly improving. We work
              with clients, manufacturers, and products, therefore, we have a
              deep understanding of our merchandise and take full responsibility
              for your successful shopping experience.
            </p>
          </div>
          <hr />
          <div className="about-more">
            <h1>What is SHOPE?</h1>
            <p className="space">
              <strong>MISSION</strong> - We work to share our knowledge,
              experience, and insights with our clients, to facilitate everyday
              life, reduce concerns, and ensure maximum product selection while
              guaranteeing genuinely low prices.
            </p>
            <div className="points">
              <p>Genuinely low prices</p>
              <p>Expert advice</p>
              <p>Convenient and Reliable</p>
            </div>
            <p className="space">
              <strong>VISION</strong> - We aim to become an excellently
              organized trading company with the widest assortment of goods.
              Customers appreciate us for our insightful advice, friendliness,
              and genuinely low prices.
            </p>
            <div className="points">
              <p>The widest assortment in Lithuania</p>
              <p>Customers are more important than money</p>
            </div>
          </div>
          <hr />
          <div className="about-more">
            <h1>Values</h1>
            <p className="space">
              <strong>Stewardship:</strong> I manage this company as responsibly
              as if it were my own. I wisely use its resources and ensure its
              growing reputation with every action I take.
            </p>
            <p className="space">
              <strong>Ability to Change:</strong> The most constant thing is
              change, so I learn, improve, adapt to the environment every day,
              and strive to work better and more efficiently.
            </p>
            <p className="space">
              <strong>Openness:</strong> I am open to my colleagues and clients.
              I aim to create a company without borders and build seamless
              relationships with my clients and partners.
            </p>
          </div>
          <hr />
          <div className="about-more">
            <h1>What do we value and guide ourselves by?</h1>
            <p className="space">
              <strong>PURPOSEFUL CURIOSITY:</strong> We strive to continuously
              and purposefully engage in what we do, so we can provide useful
              information to the client and not only answer their questions but
              also provide clear consultation and help make the best decision.
            </p>
            <p className="space">
              <strong>CONSIDERED INNOVATIVENESS:</strong> We are constantly
              looking for new opportunities to perform tasks more efficiently,
              to exploit the latest technologies and management methods. We aim
              for this so that we can make timely decisions that would ensure
              genuinely low prices for clients.
            </p>
            <p className="space">
              <strong>ATTENTIVE COMMUNICATION:</strong> We are open, friendly,
              well-versed in our field of operation, so we aim to confidently
              and openly share our knowledge and insights to help our clients
              make the best decisions when purchasing various goods and
              services.
            </p>
          </div>
        </div>
        <div className="spacer"></div>
      </div>
      <Footer />
    </>
  );
};

export default About;

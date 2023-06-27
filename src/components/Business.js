import React from "react";

import Nav from "./Nav";
import Footer from "./Footer";

import "../styles/business.css";

import person from "../images/business.webp";
import Plans from "./Plans";

const Business = () => {
  const plans = [
    {
      id: 1,
      tag: "Mini",
      price: 5,
      recommend: "Recommended for a small office",
      services: [
        "Remote troubleshooting",
        "Response on the same working day",
        "Arrival on-site",
        "Specialist assistance (20 EUR)",
      ],
    },
    {
      id: 2,
      tag: "Optimal",
      price: 19,
      recommend: "Recommended for a large office",
      services: [
        "Remote troubleshooting",
        "Response within 2 hours",
        "Additional technical repairs",
        "IT infrastructure audit",
        "On-site troubleshooting (free of charge)",
        "Workplace migration",
        "Phone and computer configuration",
        "Recommendations and advice",
      ],
    },
    {
      id: 3,
      tag: "Maximum",
      price: 29,
      recommend: "The best choice",
      services: [
        "Remote troubleshooting",
        "Response within 1 hour",
        "Server and network repair",
        "IT infrastructure audit",
        "On-site troubleshooting (free of charge)",
        "Workplace migration",
        "Phone and computer configuration",
        "Extended working day",
        "Network resources maintenance",
        "Information management evaluation",
        "Provision of replacement equipment",
        "Data backups",
      ],
    },
  ];

  return (
    <>
      <Nav />
      <div className="spacer"></div>
      <div className="main-container">
        <div className="business">
          <h1>For business</h1>
          <div className="business-top">
            <div className="img-container">
              <img src={person} alt="Person" />
            </div>
            <div className="intro">
              <h4>Shope for business</h4>
              <p>
                The SHOPE Business Division is a team of highly qualified
                specialists who have a deep understanding of the specifics of
                Lithuanian and foreign business companies, institutions, and
                other organizations' needs.
                <br />
                <br />
                The results of our many years of experience encompass the
                implementation of various exciting projects in both the private
                and public sectors. Understanding the individual needs of each
                area allows us to prepare proposals that are maximally adapted
                to the clients' requirements.
                <br />
                <br />
                The SHOPE B2B offer includes a wide range of mobile devices,
                electronics, home appliances, office solutions, and other
                technical equipment necessary for the dynamic development of
                modern organizations.
              </p>
            </div>
          </div>
          <hr />
          <div className="partner">
            <p>
              <u>Leasing applies to a shopping basket over 1000 EUR.</u>
            </p>
            <p>
              <strong>Documents needed for evaluation:</strong>
              <br />- Company data: Name, business code
              <br />- Contact person: Name, surname, position or basis for
              representation, phone number, email address
              <br />- The latest available financial statement (expanded balance
              and profit and loss statement)
              <br />- Bank account statements for the last 6 months
              <br />
              <br />
              <u>Company Age</u>: The company must be actively operating for at
              least 3 months.
              <br />
              <u>Monthly Turnover</u>: Turnover per month should be greater than
              3,000 EUR.
              <br />
              <u>Tax Debt</u>: The company's tax debt does not exceed the amount
              of one month's turnover.
            </p>
          </div>
          <hr />
          <div className="about-cards">
            <h4>Assistance for your workplace according to your needs:</h4>
            <div className="price-table">
              {plans.map((plan) => (
                <Plans plan={plan} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
      <Footer />
    </>
  );
};

export default Business;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Brands from "./components/Brands";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import ProductCategory from "./components/ProductCategory";
import Contacts from "./components/Contacts";
import About from "./components/About";

import "./styles/index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Hero />
              <Brands />
              <Products />
              <Footer />
            </>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:productName" element={<ProductDetails />} />
        <Route
          path="/category/:productCategory"
          element={<ProductCategory />}
        />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Brands from "./components/Brands";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Products from "./components/Products";

import "./styles/index.css";
import LikedGoods from "./components/LikedGoods";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Nav />
          <Hero />
          <Brands />
          <Products />
          <Footer />
        </>
      ),
    },
    {
      path: "/goods",
      element: <LikedGoods />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/:productName",
      element: <ProductDetails />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

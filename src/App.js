import Brands from "./components/Brands";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Products from "./components/Products";

import "./styles/index.css";

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Brands />
      <Products />
      <Footer />
    </>
  );
}

export default App;

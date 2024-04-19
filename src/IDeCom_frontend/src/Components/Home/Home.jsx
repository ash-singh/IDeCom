import React from "react";
import "./Home.scss";
import Footer from '../Footer/Footer';
import { ProductsPage } from '../Product/ProductsPage';

const Home = () => {
  return (
    <div className="home_container">
      <ProductsPage />
      <Footer />
    </div>
  );
};

export default Home;

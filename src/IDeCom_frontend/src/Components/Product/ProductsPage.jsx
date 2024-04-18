import { IDeCom_product } from 'declarations/IDeCom_product';
import {ProductList} from "./ProductList";
import React, {useEffect, useState} from "react";
import "./Products.scss"

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all'); 

  useEffect(() => {
    loadProjects(currentPage);
  }, [currentPage])

  async function loadProjects (page)  {
    setLoading(true);

    IDeCom_product.getProducts("no search").then((data) => {
      if (currentPage == 1) {
        setProducts(data);
      } else {
        setProducts((projects) => [...projects, ...data]);
      }

      setError(null);
      setLoading(false);
    });
  }

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  return (
    <>
      {/* { error != null && (
        {error}
      )} */}
      <div>
        <h2 className="Category_title">PRODUCT OVERVIEW</h2>
        <div className="Category_Container">
          <div className="Category_Items">
            <button onClick={() => setSelectedCategory('all')}>All Products</button>
          </div>
          <div className="Category_Items">
            <button onClick={() => setSelectedCategory("men's clothing")}>Men</button>
          </div>
          <div className="Category_Items">
            <button onClick={() => setSelectedCategory("women's clothing")}>Women</button>
          </div>
          <div className="Category_Items">
            <button onClick={() => setSelectedCategory('electronics')}>Electronics</button>
          </div>
          <div className="Category_Items">
            <button onClick={() => setSelectedCategory('jewelery')}>Jewelery</button>
          </div>
        </div>

        <div className="Container">
            <ProductList products={products}/>

            {loading && (
                <div className="center-page">
                <span className="spinner primary"></span>
                <p>Loading...</p>
                </div>
            )}
        </div>

      </div>

      {/* {!loading && !error  && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  )
}

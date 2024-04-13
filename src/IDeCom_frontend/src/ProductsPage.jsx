import { IDeCom_product } from 'declarations/IDeCom_product';
import {ProductList} from "./ProductList";
import Product from "./Product";
import React, {useEffect, useState} from "react";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadProjects(currentPage);
  }, [currentPage])

  const onSave = (product) => {
    console.log('Saving products: ', product);

    updateProduct(product);
  }

  async function updateProduct(product) {
  }

  async function loadProjects (page)  {
    setLoading(true);
    // setProducts(MOCK_PRODUCTS)
    setLoading(false);
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
      <h1> Products</h1>
      { error != null && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProductList onSave={onSave} products={products}/>

      {!loading && !error  && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}

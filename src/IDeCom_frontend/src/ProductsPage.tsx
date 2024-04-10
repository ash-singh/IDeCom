import {ProductList} from "./ProductList";
import {MOCK_PRODUCTS} from "./MockProducts";
import Product from "./Product";
import React, {useEffect, useState} from "react";

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadProjects(currentPage);
  }, [currentPage])

  const onSave = (product: Product) => {
    console.log('Saving products: ', product);

    updateProduct(product);
  }

  async function updateProduct(product: Product) {
    
  }

  async function loadProjects (page: number)  {
    setLoading(true);
    setProducts(MOCK_PRODUCTS)
    setLoading(false);
    // try {
    //   const data  = await ProjectAPI.get(page,3);

    //   if (currentPage == 1) {
    //     setProjects(data);
    //   } else {
    //     setProjects((projects) => [...projects, ...data]);
    //   }

    //   setError(null);
    //   setLoading(false);
    // } catch (e) {
    //   if (e instanceof Error) setError(e.message);
    // } finally {
    //   setLoading(false);
    // }
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
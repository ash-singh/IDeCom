import React from 'react';
import {ProductForm} from "../Product/ProductForm";
import {ProductsPage} from "../Product/ProductsPage";

export const SellerPage = ({products}) => {
  
  return (
    <>
      <ProductForm />
      <h1> My Products</h1>
      <ProductsPage/>
    </>
  );
}

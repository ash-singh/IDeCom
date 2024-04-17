import React from 'react';
import {ProductForm} from "./ProductForm";
import {ProductsPage} from "./ProductsPage";

export const SellerPage = ({products}) => {
  
  return (
    <>
      <ProductForm />
      <h1> My Products</h1>
      <ProductsPage/>
    </>
  );
}

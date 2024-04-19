import React from 'react';
import Product from "./Product";
import {ProductCard} from "./ProductCard";
import { Link } from 'react-router-dom';


export const ProductList= ({products}) => {
  return (
    <div className="Row">
      {products.map((Product) =>(
        
        <div className="column" key={Product.id}>
          <Link to={`/products/${Product.id}`}>
            <ProductCard product={Product}/>
          </Link>
        </div>
      ))}
    </div>
  );
}

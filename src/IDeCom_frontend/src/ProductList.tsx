import React from 'react';
import Product from "./Product";
import {ProductCard} from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({products}: ProductListProps) => {
  
  return (
    <div className="row">
      {products.map((Product) => (
        <div key={Product.id} className="cols-sm">
          {
            <ProductCard product={Product}/>
          }
        </div>
      ))}
    </div>
  );
}

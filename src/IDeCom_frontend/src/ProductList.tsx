import React, {useState} from 'react';
import Product from "./Product";
import {ProductCard} from "./ProductCard";
import { ProductForm } from './ProductForm';

interface ProductListProps {
  products: Product[];
  onSave : (product: Product) => void ;
}

export const ProductList: React.FC<ProductListProps> = ({products, onSave}: ProductListProps) => {
  const [projectBeingEdited, setProjectBeingEdited] = useState<Product|{}>({})

  const handleEdit = (Product: Product) => {
    setProjectBeingEdited(Product);
  };

  const cancelEditing = () => {
    setProjectBeingEdited({});
  }

  return (
    <div className="row">
      {products.map((Product) => (
        <div key={Product.id} className="cols-sm">
          {
            Product === projectBeingEdited ?
            ( <ProductForm product={Product} onSave={onSave} onCancel={cancelEditing} />) :
            ( <ProductCard product={Product} onEdit={handleEdit}/>)
          }
        </div>
      ))}
    </div>
  );
}

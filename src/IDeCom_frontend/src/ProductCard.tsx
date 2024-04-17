import React from "react";
import Product from "./Product";

function formatDescription(description: string): string {
  return description.substring(0, 60) + '...';
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({product, onEdit}: ProductCardProps) => {
  const handleEditClick = (productBeingEdited: Product) => {
    onEdit(productBeingEdited);
  };

  return (
    <div key={product.id} className="cols-sm">
      <div className="card">
        <img src={ URL.createObjectURL(new Blob([product.image], { type: 'image/png' }))} style={{width: "80%",height: "40%"}} alt={product.name} />
        <section className="section dark">
          <h5 className="strong">
            <strong>{product.name}</strong>
          </h5>
          <p>{formatDescription(product.description)}</p>
          <p>Price : {product.price.toLocaleString()}</p>
        </section>
      </div>
    </div>
  )
}

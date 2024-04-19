import React from "react";
import { addCart } from "../../redux/action";
import { useDispatch } from "react-redux";

function formatDescription(description) {
  return description.substring(0, 60) + '...';
}


export const ProductCard = ({product}) => {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  return (
    <div key={product.id} className="Card">
      <img src={ URL.createObjectURL(new Blob([product.image], { type: 'image/png' }))} className="card_img" alt={product.name} />
      <div className="card_body">
        <h5 className="card_title">{product.name}</h5>
        <p className="card_text">${product.price.toLocaleString()}</p>
        <button onClick={() => addProduct(product)}>Add To Cart</button>
      </div>
    </div>
  )
}

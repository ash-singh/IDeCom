import React, { useState, useEffect } from 'react';
import { IDeCom_product } from 'declarations/IDeCom_product';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import Footer from '../Footer/Footer';
import "./SingleProduct.scss"
const SingleProduct = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();

    const addProduct = (product) => {
        product.id = Number(product.id);
        product.price = Number(product.price);
        product.image = '';
        dispatch(addCart(product));
    };

    useEffect(() => {

        IDeCom_product.getProductDetail(Number(id)).then((data) => {
            console.log(data);
            if (data != null) {
                setProduct(data[0]);
                setError(null);
            } else {
                setError("Error loading product details");
            }
        });
    }, [id]);


  return (
    <>
    <div className="Product-card">
        { error != null && (
            {error}
        )}
        <div className="Product-Img">
        <img src={ URL.createObjectURL(new Blob([product.image], { type: 'image/png' }))} alt={product.title} />
        </div>
        <div className="Product-Details">
        <h2>{product.title}</h2>
        <p id="Product-description">{product.description}</p>
        <p id="Product-price"> Price: ${Number(product.price)}</p>
        <button onClick={() => addProduct(product)}>Add To Cart</button>
        </div>
    </div>
    <Footer/>
    </>
  );
};

export default SingleProduct;

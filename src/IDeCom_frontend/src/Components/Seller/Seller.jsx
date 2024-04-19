import React, {useState} from "react";
import {ProductForm} from "../Seller/ProductForm";
import {ProductsPage} from "../Product/ProductsPage";

export const SellerPage = ({products}) => {
    const [showForm, setShowForm] = useState(false)

    const handleClick = () => {
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <>
            <button onClick={handleClick}> Add New Product</button>
            { showForm && (
                <ProductForm handleCancel={handleCancel}/>
            )}
        </>
    );
}

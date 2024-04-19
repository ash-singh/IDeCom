import Product from "../Product/Product";
import React, {useState} from "react";
import { IDeCom_product } from 'declarations/IDeCom_product';


const Errors = {
  name: '',
  code:'',
  description: '',
  price: ''
}
export const ProductForm = ({handleCancel}) => {
  const [product, setProduct] = useState('');
  const [errors, setErrors] = useState(Errors);
  const [imageBlob, setImageBlob] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [message, setMessage] = useState(false);

  const getFileBlob = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(new Blob([reader.result], { type: file.type }));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const blob = await getFileBlob(file);
        const bufferPromise = await blob.arrayBuffer();
        // Set the blob in state
        setImageBlob(blob);
        setProductImage(bufferPromise);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };
  const handleAddProductSubmit = (event) => {
    event.preventDefault();

    if (!isValid()) return;
    onSave(product);
  };

    const onSave = (product) => {
        const productPayload = {
            id: product.id,
            category: product.category,
            name: product.name,
            seller: localStorage.getItem('username'),
            slug: product.name + "-slug",
            description: product.description,
            isActive: product.isActive,
            price: product.price,
            currency: product.currency,
        };
        console.log(product);
        console.log(productPayload);
        if (productImage) {

            productPayload.image = new Uint8Array(productImage);

            IDeCom_product.createProduct(productPayload).then((result) => {
            console.log("product saved ",result)
            if (result) {
                setMessage("added product");
                handleCancel();
            } else {
                setMessage("failed to add message!");
            }
            });
        }
    };

  const handleChange = (event) => {
    const {type, name, value, checked } = event.target;

    let updatedValue = (type === 'checkbox')? checked : value;

    if (type === 'number') {
      updatedValue = Number(updatedValue)
    }

    const change = {
      [name] : updatedValue
    };

    let updatedProduct;

    setProduct((p) => {
      updatedProduct = new Product({...p, ...change});
      return updatedProduct;
    });

    setErrors(() => validate(updatedProduct));
  }
  const validate = (product) => {
    let errors = {
      name: '',
      code:'',
      description: '',
      price: ''
    };

    if (product.name.length === 0) {
      errors.name = 'Name is required';
    }

    if (product.name.length > 0 && product.name.length < 3) {
      errors.name = 'Name needs to be at least 3 characters.';
    }

    if (product.description.length === 0) {
      errors.description = 'Description is required';
    }

    if (product.price === 0) {
      errors.price = 'Price must be more than $0.';
    }

    return errors;
  }
  const isValid = () => {
    return (
      errors.name.length === 0 &&
      errors.code.length === 0 &&
      errors.description.length === 0 &&
      errors.price.length === 0
    );
  }

  return (
    <>
      <form className="" onSubmit={handleAddProductSubmit}>
      <h1>{message}</h1><br></br>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} required/>
            {errors.name.length > 0 && (
                <div className="card error">
                <p>{errors.name}</p>
                </div>
            )} 
        </div>

        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea name="description" className="form-control" onChange={handleChange} required/>
            {errors.name.length > 0 && (
                <div className="card error">
                <p>{errors.name}</p>
                </div>
            )} 
        </div>

        <div className="mb-3">
            <label htmlFor="id" className="form-label">Product Code</label>
            <input type="number" name="id" className="form-control" onChange={handleChange} required/>
            {errors.code.length > 0 && (
                <div className="card error">
                <p>{errors.code}</p>
                </div>
            )}
        </div>

        <div className="mb-3">
            <label htmlFor="category" className="form-label">Product Category</label>
            <select name="category" className="form-control" onChange={handleChange} required>
                <option value="">None</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="cloths">Cloths</option>
            </select>
        </div>

        <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" name="price" className="form-control" onChange={handleChange} required/>
            {errors.price.length > 0 && (
                <div className="card error">
                <p>{errors.price}</p>
                </div>
            )}
        </div>
        <div className="mb-3">
            <label htmlFor="currency" className="form-label">Currency</label>
            <select name="currency" className="form-control" onChange={handleChange} required>
                <option value="">None</option>
                <option value="EUR">EUR</option>
                <option value="ICO">ICP</option>
                <option value="BTC">BTC</option>
            </select>
        </div>

        <div className="mb-3">
            <label htmlFor="isActive" className="form-label">Is Active?</label>
            <input type="checkbox" name="isActive" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mb-3">
            <label htmlFor="productImage" className="form-label">Product Image</label>
            <input type="file" name="productImage" accept="image/*" className="form-control" onChange={handleFileInputChange} required/>
            {imageBlob && (
              <div>
                <p>Preview:</p>
                <img src={URL.createObjectURL(imageBlob)} alt="Preview" width="200" />
              </div>
            )}
        </div>

        <div className="input-group">
            <button className="primary bordered medium">Save</button>
            <span />
            <button type="button" className="bordered medium" onClick={handleCancel} >cancel </button>
        </div>
    </form>
    </>
  );
}

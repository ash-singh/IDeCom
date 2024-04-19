import Product from "./Product";
import React, {useState} from "react";
import { IDeCom_product } from 'declarations/IDeCom_product';


const Errors = {
  name: '',
  code:'',
  category:'',
  description: '',
  price: ''
}

export const ProductForm = () => {
  const [product, setProduct] = useState('');
  const [errors, setErrors] = useState(Errors);
  const [imageBlob, setImageBlob] = useState(null);
  const [imageTransit, setImageTransit] = useState(null);
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
        setImageTransit(bufferPromise);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid()) return;
    onSave(product);
  };

  const onSave = (product) => {
    // Here you can use the 'imageBlob' state for further processing, like sending it to the server
    if (imageBlob) {
      const Product = {
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        seller: localStorage.getItem('username'),
        slug: product.name + "-slug",
        description: product.description,
        isActive: product.isActive,
        price: product.price,
        image: new Uint8Array(imageTransit),
        currency: "EUR",
      };
      console.log(Product);

      IDeCom_product.createProduct(Product).then((result) => {
        console.log(result)
        if (result) {
          setMessage("added product");
        } else {
          setMessage("failed to add message!");
        }
      });
      return false;

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
      category:'',
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
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <h1>{message}</h1><br></br>

      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={product?.name}
        onChange={handleChange}
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="id">Code</label>
      <input
        type="number"
        name="id"
        placeholder="enter product code"
        value={product?.id}
        onChange={handleChange}
      />
      {errors.code.length > 0 && (
        <div className="card error">
          <p>{errors.code}</p>
        </div>
      )}

      {/* <label htmlFor="code">Category</label>
      <input
        type="number"
        name="category"
        placeholder="enter product Category"
        value={product?.categoryId}
        onChange={handleChange}
      />
      {errors.category.length > 0 && (
        <div className="card error">
          <p>{errors.category}</p>
        </div>
      )} */}

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={product?.description}
        onChange={handleChange}
      />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}

      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        placeholder="enter price"
        value={product?.price}
        onChange={handleChange}
      />
      {errors.price.length > 0 && (
        <div className="card error">
          <p>{errors.price}</p>
        </div>
      )}

      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        defaultChecked={product?.isActive}
        onChange={handleChange}
      />

      <input type="file" accept="image/*" onChange={handleFileInputChange} />

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" >cancel </button>
      </div>
    </form>
  );
}

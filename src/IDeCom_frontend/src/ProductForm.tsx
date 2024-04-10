import Product from "./Product";
import React, {SyntheticEvent, useState} from "react";

interface ProductFormProps {
  product: Product;
  onCancel: () => void;
  onSave: (product: Product) => void;
}

type Errors = {
  name: string,
  description: string
  budget: string
}

export const ProductForm : React.FC<ProductFormProps> = ({product: initialProduct, onSave, onCancel }) => {
  const [product, setProduct] = useState(initialProduct);
  const [errors, setErrors] = useState<Errors>({
    name: '',
    description: '',
    budget: ''
  });

  const handleSubmit = (event : SyntheticEvent) => {
    event.preventDefault();

    if (!isValid()) return;
    onSave(product);
  };
  
  const handleChange = (event: any) => {
    const {type, name, value, checked } = event.target;

    let updatedValue = (type === 'checkbox')? checked : value;

    if (type === 'number') {
      updatedValue = Number(updatedValue)
    }

    const change = {
      [name] : updatedValue
    };

    let updatedProduct: Product;

    setProduct((p) => {
      updatedProduct = new Product({...p, ...change});
      return updatedProduct;
    });

    setErrors(() => validate(updatedProduct));
  }

  const validate = (product: Product) : Errors => {
    let errors = { name: '', description: '', budget: ''};

    if (product.name.length === 0) {
      errors.name = 'Name is required';
    }

    if (product.name.length > 0 && product.name.length < 3) {
      errors.name = 'Name needs to be at least 3 characters.';
    }

    if (product.description.length === 0) {
      errors.description = 'Description is required';
    }

    if (product.budget === 0) {
      errors.budget = 'Budget must be more than $0.';
    }

    return errors;
  }

  const isValid = () => {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={product.name}
        onChange={handleChange}
      />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="description">Product Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={product.description}
        onChange={handleChange}
      />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}

      <label htmlFor="budget">Product Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={product.budget}
        onChange={handleChange}
      />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}

      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        defaultChecked={product.isActive}
        onChange={handleChange}
      />

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>cancel </button>
      </div>
    </form>
  );
}
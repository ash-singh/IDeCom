import React, { useState } from 'react';
import { IDeCom_product } from 'declarations/IDeCom_product';
import Product from './Product';

function ImageUploader() {
  const [imageBlob, setImageBlob] = useState(null);
  const [imageTransit, setImageTransit] = useState(null);

  // Function to convert file to Blob
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

  // Function to handle file input change event
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

  // Function to handle image upload
  const handleImageUpload = () => {
    // Here you can use the 'imageBlob' state for further processing, like sending it to the server
    if (imageBlob) {
      console.log('Blob:', imageBlob);
      // let img = new Uint8Array([72, 101, 108, 108, 111])

      // Example: You can upload 'imageBlob' to the server here
      const product = {
        id: 1,
        categoryId: 1,
        name: 'Dining chair',
        slug: 'Kitchen+&+Dining+Chairs',
        description: 'Fully-configurable black box framework. Ullam occaecati libero laudantium nihil voluptas omnis.',
        isActive: true,
        imageUrl: '',
        price: 112112,
        image: new Uint8Array(imageTransit),
        currency: "EUR",
      };
      console.log(product);

      IDeCom_product.createProduct(product).then((data) => {
        console.log(data)
      });
      return false;

    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {imageBlob && (
        <div>
          <p>Preview:</p>
          <img src={URL.createObjectURL(imageBlob)} alt="Preview" width="200" />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

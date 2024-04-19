import {number} from "prop-types";

interface Initializer {
  id: number| undefined;
  name : string | '';
  seller: string | '';
  description: string | '';
  imageUrl : string | '';
  image: any;
  category : string;
  createdOn: any;
  price: number;
  currency: string;
  isActive : boolean;
}

 class Product {
   readonly id: number | undefined;
   readonly name: string;
   readonly seller: string;
   readonly description: string ;
   readonly imageUrl: string;
   readonly image: any;
   readonly category: string;
   readonly createdOn: Date;
   readonly price: number;
   readonly currency: string;
   readonly isActive: boolean;

   constructor(initializer: Initializer) {
     this.id = undefined;
     this.name = '';
     this.seller = '';
     this.description = '';
     this.imageUrl = '';
     this.image = '';
     this.category = '';
     this.createdOn = new Date();
     this.price = 0;
     this.currency = '';
     this.isActive = false;

     if (!initializer) return;
     if (initializer.id) this.id = initializer.id;
     if (initializer.name) this.name = initializer.name;
     if (initializer.seller) this.seller = initializer.seller;
     if (initializer.description) this.description = initializer.description;
     if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
     if (initializer.image) this.image = initializer.image;
     if (initializer.category)
       this.category = initializer.category;
     if (initializer.createdOn)
       this.createdOn = initializer.createdOn;
     if (initializer.price) this.price = initializer.price;
     if (initializer.currency) this.currency = initializer.currency;
     if (initializer.isActive) this.isActive = initializer.isActive;
   }

   isNew = () => {
     return this.id === undefined;
   }
 }

 export default Product;

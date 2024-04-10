import {number} from "prop-types";

interface Initializer {
  id: number| undefined;
  name : string | '';
  description: string | '';
  imageUrl : string | '';
  contractTypeId : number;
  contractSignedOn: any;
  budget: number;
  isActive : boolean;
}

 class Product {
   readonly id: number | undefined;
   readonly name: string;
   readonly description: string ;
   readonly imageUrl: string;
   readonly contractTypeId: number;
   readonly contractSignedOn: Date;
   readonly budget: number;
   readonly isActive: boolean;

   constructor(initializer: Initializer) {
     this.id = undefined;
     this.name = '';
     this.description = '';
     this.imageUrl = '';
     this.contractTypeId = 0;
     this.contractSignedOn = new Date();
     this.budget = 0;
     this.isActive = false;

     if (!initializer) return;
     if (initializer.id) this.id = initializer.id;
     if (!initializer) return;
     if (initializer.id) this.id = initializer.id;
     if (initializer.name) this.name = initializer.name;
     if (initializer.description) this.description = initializer.description;
     if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
     if (initializer.contractTypeId)
       this.contractTypeId = initializer.contractTypeId;
     if (initializer.contractSignedOn)
       this.contractSignedOn = initializer.contractSignedOn;
     if (initializer.budget) this.budget = initializer.budget;
     if (initializer.isActive) this.isActive = initializer.isActive;
   }

   isNew = () => {
     return this.id === undefined;
   }
 }

 export default Product;
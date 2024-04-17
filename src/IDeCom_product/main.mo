import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";
import Bool "mo:base/Bool";
import Types "types";

actor Product {

  type Product = Types.Product;

  stable var products : [(Text, Product)] = [];

   // map to hold the data of the products 
  let mapProducts = HashMap.HashMap<Text, Product>(0, Text.equal, Text.hash);

  let productsMap = HashMap.fromIter<Text,Product>(
    products.vals(), 10, Text.equal, Text.hash);

  type GetProductsResult = Result.Result<[Product], Text>;

  // create product
  public shared func createProduct(product: Product): async Bool {
    switch(mapProducts.get(product.slug)) {
        case(null){
            mapProducts.put(product.slug, product);
            return true;
        };
        case(? product){
            return false;
        };
    };
  };

  public func getProducts(search: Text): async [Product] {
      return Iter.toArray(mapProducts.vals());
  };

  system func preupgrade() {
    products := Iter.toArray(mapProducts.entries());
  };

  system func postupgrade() {
    products := [];
  };
};


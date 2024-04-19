import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";
import Bool "mo:base/Bool";
import Nat64 "mo:base/Nat64";
import Nat "mo:base/Nat";
import Types "types";
import Util "util";

actor Product {

  type Product = Types.Product;

  let eq: (Nat, Nat) -> Bool = func(x, y) { x == y };

  stable var nextProductId: Nat = 1;
  stable var stableProducts : [(Nat, Product)] = [];
  stable var stableCategoryProducts : [(Text, Nat)] = [];

  // map to hold the data of the products 
  let productsMap = HashMap.fromIter<Nat,Product>(
    stableProducts.vals(), 10, Nat.equal, Util.hashNat);

  // categories and products
  let categoryProductsMap = HashMap.fromIter<Text,Nat>(
    stableCategoryProducts.vals(), 10, Text.equal, Text.hash);

  type GetProductsResult = Result.Result<[Product], Text>;

  // create product
  public shared func createProduct(product: Product): async Bool {
    switch(productsMap.get(product.id)) {
      case(null){
          productsMap.put(product.id, product);
          categoryProductsMap.put(product.category, nextProductId);
          nextProductId += 1;
          return true;
      };
      case(? product){
          return false;
      };
    };
  };

  public func getProducts(category: Text): async [Product] {
    return Iter.toArray(productsMap.vals());
  };

  public func getProductDetail(id: Nat): async ?Product {
    switch(productsMap.get(id)) {
      case(null){
          return null;
      };
      case(? product){
          return ?product;
      };
    };
  };

  system func preupgrade() {
    stableProducts := Iter.toArray(productsMap.entries());
    stableCategoryProducts := Iter.toArray(categoryProductsMap.entries());
  };

  system func postupgrade() {
    stableProducts := [];
    stableCategoryProducts := [];
  };
};


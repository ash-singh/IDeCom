import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Nat8 "mo:base/Nat8";
import Bool "mo:base/Bool";
import Blob "mo:base/Blob";
module {
  public type Product = {
    id: Nat;
    name: Text;
    slug: Text;
    description: Text;
    imageUrl: Text;
    image: Blob;
    categoryId: Nat8;
    price: Nat;
    currency: Text;
    isActive: Bool;
  };
}

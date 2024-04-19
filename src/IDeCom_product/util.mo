import Prim "mo:prim";

module {
  public func hashNat(key: Nat): Nat32 {
    var hash = Prim.intToNat64Wrap(key);

    hash := hash >> 30 ^ hash *% 0xbf58476d1ce4e5b9;
    hash := hash >> 27 ^ hash *% 0x94d049bb133111eb;

    Prim.nat64ToNat32(hash >> 31 ^ hash & 0x3fffffff);
  };
}
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Types "types";

actor {

  type User = Types.User;

   // map to hold the data of the registered users
  let mapUsers = HashMap.HashMap<Text, User>(0, Text.equal, Text.hash);

  type GetUserResult = Result.Result<User, Text>;

  // login user
  public shared func login(username: Text): async User {
    switch(mapUsers.get(username)) {
        case(null){
            var user: User = {
              username = username;
            };

            mapUsers.put(username, user);
            return user;
        };
        case(? user){
            return user;
        };
    };
  };

  public func getUser(username: Text): async GetUserResult {
      switch(mapUsers.get(username)){
        case(null){
            return #err("There is no user with the given username" # username);
        };
        case(? user){
            return #ok(user);
        };
      };
  };

  public query func greet(name : Text) : async Text {
    return "Welcome, " # name # "!";
  };
};

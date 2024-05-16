const { Schema, model } = require("mongoose");

let User;
try {
  User = model("User");
} catch (e) {
  const UserSchema = new Schema({
    name: String ,
    email: String ,
    image: String ,
    email_verified: Date 
  });
  User = model("User", UserSchema);
}

export default User
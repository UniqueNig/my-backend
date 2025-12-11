const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Student Schema
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now() },
});

let saltRound = 10;
userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, saltRound, (err, hashedPassword) => {
    console.log(this.password);
    if (err) {
      console.log("Error while hashing password", err);
    } else {
      this.password = hashedPassword;
      console.log("Hashed Password:", hashedPassword);
      next();
    }
  });
});

userSchema.methods.validatePassword = function (password, callback) {
  console.log(password, this.password);
  bcrypt.compare(password, this.password, (err, same) => {
    if (!err) {
      console.log(same);
      callback(err, same);
    } else {
      next();
    }
  });
};
//Student Model
const userModel = mongoose.model(
  "user_collection",
  userSchema,
  "user_collection"
);

module.exports = userModel;

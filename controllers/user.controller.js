const { response } = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const addUser = (req, res) => {
  console.log("Request body:", req.body);

  let form = new userModel(req.body);

  form
    .save()
    .then(() => {
      console.log("User saved successfully");
      res.send({ status: true, message: "user saved" });
    })
    .catch((error) => {
      console.log("Error saving user:", error);
      res.send({ status: false, error });
    });
};

const authenticateUser = (req, res) => {
  console.log(req.body);
  let { password } = req.body;
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);

      if (user) {
        user.validatePassword(password, (err, same) => {
          console.log(password);
          if (!same) {
            res.send({ status: false, message: "Invalid Credentials" });
          } else {
            // res.send({ status: true, message: "Login Successful", data: user });
            let token = jwt.sign(
              { email: req.body.email },
              process.env.JWT_SECRET,
              {
                expiresIn: "3s",
              }
            );
            console.log(token);
            res.send({
              status: true,
              message: "Login Successful",
              data: user,
              token,
            });
          }
        });
      } else {
        res.send({ status: false, message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDashboard = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err);
    } else {
      console.log("Decoded token:", decoded);
      let email = decoded.email;
      userModel.findOne({ email: email }).then((user) => {
        res.send({ status: true, message: "Token is valid", user });
        console.log(user);
      });
    }
  });
};

module.exports = { addUser, authenticateUser, getDashboard };

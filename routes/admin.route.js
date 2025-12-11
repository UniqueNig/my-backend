
const express = require('express')
const router = express.Router()

// const StudentModel = require('../models/user.model')
const endpoint = require('../utils/endpoint')
const musicEndpoint = require('../utils/musicEndpoint')
const { addProduct, fetchProduct, editProduct, updateProduct, deleteProduct, productDisplay } = require('../controllers/product.controller')
const { addUser, authenticateUser, getDashboard } = require('../controllers/user.controller')

const users = [];

router.get("/student-signup", (req, res) => {
  res.render("student");
});



router.get("/add-product", productDisplay);

router.post("/product", addProduct);

router.get("/allproducts", fetchProduct);

router.get("/edit-product/:id", editProduct);

router.post("/update-product/:id", updateProduct);

router.post("/delete-product/:id", deleteProduct);

router.get("/", (request, response) => {
  //response.send('Welcome to Backend')
  response.json(endpoint);
  console.log("Backend is running");
});

router.get("/music", (req, res) => {
  res.json(musicEndpoint);
});

router.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

router.get("/services", (req, res) => {
  res.sendFile(__dirname + "/services.html");
});

// router.get("/signup", (req, res) => {
//   res.sendFile(__dirname + "/signup.html");
// });

// router.get("/signin", (req, res) => {
//   res.sendFile(__dirname + "/signin.html");
// });

// router.get("/dashboard", (req, res) => {
//   res.sendFile(__dirname + "/dashboard.html");
// });

router.get("/home", (req, res) => {
  // const user = { name: "Elizabeth", age: 20 };
  res.render("index", { endpoint });
});

router.post("/signin", authenticateUser 
);
router.get('/dashboard', getDashboard)
router.post("/register", addUser);

// router.get("/signup", (req, res) => {
//   res.render("signup");
// });


// router.get("/dashboard", (req, res) => {
//   res.render("dashboard", { users });
//   console.log(req);
// });

// router.post("/delete/:index", (req, res) => {
//   console.log(req.params.index);
//   let removeUser = req.params.index;
//   users.splice(removeUser, 1);
//   res.redirect("/dashboard");
// });

// router.post("/edit/:index", (req, res) => {
//   console.log(req.params.index);
// });



router.get("/allusers", (req, res) => {
  StudentModel.find()
    .then((student) => {
      console.log(student);
      res.render("allusers", { student });
    })
    .catch((error) => {
      console.log(error);
    });
});



module.exports = router
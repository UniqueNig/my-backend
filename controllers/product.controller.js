const ProductModel = require('../models/product.model')

const productDisplay = (req,res) =>{
      res.render("product");
}

const addProduct = (req, res) => {
  let newProduct = new ProductModel(req.body);
  newProduct
    .save()
    .then(() => {
      console.log("Product saved successfully");
      res.redirect("/allproducts");
    })
    .catch((error) => {
      console.log("Error saving product:", error);
      res.send("Error saving product");
    });
};


const fetchProduct = (req, res) =>{
      ProductModel.find()
    .then((product) => {
      console.log(product);
      res.render("allproducts", { product });
    })
    .catch((error) => {
      console.log(error);
    });
}

const deleteProduct = (req, res) =>{
  let productId = req.params.id;
  console.log(productId);
  ProductModel.deleteOne({ _id: productId })
    .then(() => {
      console.log("Product deleted successfully");
      res.redirect("/allproducts");
    })
    .catch((error) => {
      console.log("Error deleting product:", error);
    });
}

const editProduct = () =>{
  let productId = req.params.id;
  console.log(productId);
  ProductModel.findById({ _id: productId })
    .then((product) => {
      console.log(product);
      res.render("editproduct", { product });
    })
    .catch((error) => {
      console.log(error);
    });
}

const updateProduct = () =>{
      let productId = req.params.id;
  console.log(productId);
  ProductModel.updateOne({ _id: productId }, req.body)
    .then(() => {
      console.log("Product updated successfully");
      res.redirect("/allproducts");
    })
    .catch((error) => {
      console.log("Error updating products", error);
    });
}

module.exports = {productDisplay, addProduct, fetchProduct, deleteProduct, editProduct, updateProduct}

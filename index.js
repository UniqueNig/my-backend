const { name } = require("ejs");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5500;
const URI = process.env.MONGO_DB_URI;
const mongoose = require("mongoose");
const AdminRoute = require("./routes/admin.route");

app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", AdminRoute);

app.get("/about", (req, res) => {
  res.send("<h1>Welcome to about</h1>");
});

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

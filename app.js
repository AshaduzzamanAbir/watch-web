require("dotenv").config();
const express = require("express");
const app = express();

// Enable debug logs
require("debug").enable("development:*");

const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");

const ownerRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productsRouter");

const userSchema = require("./models/user-model");
const productSchema = require("./models/product-model");
const ownerSchema = require("./models/owner-model");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/owner", ownerRouter);
app.use("/user", userRouter);
app.use("/products", productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

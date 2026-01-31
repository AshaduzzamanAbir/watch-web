const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let products = await productModel.find();
  let success = req.flash("success", "Product added to cart!");
  res.render("shop", { products, success });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Product added to cart!");
  res.redirect("/shop");
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  // 2. Calculate the total bill
  let bill = 0;
  user.cart.forEach((item) => {
    bill += item.price;
  });

  res.render("cart", { user, bill });
});

router.get(
  "/remove-from-cart/:productid",
  isLoggedIn,
  async function (req, res) {
    try {
      // 1. Find the user
      let user = await userModel.findOne({ email: req.user.email });

      // 2. Remove the specific product ID from the cart array
      user.cart.pull(req.params.productid);

      // 3. Save the changes
      await user.save();

      // 4. Send a success flash message (optional) and redirect
      req.flash("success", "Item removed from cart");
      res.redirect("/cart");
    } catch (err) {
      console.error(err);
      res.redirect("/cart");
    }
  },
);

router.get("/logout", isLoggedIn, async (req, res) => {
  res.render("shop");
});

module.exports = router;

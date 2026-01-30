const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let {
      name,
      price,
      description,
      discount,
      category,
      bgcolor,
      panalcolor,
      textcolor,
    } = req.body;

    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      description,
      category,
      bgcolor,
      panalcolor,
      textcolor,
    });

    req.flash("success", "Product created successfully!");
    // res.status(201).send(product);
    res.redirect("/owner/admin");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;

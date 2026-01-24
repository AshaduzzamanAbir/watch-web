const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Owner!");
});

console.log(process.env.NODE_ENV);

router.post("/create", (req, res) => {
  res.send("Hello Owner! it's working");
});

module.exports = router;

const jwt = require("jsonwebtoken");

const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "You are not logged in , please login first.");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    req.user = user;

    next();
  } catch (error) {
    req.flash("error", "Something is Wrong.");
    req.redirect("/");
  }
};

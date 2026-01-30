const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "You already have an account, please login.");
      return res.redirect("/");
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.redirect("/shop");
        }
      });
    });
  } catch (error) {
    console.log(`Error for issues kinde of ${error}, `, error);
  }

  // res.send("Hello World!");
};

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });

  if (!user) {
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, (err, results) => {
    if (results) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Email or Password incorrect");
      return res.redirect("/");
    }
  });
};

module.exports.logout = async function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};

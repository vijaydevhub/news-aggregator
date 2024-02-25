const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

var signup = (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
    preferences: req.body.preferences,
  });

  user
    .save()
    .then((data) => {
      return res
        .status(200)
        .json({ user: data, message: "User created successfully" });
    })
    .catch((err) => {
      return res.status(500).send({ message: err + " User not created" });
    });
};

var login = (req, res) => {
  var emailPassed = req.body.email;
  var passwordPassed = req.body.password;

  User.findOne({
    email: emailPassed,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      let passwordIsValid = bcrypt.compareSync(passwordPassed, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid password" });
      } else {
        var token = jwt.sign(
          {
            id: user.id,
          },
          process.env.API_SECRET,
          {
            expiresIn: 86400,
          }
        );

        return res.status(200).json({
          message: "Login Successful",
          accessToken: token,
          user: {
            id: user.id,
          },
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

var userpreference = (req, res) => {
  var emailPassed = req.body.email;
  var preferencePassed = req.body.preferences;

  User.findOne({
    email: emailPassed,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      try {
        mongoose.query("UPDATE users SET preferences = $1 WHERE id = $2", [
          preferencePassed,
          emailPassed,
        ]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }

      return res.status(200).json({
        message: "Updated user preference Successful",
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

module.exports = { signup, login, userpreference };

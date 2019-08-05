const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// @route POST api/users
// @desc Register a user
// @access public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password of 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // user return to avois sending headers twice
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // Check user already exists
      let user = await User.findOne({ email }); // {email: email}
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // Fetch gravitar
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      user = new User({ name, email, avatar, password });
      // Encrypt pw and save user to db
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // Return JWT
      res.send(`Registering ${req.body.name}`);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(`Server error: ${err.message}`);
    }
  }
);

module.exports = router;

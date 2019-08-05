const express = require("express");
const router = express.Router();

// @route GET api/profile
// @desc Just a test route
// @access public
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;

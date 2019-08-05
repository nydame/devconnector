const express = require("express");
const router = express.Router();

// @route GET api/auth
// @desc Just a test route
// @access public
router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;

const express = require("express");
const router = express.Router();

// @route GET api/posts
// @desc Just a test route
// @access public
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;

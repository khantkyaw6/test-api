const express = require("express");
const router = express.Router();

router.route("/role").get((req, res) => {
  res.status(200).json({
    error: false,
    message: "all role",
  });
});

module.exports = router;

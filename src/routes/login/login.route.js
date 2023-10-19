const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { validateLogin } = require("../../schemas/login/login.schema");
const { store } = require("../../controllers/login/login.controller");

router.route("/login").post(validateLogin, store);

module.exports = router;

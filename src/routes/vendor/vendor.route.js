const express = require("express");
const router = express.Router();
const { index, store, update, destroy } = require('../../controllers/vendor/vendor.controller')

router.route("/").get(index).post(store);
router.route("/:id").patch(update).delete(destroy);

module.exports = router

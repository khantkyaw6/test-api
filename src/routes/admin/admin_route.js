const express = require("express");
const router = express.Router();
const {
  index,
  store,
  update,
  destroy,
} = require("../../controllers/admin/admin_controller");
const { validateAdmin } = require("../../schemas/admin/admin.schema");
// const { validateAdmin } = require("../../schemas/admin/admin.schema");

router.route("/").get(index).post(validateAdmin, store);
router.route("/:id").patch(validateAdmin, update).delete(destroy);

module.exports = router;

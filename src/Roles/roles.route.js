const express = require("express");

const { protect, restrictTo } = require("../Middlewares/Middlewares");

const {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole,
} = require("./roles.controllers");

const router = express.Router();

router.route("/").post(createRole).get(getAllRoles);
router.route("/:uuid").get(getRole).patch(protect, restrictTo("administrator"),updateRole).delete(protect, restrictTo("administrator"),deleteRole);

module.exports = router;

const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  activateAccount
} = require("../Authentication/Authentication.controller.js");
const {
  getAllUsers,
  getUser,
  updateUser,
  updateProfile,
  deleteUser,
  changeRole,
  allNotifications,
  readNotification,
  deleteNotification
} = require("./users.controllers");

const { protect, restrictTo} = require("./../Middlewares/Middlewares");
const{ parser}=require('../utils/multer')

const router = express.Router();

router.post("/create-new-account/",register);
router.post("/login", login);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);
router.put("/activate-account/:token", activateAccount);
router.patch("/changepassword", protect, changePassword);
router.get("/notifications",allNotifications)

router.route("/").get(getAllUsers);
router
  .route("/:uuid")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
router.patch("/updateProfile/:uuid",parser.array('user_image'), updateProfile);

router.patch("/:uuid/changerole",changeRole)
router.route("/notifications/:uuid")
.get(readNotification)
.delete(deleteNotification)

module.exports = router;
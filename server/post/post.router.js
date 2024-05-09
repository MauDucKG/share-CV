const  webFramework = require("express");
const router = webFramework.Router();
const {checkPermissionAdmin} = require("../middleware")

const UserController = require("./post.controller");

router.get("/", UserController.getAllpost);
router.post("/", checkPermissionAdmin, UserController.newpost);

module.exports = router;
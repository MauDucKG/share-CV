const  webFramework = require("express");
const router = webFramework.Router();
const { checkPermissionTokenCandidate, checkPermissionTokenAdmin } = require("../middleware")

const UserController = require("./user.controller");

router.get("/", checkPermissionTokenAdmin, UserController.getAlluser);
router.get("/:id", checkPermissionTokenAdmin, UserController.getOne);
router.delete("/:id", checkPermissionTokenAdmin, UserController.deleteUser);
router.post("/", UserController.newuser);
router.put("/:id", checkPermissionTokenCandidate, UserController.updateUser);

module.exports = router;
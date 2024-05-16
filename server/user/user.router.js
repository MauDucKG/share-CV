const  webFramework = require("express");
const router = webFramework.Router();
const { checkPermissionTokenCandidate } = require("../middleware")

const UserController = require("./user.controller");

router.post("/", UserController.newuser);
router.put("/:id", checkPermissionTokenCandidate, UserController.updateUser);

module.exports = router;
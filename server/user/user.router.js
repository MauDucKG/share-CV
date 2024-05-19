const  webFramework = require("express");
const router = webFramework.Router();
const { checkPermissionTokenCandidate } = require("../middleware")

const UserController = require("./user.controller");

router.get("/", UserController.getAlluser);
router.post("/", UserController.newuser);
router.put("/:id", checkPermissionTokenCandidate, UserController.updateUser);

module.exports = router;
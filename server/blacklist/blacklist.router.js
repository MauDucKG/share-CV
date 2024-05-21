const  webFramework = require("express");
const router = webFramework.Router();
const { checkPermissionTokenCandidate, checkPermissionTokenAdmin } = require("../middleware")

const BlackListController = require("./blacklist.controller");

router.get("/", checkPermissionTokenAdmin, BlackListController.getAlluser);
router.get("/:id", checkPermissionTokenAdmin, BlackListController.getOne);

router.delete("/:id", checkPermissionTokenAdmin, BlackListController.deleteUser);
router.put("/:id", checkPermissionTokenAdmin, BlackListController.updateUser);

// router.post("/", BlackListController.newuser);
// router.put("/:id", checkPermissionTokenCandidate, BController.updateUser);

module.exports = router;
const  webFramework = require("express");
const router = webFramework.Router();
const {checkPermissionCandidate, checkPermissionTokenAdmin} = require("../middleware")

const UserController = require("./post.controller");

router.get("/", UserController.getAllpost);
router.post("/", checkPermissionCandidate, UserController.newpost);
router.delete("/:id", checkPermissionTokenAdmin, UserController.deletepost);

router.get("/:id", checkPermissionTokenAdmin, UserController.getOne);
router.put("/:id", checkPermissionTokenAdmin, UserController.updatePost);

module.exports = router;
const  webFramework = require("express");
const router = webFramework.Router();
const {checkPermissionCandidate} = require("../middleware")

const UserController = require("./post.controller");

router.get("/", UserController.getAllpost);
router.post("/", checkPermissionCandidate, UserController.newpost);

module.exports = router;
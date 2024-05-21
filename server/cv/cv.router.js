const {checkPermissionCandidate} = require("../middleware")
const  webFramework = require("express");
const router = webFramework.Router();
const { checkPermissionTokenCandidate, checkPermissionTokenAdmin } = require("../middleware")

const UserController = require("./cv.controller");

router.get("/", UserController.getAllcv);
router.get("/:id", UserController.getOne);
router.delete("/:id", checkPermissionTokenAdmin, UserController.deletecv);

router.post("/", checkPermissionCandidate, UserController.newcv);

module.exports = router;
const {checkPermissionCandidate} = require("../middleware")
const  webFramework = require("express");
const router = webFramework.Router();
const { checkPermissionTokenCandidate, checkPermissionTokenAdmin } = require("../middleware")

const UserController = require("./cv.controller");

router.get("/", UserController.getAllcv);
router.get("/:id", checkPermissionTokenAdmin, UserController.getOne);
router.delete("/:id", checkPermissionTokenAdmin, UserController.deletecv);

router.post("/", checkPermissionCandidate, UserController.newcv);
router.put("/:id", checkPermissionTokenAdmin, UserController.updatecv);


module.exports = router;
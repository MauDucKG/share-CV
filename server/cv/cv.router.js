const {checkPermissionCandidate} = require("../middleware")
const  webFramework = require("express");
const router = webFramework.Router();

const UserController = require("./cv.controller");

router.get("/", UserController.getAllcv);
router.post("/", checkPermissionCandidate, UserController.newcv);

module.exports = router;
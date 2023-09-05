const  webFramework = require("express");
const router = webFramework.Router();

const UserController = require("./cv.controller");

router.get("/", UserController.getAllcv);
router.post("/", UserController.newcv);
router.put("/:id", UserController.updateCv);
router.delete("/:id", UserController.deleteCv);

module.exports = router;
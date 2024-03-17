const  webFramework = require("express");
const router = webFramework.Router();

const UserController = require("./post.controller");

router.get("/", UserController.getAllpost);
router.post("/", UserController.newpost);

module.exports = router;
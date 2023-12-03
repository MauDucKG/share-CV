const  webFramework = require("express");
const router = webFramework.Router();

const UserController = require("./jd.controller");

router.post("/", UserController.newjd);

module.exports = router;
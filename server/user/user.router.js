const  webFramework = require("express");
const router = webFramework.Router();

const UserController = require("./user.controller");

router.post("/", UserController.newuser);

module.exports = router;
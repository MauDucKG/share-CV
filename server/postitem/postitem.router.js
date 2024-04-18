const  webFramework = require("express");
const router = webFramework.Router();

const postitemController = require("./postitem.controller");

router.get("/", postitemController.getAllpostitem);
router.get("/:id", postitemController.getpostitemById);

module.exports = router;
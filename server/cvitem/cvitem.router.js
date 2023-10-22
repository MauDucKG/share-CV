const  webFramework = require("express");
const router = webFramework.Router();

const cvitemController = require("./cvitem.controller");

router.get("/", cvitemController.getAllcvitem);
router.get("/:id", cvitemController.getcvitemById);

module.exports = router;
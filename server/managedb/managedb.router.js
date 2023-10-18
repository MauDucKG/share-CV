const  webFramework = require("express");
const router = webFramework.Router();

const managedbController = require("./managedb.controller");

router.get("/", managedbController.getAllmanagedb);
router.get("/:id", managedbController.getmanagedbById);
router.post("/add", managedbController.newmanagedb);
router.put("/:id", managedbController.updatemanagedb);
router.delete("/:id", managedbController.deletemanagedb);

module.exports = router;
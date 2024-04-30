const webFramework = require("express");
const router = webFramework.Router();

const chatController = require("./chat.controller");

router.post("/", chatController.chatResponse);

module.exports = router;
const express = require("express");
const conversationRouter = express.Router();

const { json } = require("body-parser");
const Add = require('./add')
const Get = require('./get')
const Update = require('./update')

conversationRouter.post("/add", function (req, res) {
    console.log("req.body");
    console.log(req.body);
    Add.addConverastion(req.body.users, req.body.messages, res);
});

conversationRouter.post("/sendMessage/", function (req, res) {
    console.log(req.body);
    Update.updateConversationMessage(req.query.convsId, req.body, res);
});

conversationRouter.post("/seenMessage/", function (req, res) {
    console.log(req.body);
    Update.updateConversationMessageSeenData(req.query.convsId, req.body.messageId, req.body.currentUserId, res);
});
conversationRouter.post("/updateConvsUserStatus/", function (req, res) {
    console.log(req.body);
    Update.updateConvsUserStatus(req.query.convsId, req.body.chatId, req.body.status, res);
});

conversationRouter.get("/get", (req, res) => {
    var userId = req.query.userId;
    Get.getConversation(userId, res);
})

module.exports = conversationRouter;


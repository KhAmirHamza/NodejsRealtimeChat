const express = require("express");
const userRouter = express.Router();

const { json } = require("body-parser");
const Add = require('./add')
const Get = require('./get')
const Update = require('./update')

userRouter.post("/add", function (req, res) {

    console.log("Add user Data: ");
    console.log(req.body);
    Add.addUser(req.body.chatId, req.body.name, req.body.imageUrl, req.body.email, req.body.password, req.body.status, res);
});

userRouter.post("/updateChatId", function (req, res) {
    console.log(req.body);
    Update.updateChatId(req.body._id, req.body.chatId, res);
});

userRouter.get("/get", (req, res) => {
    //console.log(req.query.email);
    Get.getUser(req.query.email, req.query.password, res);
});

module.exports = userRouter;
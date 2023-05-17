const mongoose = require('mongoose');
const User = require('./User');
const moment = require('moment-timezone');

const Schema = mongoose.Schema;

const config = { useNewUrlParser: true, useUnifiedTopology: true };
const conversationDbConnectUrl = "mongodb+srv://amirhamza:amirhamza@cluster0.mb2pom6.mongodb.net/RealTimeChatCall?retryWrites=true&w=majority"

var conversationDbConnection = mongoose.createConnection(conversationDbConnectUrl, config, function (error, result) {
    if (error) {
        console.log(error)
    } else {
        console.log("Connected with Conversation DB!")
    }
});

const dateDhaka = moment.tz(Date.now(), "Asia/Dhaka");

console.log(dateDhaka); // "2018-08-20T16:35:14.033+06:00"

const messageSchema = new Schema({
    _id: { type: String, required: false },
    fromId: { type: String, required: false },
    toId: { type: String, required: false },
    text: { type: String, required: false },
    seenBy: { type: Array, required: true },
    imageUrl: { type: String, required: false },
    createdAt: {type: Date, default: dateDhaka},
    updatedAt: {type: Date, default: dateDhaka}
});

const userSchema = new Schema({
    _id: { type: String, required: false },
    chatId: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
},
    { timestamps: true });

const conversationSchema = new Schema({
    _id: { type: String, required: true },
    users: { type: [userSchema], required: false },
    messages: { type: [messageSchema], required: false }
},
    { timestamps: true });

const Conversation = conversationDbConnection.model('Conversation', conversationSchema);
module.exports = Conversation;



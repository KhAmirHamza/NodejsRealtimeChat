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

 // "2018-08-20T16:35:14.033+06:00"

const messageSchema = new Schema({
    _id: { type: String, required: false },
    from:{ type: userSchema, required: false},
    to: { type: String, required: false },
    senderName: { type: String, required: false},
    text: { type: String, required: false },
    seenBy: { type: Array, required: true },
    imageUrl: { type: String, required: false },
    createdAt: {type: String, required: false},
    updatedAt: {type: String, required: false}
});

const userSchema = new Schema({
    _id: { type: String, required: false },
    chatId: { type: String, required: false },
    name: { type: String, required: false },
    imageUrl: { type: String, required: false },
    email: { type: String, required: false },
    status: { type: String, required: false },
},{ timestamps: true });

const conversationSchema = new Schema({
    _id: { type: String, required: true },
    title: {type: String, required: true},
    type: {type: String, required: true},
    users: { type: [userSchema], required: false },
    messages: { type: [messageSchema], required: false }
},{ timestamps: true });

const Conversation = conversationDbConnection.model('Conversation', conversationSchema);
module.exports = Conversation;



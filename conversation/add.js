const Conversation = require('../model/Conversation');
const User = require('../model/User');
const moment = require('moment-timezone');

module.exports = {

    addConverastion(users, messages, res) {

        const dateDhaka = moment.tz(Date.now(), "Asia/Dhaka");

        const messageSchema = {
            _id: "M" + Date.now(),
            fromId: message.fromId,
            toId: message.toId,
            text: message.text,
            seenBy: message.seenBy,
            imageUrl: message.imageUrl,
            createdAt: dateDhaka,
            updatedAt: dateDhaka
          };

        const conversationSchema = new Conversation({
            _id: "C" + Date.now(),
            users: users,
            messages: messages
        });

        conversationSchema.save().then((result) => {
            console.log("Uploading Conversation Data to MongoDB has successful.");
            console.log(result);
            //res.json({ message: "Conversation upload Successfuly" });
            res.json(result);

            res.end();
        }).catch((error) => {
            console.log("Uploading Conversation data to MongoDB has Failed: error: " + error);
            res.json({ message: "Conversation upload Failed" });
            res.end();
        })
    }
}

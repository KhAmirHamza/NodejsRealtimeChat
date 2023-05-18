const Conversation = require('../model/Conversation');
const User = require('../model/User');
const moment = require('moment-timezone');

module.exports = {

    addConverastion(users, messages, res) {

        const dateDhaka = moment.tz(Date.now(), "Asia/Dhaka");

        const messageSchema = {
            _id: "M" + Date.now(),
            fromId: messages[0].fromId,
            toId: messages[0].toId,
            text: messages[0].text,
            seenBy: messages[0].seenBy,
            imageUrl: messages[0].imageUrl,
            createdAt: dateDhaka,
            updatedAt: dateDhaka
          };

          


        const conversationSchema = new Conversation({
            _id: "C" + Date.now(),
            users: users,
            messages: [messageSchema]
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

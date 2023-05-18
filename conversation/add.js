const Conversation = require('../model/Conversation');
const User = require('../model/User');
const moment = require('moment-timezone');

module.exports = {

    addConverastion(users, messages, res) {

      //  const dateDhaka = moment.tz(Date.now(), "Asia/Dhaka");


        let dateObject = new Date(new Date().toLocaleString('en', {timeZone: 'America/New_York'}));

console.log("A date object is defined")

let date = ("0" + dateObject.getDate()).slice(-2);
let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
let year = dateObject.getFullYear();

let hours = dateObject.getHours();
let minutes = dateObject.getMinutes();
let seconds = dateObject.getSeconds();


let fullDate = date +"-"+month+"-"+year;
let fullTime = hours +":"+minutes;
let dateTime = fullDate +",  "+fullTime

        const messageSchema = {
            _id: "M" + Date.now(),
            fromId: messages[0].fromId,
            toId: messages[0].toId,
            text: messages[0].text,
            seenBy: messages[0].seenBy,
            imageUrl: messages[0].imageUrl,
            createdAt: dateTime,
            updatedAt: dateTime
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

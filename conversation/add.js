const Conversation = require('../model/Conversation');
const User = require('../model/User');
const moment = require('moment-timezone');
const Update = require('./update')

module.exports = {

    addConverastion(users, messages, title, type,  res) {

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
            from: messages[0].from,
            to: messages[0].to,
            text: messages[0].text,
            seenBy: messages[0].seenBy,
            receivedBy: messages[0].receivedBy,
            imageUrl: messages[0].imageUrl,
            reacts: messages[0].reacts,
            replyOf: messages[0].replyOf,
            createdAt: dateTime,
            updatedAt: dateTime
          };

        const conversationSchema = new Conversation({
            _id: "C" + Date.now(),
            title: title,
            type: type,
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
    }, 

    sendFirstMessage(
        users, 
        message,
         title, 
         type,  res){
    var query = {};
    if (message.from._id != null && message.to !=null )
     query = {'type': type,  $and:[{'users._id': message.from._id},{'users._id': message.to}] } ;

        Conversation.findOne(query).then((async result=>{

            if(result!=null) {
                
                // Update.updateConversationMessage(result._id, message, res);

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
            
                const query = { "_id": result._id };
                const messageSchema = {
                  _id: "M" + Date.now(),
                  from: message.from,
                  to: message.to,
                  text: message.text,
                  seenBy: message.seenBy,
                  receivedBy: message.receivedBy,
                  imageUrl: message.imageUrl,
                  reacts: message.reacts,
                  replyOf: message.replyOf,
                  createdAt: dateTime,
                  updatedAt: dateTime
                };
            
                await Conversation.findOneAndUpdate(query, { $push: { 'messages': messageSchema } }, { new: true }).then((result)=>{
                    res.json(result);
                    res.end();
                });
            }else{
                var messages = [];
                messages.add(message);
                this.addConverastion(users, messages, title, type, res);
            }
            
            

          })).catch((error=>{
            console.log(error);
              res.json({ message: error.message, code: 404 })
              res.end();
          }));

    }
}

const { response } = require('express');
const Conversation = require('../model/Conversation')
const moment = require('moment-timezone');

module.exports = {
  async updateConversationMessage(convsId, message, res) {

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

    const query = { "_id": convsId };
    const messageSchema = {
      _id: "M" + Date.now(),
      fromId: message.fromId,
      toId: message.toId,
      text: message.text,
      seenBy: message.seenBy,
      imageUrl: message.imageUrl,
      createdAt: dateTime,
      updatedAt: dateTime
    };


    console.log("messageSchema");
    await Conversation.findOneAndUpdate(query, { $push: { 'messages': messageSchema } }, { new: true });
    res.json(messageSchema);
    res.end();
  },

  async updateConversationMessageSeenData(convsId, messageId, currentUserId, res) {
    const query = { "_id": convsId, "messages._id": messageId };
    //console.log(query);
    await Conversation.findOneAndUpdate(query, { $push: { 'messages.$.seenBy': currentUserId } }, { new: true });
    res.end();
  },


  async updateConvsUserStatus(chatId, status){
    const query = {"users.chatId": chatId };
    var response  = await Conversation.findOneAndUpdate(query, {$set: {"users.$.status": status}}, {new : true});
    console.log("response");
    console.log(response);
    //res.end();
  }
}
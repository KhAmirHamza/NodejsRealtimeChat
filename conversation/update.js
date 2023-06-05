const { response } = require('express');
const Conversation = require('../model/Conversation')
const moment = require('moment-timezone');

module.exports = {
  async updateConversationMessage(convsId, message, res) {

    let dateObject = new Date(new Date().toLocaleString('en', {timeZone: 'Ashia/Dhaka'}));

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


    console.log("messageSchema");
    await Conversation.findOneAndUpdate(query, { $push: { 'messages': messageSchema } }, { new: true });
    res.json(messageSchema);
    res.end();
  },

  async addReactionUpdateConvs(convsId, messageId, reactTitle, userId, res){

    const reactSchema = {
      title: reactTitle,
      userId: userId
    }
    const query = { "_id": convsId, "messages._id": messageId };

    await Conversation.findOneAndUpdate(query, { $push: { 'messages.$.reacts': reactSchema } }, { new: true }).then((data)=>{
      res.json(reactSchema);
      res.end();
    });
  },


  async updateConversationMessageSeenData(convsId, messageId, currentUserId, res) {
    const query = { "_id": convsId, "messages._id": messageId };
    //console.log(query);

    
    await Conversation.findOneAndUpdate(query, { $push: { 'messages.$.seenBy': currentUserId } }, { new: true });
    res.end();
  },

  async updateConversationMessageReceivedData(convsId, messageId, currentUserId, res) {
    const query = { "_id": convsId, "messages._id": messageId };

    await Conversation.findOneAndUpdate(query, { $push: { 'messages.$.receivedBy': currentUserId } }, { new: true });
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
const { response } = require('express');
const Conversation = require('../model/Conversation')
const moment = require('moment-timezone');

module.exports = {
  async updateConversationMessage(convsId, message, res) {

    //const dateDhaka = moment.tz(Date.now(), "Asia/Dhaka").format('ha z');
    const dateDhaka = moment.tz(Date.now(), "Asia/Dhaka"); // 4am PST

    const query = { "_id": convsId };
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
  }
}
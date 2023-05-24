const Conversation = require('../model/Conversation');

module.exports = {
  
 getConversation(userId, res) {
  var query = {};
    if (userId != null) query = { users: { $elemMatch: { _id: userId } } };

  Conversation.find(query)
    //   .limit(parseInt(limit)).skip(((page-1)*limit))
    .then((result) => {
      //socket.emit('comeOnline', result); //here last100message is static text
      res.json(result);
      //  res.end();
    })
    .catch((error) => {
      console.log(error);
      res.json({ message: error.message, code: 404 })
      res.end();
    })
},

getConvsIdsforUId(uid, res){

},

checkConvsBetweenUers(uid1, uid2, res){
  Conversation.find({$and:[{'users._id': uid1},{'users._id': uid2}]}
  //, '_id'
  ).then((result=>{
    res.json(result);
  })).catch((error=>{
    console.log(error);
      res.json({ message: error.message, code: 404 })
      res.end();
  }));
}

}

//01704123471
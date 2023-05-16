const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = { useNewUrlParser: true, useUnifiedTopology: true };
const messageDbConnectUrl = "mongodb+srv://amirhamza:amirhamza@cluster0.mb2pom6.mongodb.net/RealTimeChatCall?retryWrites=true&w=majority"

var messageDbConnection = mongoose.createConnection(messageDbConnectUrl, config, function (error, result) {
    if (error) {
        console.log(error)
    } else {
        console.log("Connected with Message DB!")
    }
});

const messageSchema = new Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    room: { type: String, required: true },
    message: { type: String, required: true }

},
    { timestamps: true });

const Message = messageDbConnection.model('Message', messageSchema);
module.exports = Message;


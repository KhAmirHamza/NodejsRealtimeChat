const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = { useNewUrlParser: true, useUnifiedTopology: true };
const userDbConnectUrl = "mongodb+srv://amirhamza:amirhamza@cluster0.mb2pom6.mongodb.net/RealTimeChatCall?retryWrites=true&w=majority"

var userDbConnection = mongoose.createConnection(userDbConnectUrl, config, function (error, result) {
    if (error) {
        console.log(error)
    } else {
        console.log("Connected with User DB!")
    }
});

const userSchema = new Schema({
    _id: { type: String, required: true },
    chatId: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
},
    { timestamps: true });

const User = userDbConnection.model('Users', userSchema);
module.exports = User;